async function chartSVG(opt) {
    const colorBack = opt.backGroundColor || "white"
    const heightBlock = opt.heightBlock || 218
    const container = document.getElementById(opt.container) || document.getElementById("container")
    const backButton = document.getElementById(opt.backButton)
    const actionSearch = opt.actionSearch
    const arrDay = opt.arrDay || ["Du","Lu","Ma","Mi","Jo","Vi","Sa"]
    const arrMonth = opt.arrMonth || ["IAN", "FEB", "MART", "APR", "MAI", "IUN", "IUL", "AUG", "SEPT", "OCT", "NOV", "DEC"]
    const currencyParameters = opt.currencyParameters || []
    const departureText = opt.departureText || "Plecarea pe"
    const travelText = opt.travelText || {principal: "Călătorie de", day: "zi", days: "zile"}
    const searchText = opt.searchText || "Căutare"
    const graphZoomText = opt.graphZoomText || "Zoom in"
    const url = opt.url

    if(!url) {
      console.error("Please insert url in option object")
      return
    }

    containerPrincipalRender(container)

    const primaryContainerSVG = document.querySelector("._iRe")
    const highlightedArea = document.querySelector(".highlighted-area")
    const graphZoom = document.querySelector(".graph-zoom")
    const monthContainer = document.querySelector(".month-labels")
    const dayLabels = document.querySelector(".day-labels")
    const containerArea = document.querySelector(".graph-area")
    const graphView = document.querySelector(".graph-view")

    const data = await fetch(url)
    const result = await data.json(data)
    const objMonth = {}
    let maxPrice = 0
    let idxMovingMarker = 0
    let maxIdxMovingMarker = 0
    let selectedDay = 0
    let duration = 1
    let textTrip = ()=>`${travelText.principal} ${duration} ${duration==1?travelText.day:travelText.days}`
    let typeChart = null
    let barChartIndex = 0
    let arrDaySelected = []
    let qtyScroll = 0
    let saveIndex = 0
    let secondMaxPrice = 0

    for(let key in result.calendar) {
        let month = new Date(key).getMonth()
        objMonth[month]?objMonth[month].push(key):objMonth[month] = [key];
        result.calendar[key].avgPrice>maxPrice?maxPrice = result.calendar[key].avgPrice:maxPrice
    }
    const month = []
    const listDateSort = []

    for(let key in objMonth) {
        objMonth[key].sort((a,b)=>new Date(a) - new Date(b))
        month.push(key)
        listDateSort.push(...objMonth[key])
    }

  function renderEmptyG(indexStart=0) {
        secondMaxPrice = 0
        let width = primaryContainerSVG.getBoundingClientRect().width
        let height = primaryContainerSVG.getBoundingClientRect().height
        let indexEnd=indexStart+6
        let translateX = 0
        let translateY = 0
        let qtyEmptyG = 0
        if(backButton) backButton.style.display="none"
        for(let i = indexStart; i<indexEnd; i++) {
            let key = month[i]
            if(!key) break
            qtyEmptyG += objMonth[key].length
            objMonth[key].forEach(item=>{
                result.calendar[item].avgPrice>secondMaxPrice?secondMaxPrice = result.calendar[item].avgPrice:secondMaxPrice
            })
            
        }
        let widthRect = width/qtyEmptyG

        let arrayGraphic = []
        let idx = 0

        for(indexStart; indexStart<indexEnd; indexStart++) {
            let key = month[indexStart]
            if(!key) break
            renderMonth(indexStart,qtyEmptyG,objMonth)
            objMonth[key].forEach(element => {
                arrayGraphic.push({
                    date:new Date(element),
                    price:result.calendar[element].avgPrice
                })

                let emptyG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
                emptyG.setAttribute("class", "emptyBar selectable")
                emptyG.dataset.val = element
                maxIdxMovingMarker = idx
                emptyG.dataset.idx = idx++
                emptyG.innerHTML = `<rect class="_oQ _h-Y" x="0" y="118" width="${widthRect}" height="${heightBlock}" style="fill: transparent; stroke: transparent;"></rect>`
                emptyG.setAttribute("transform",`translate(${translateX}, ${translateY})`)
                translateX += widthRect
                emptyG.onpointermove = e => {
                    let emptyGHeight = emptyG.getBoundingClientRect().height
                    let priceHeight = result.calendar[element].avgPrice*emptyGHeight/maxPrice
                    let style = window.getComputedStyle(emptyG)
                    let translate = new DOMMatrix(style.transform).m41 || emptyG.transform.baseVal[0].matrix.e
                    let My = height-priceHeight
                    let Mx = translate - (16-widthRect)/2
                    pathMarker.setAttribute("d", `M ${Mx},${My} a8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0`)
                    pathMarker.classList.remove("RED", "GREEN", "ORANGE")
                    pathMarker.classList.add(result.calendar[element].color)
                    tooltip.setAttribute("transform",`translate(${translate},0)`)
                    tooltip.querySelector("._ikm._ov._j1J").setAttribute("y2",`${My-10}`)
                    let priceBox = tooltip.querySelector(".price-box")
                    let widthPriceBox = priceBox.querySelector("rect").getBoundingClientRect().width
                    if(widthPriceBox/2>=translate) {
                        priceBox.setAttribute("transform",`translate(-${translate},0)`)
                    } else if(width-widthPriceBox/2<=translate) {
                        priceBox.setAttribute("transform",`translate(-${widthPriceBox-(width-translate)},0)`)
                    } else {
                        priceBox.setAttribute("transform",`translate(-${widthPriceBox/2},0)`)
                    }
                    let price = Math.round(result.calendar[element].avgPrice)
                    let currency = currencyTransform(result.parameters.currency)
                    tooltip.querySelector(".price").innerHTML = `+${moneyDelimitation(price)}&nbsp;${currency}`
                    tooltip.querySelector(".dates").innerHTML = `${departureText} ${dateTransform(element)} ${new Date(element).getDate()}/${new Date(element).getMonth()+1}`
                    moveZoom(emptyG.dataset,widthRect,qtyEmptyG)
                    idxMovingMarker = emptyG.dataset.idx
                }

                emptyG.onmouseenter = e => graphZoom.setAttribute("visibility","visible")
                emptyG.onmouseleave = e => graphZoom.setAttribute("visibility","hidden")
                emptyG.onclick = (e)=>{
                    renderBarChar(e)
                    scrollChartTypeBar()
                }

                containerArea.append(emptyG)
            });
        }

        let heightGraphArea = heightBlock
        heightGraphArea = heightGraphArea*secondMaxPrice/maxPrice
        let widthGraphArea = containerArea.getBoundingClientRect().width
        let x = d3.scaleTime().range([0, widthGraphArea])
        let y = d3.scaleLinear().range([heightGraphArea, 0])

        let area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(heightGraphArea)
            .y1(function(d) { return y(d.price); });

        x.domain(d3.extent(arrayGraphic, function(d) { return d.date; }));
        y.domain([0, d3.max(arrayGraphic, function(d) { return d.price; })]);

        let path = area(arrayGraphic)

        let areaG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        areaG.setAttribute("class","area")
        areaG.setAttribute("transform",`translate(0, ${height-heightGraphArea})`)
        areaG.innerHTML = `<path class="visible-area _lxY _iyU _oO" d="${path}"></path>`
        containerArea.prepend(areaG)

        let markerG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        markerG.setAttribute("class", "graph-marker _ikm")
        markerG.setAttribute("visibility","visible")
        let pathMarker = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        pathMarker.setAttribute("class", `_o0 _oZ ${result.calendar[objMonth[month[saveIndex]][0]].color}`)
        pathMarker.setAttribute("stroke", "currentColor")
        let priceHeight = result.calendar[objMonth[month[saveIndex]][0]].avgPrice*heightGraphArea/secondMaxPrice
        let My = height-priceHeight
        pathMarker.setAttribute("d", `M ${-(16-widthRect)/2},${My} a8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0`)
        markerG.append(pathMarker)
        graphView.append(markerG)

        moveZoom({idx:0},widthRect,qtyEmptyG)

        let price = Math.round(result.calendar[objMonth[month[saveIndex]][0]].avgPrice)
        let currency = currencyTransform(result.parameters.currency)
        let tooltip = renderToolTip(My, price, currency)
        graphView.append(tooltip)
  }

  function renderZoom(widthEmptyG,idx) {
        let i = +idx-15
        let k = +idx+15
        let arrayGraphic = []
        let secondMaxPrice = 0
        for(i; i<=k; i++) {
            let dataValue = document.querySelector(`.emptyBar[data-idx="${i}"]`).dataset.val
            arrayGraphic.push({
                date:new Date(dataValue),
                price:result.calendar[dataValue].avgPrice
            })
            secondMaxPrice = Math.max(secondMaxPrice,result.calendar[dataValue].avgPrice)
        }

        let heightGraphArea = heightBlock
        heightGraphArea = heightGraphArea*secondMaxPrice/maxPrice
        let widthGraphArea = widthEmptyG*31
        if(idx<=30) {
            widthGraphArea = widthEmptyG*30
        }
        let x = d3.scaleTime().range([0, widthGraphArea])
        let y = d3.scaleLinear().range([heightGraphArea, 0])

        let area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.date); })
            .y0(heightGraphArea)
            .y1(function(d) { return y(d.price); });

        x.domain(d3.extent(arrayGraphic, function(d) { return d.date; }));
        y.domain([0, d3.max(arrayGraphic, function(d) { return d.price; })]);

        let path = area(arrayGraphic)

        let topPosition = heightBlock - heightGraphArea
        highlightedArea.innerHTML = `
        <rect width="${widthGraphArea}" height="${heightBlock}" y=${118} style="fill:${colorBack}"/>
        <rect class="above-curve _ikm _oT _jmS" width="${widthGraphArea}" height="${heightBlock}" y=${118} />
        <g class="graph-axis" transform="translate(-${highlightedArea.x.baseVal.value || 0}, 0)">
          <line class="axis axis-0 _og _j1J" x1="0" x2="100%" y1="118" y2="118"></line>
          <line class="axis axis-1 _og _j1J" x1="0" x2="100%" y1="194.66666666666666" y2="194.66666666666666"></line>
          <line class="axis axis-2 _og _j1J" x1="0" x2="100%" y1="267.3333333333333"  y2="267.3333333333333"></line>
        </g>
        <path class="below-curve _ikm _oY _h-Y" transform="translate(0, ${120+topPosition})" d="${path}"></path>
        `
        graphZoom.setAttribute("width", widthGraphArea)
        graphZoom.innerHTML = `
        <rect class="_o5" x="0" y="0" width="${widthGraphArea}" height="34"></rect>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${graphZoomText}</text>
        `
  }
    
  function moveZoom({idx},widthEmptyG,qtyEmptyG) {
        if(idx>=15 && idx<=qtyEmptyG-16) {
            let translateX = (idx-15)*widthEmptyG
            highlightedArea.setAttribute("x",translateX)
            graphZoom.setAttribute("x", translateX)
            renderZoom(widthEmptyG, idx)
        } else if(idx<15) {
            let translateX = 0
            highlightedArea.setAttribute("x",translateX)
            graphZoom.setAttribute("x", translateX)
            renderZoom(widthEmptyG, 15)  
        } else {
            let translateX = (qtyEmptyG-31)*widthEmptyG
            highlightedArea.setAttribute("x",translateX)
            graphZoom.setAttribute("x", translateX)
            renderZoom(widthEmptyG, qtyEmptyG-16)
        }
  }

  function renderInfoDiv() {
        const containerHorizontalMoney = document.querySelector(".horizontal-axes")
        const divMaxPrice = moneyTransform(Math.round(maxPrice))
        const divMedPrice = moneyTransform(Math.round(maxPrice/3*2))
        const divMinPrice = moneyTransform(Math.round(maxPrice/3))

        const axisBuskets = document.createElement("div")
        const axisMoney = document.createElement("div")

        const currency = currencyTransform(result.parameters.currency)

        axisMoney.className = "_igf _iam _ian _iai _itL"
        axisMoney.innerHTML = `
              <div class="h-axis-0 _iqC _ibU _iPC _irF _ibV _iae _irG _iaB _igh _nj _itL">${divMaxPrice}&nbsp;${currency}</div>
              <div class="h-axis-1 _iqC _ibU _iPC _irF _ibV _iae _irG _iaB _igh _nj _itL">${divMedPrice}&nbsp;${currency}</div>
              <div class="h-axis-2 _iqC _ibU _iPC _irF _ibV _iae _irG _iaB _igh _nj _itL">${divMinPrice}&nbsp;${currency}</div>
        `
        let greenMaxPrice = 0
        let orangeMaxPrice = 0
        let redMaxPrice = 0
        for(let key in result.calendar) {
            let color = result.calendar[key].color
            let price = result.calendar[key].avgPrice
            if(color=="GREEN") {
                greenMaxPrice = Math.max(greenMaxPrice, price)
            } else if(color=="ORANGE") {
                orangeMaxPrice = Math.max(orangeMaxPrice, price)
            } else if(color=="RED") {
                redMaxPrice = Math.max(redMaxPrice, price)
            }
        }

        let orangeHeight = orangeMaxPrice*100/maxPrice
        let greenHeight = greenMaxPrice*100/maxPrice
        axisBuskets.className = "axis-buckets _iFx _h-2 _iam"
        axisBuskets.innerHTML = `
            <div class="h-bucket-0 _iFx _ibe _h-Z _im4 _nk _nr _iam"></div>
            <div class="h-bucket-1 _iFx _ibe _h-Z _im4 _nk _nq" style="height: ${orangeHeight}%"></div>
            <div class="h-bucket-2 _iFx _ibe _h-Z _im4 _nk _nn" style="height: ${greenHeight}%"></div>
        `
        containerHorizontalMoney.innerHTML = ""
        containerHorizontalMoney.append(axisBuskets,axisMoney)
  }

  function renderMonth(index, totalDay, objMonth) {
        const month = monthTransform(index)
        const procentWidth = objMonth[index].length*100/totalDay
        const li = document.createElement("li")
        li.className="month-label _igY _ibU _iau _ibV _nu _kkJ _j1Q _iaB _igh _ioK _ia-"
        li.innerHTML = `<span dir="auto">${month}</span>`
        li.style.width = procentWidth+"%"
        monthContainer.append(li)
  }

  renderInfoDiv()
  renderEmptyG()

  function changePage(num=0,selectedDay) {
        monthContainer.innerHTML = ""
        document.querySelector(".graph-area").innerHTML = ""
        document.querySelector(".tooltip")?.remove()
        document.querySelector(".graph-marker")?.remove()
        saveIndex = num
        renderEmptyG(num)
        if(idxMovingMarker>maxIdxMovingMarker) {
            idxMovingMarker=maxIdxMovingMarker
        }
        if(selectedDay) {
          const moveCursor = document.querySelector(`.emptyBar[data-val="${selectedDay}"]`)
          const event = new Event('pointermove');
          moveCursor.dispatchEvent(event)
        } else {
          const moveCursor = document.querySelector(`.emptyBar[data-idx="${idxMovingMarker}"]`)
          const event = new Event('pointermove');
          moveCursor.dispatchEvent(event)
        }

  }

    
  function scrollChart() {
        const leftScroll = document.querySelector(".scroll-left")
        const rightScroll = document.querySelector(".scroll-right")
        typeChart = "area"
        if(qtyScroll == 0) {
          leftScroll.classList.remove("_nJ")
          leftScroll.classList.add("_nS","_icK")
        } else if(qtyScroll == month.length-6) {
          rightScroll.classList.remove("_nJ")
          rightScroll.classList.add("_nS","_icK")
        }
        
        rightScroll.onclick = e =>{
            e.preventDefault()
            let numberMonth = month.length-6
            leftScroll.classList.remove("_nS","_icK")
            leftScroll.classList.add("_nJ")
            numberMonth -= qtyScroll
            if(numberMonth==0) {
                return
            }
            numberMonth<4?qtyScroll+=numberMonth:qtyScroll+=3
            changePage(qtyScroll)
            if(numberMonth<4) {
                e.currentTarget.classList.remove("_nJ")
                e.currentTarget.classList.add("_nS","_icK")
            }
        }

        leftScroll.onclick = e =>{
            e.preventDefault()
            let numberMonth = month.length-6
            rightScroll.classList.remove("_nS","_icK")
            rightScroll.classList.add("_nJ")
            if(qtyScroll==0) {
                return
            }
            qtyScroll==numberMonth?qtyScroll-=numberMonth-3:qtyScroll-=3
            changePage(qtyScroll)
            if(qtyScroll==0) {
                e.currentTarget.classList.remove("_nJ")
                e.currentTarget.classList.add("_nS","_icK")
            }
        }
  }
    
  function scrollChartTypeBar() {
        const leftScroll = document.querySelector(".scroll-left")
        const rightScroll = document.querySelector(".scroll-right")
        let indexElement = listDateSort.findIndex(item=>item==selectedDay)
        typeChart = "bar"
        if(backButton) {
          backButton.style.display=null
          backButton.onclick = goBack
        }
        leftScroll.classList.remove("_nS","_icK")
        leftScroll.classList.add("_nJ")
        rightScroll.classList.remove("_nS","_icK")
        rightScroll.classList.add("_nJ")

        if(indexElement<16+1) {
            leftScroll.classList.remove("_nJ")
            leftScroll.classList.add("_nS","_icK")
        } else if(indexElement>listDateSort.length-1-16) {
            rightScroll.classList.remove("_nJ")
            rightScroll.classList.add("_nS","_icK")
        }

        rightScroll.onclick=e=>{
            leftScroll.classList.remove("_nS","_icK")
            leftScroll.classList.add("_nJ")
            if(indexElement+30>=listDateSort.length-1) {
                indexElement = listDateSort.length-1 - 15
                e.currentTarget.classList.remove("_nJ")
                e.currentTarget.classList.add("_nS","_icK")
            } else {
                indexElement<15?indexElement=15:indexElement
                indexElement+=15
            }
            renderBarChar(null,listDateSort[indexElement])
            
        }

        leftScroll.onclick=e=>{
            rightScroll.classList.remove("_nS","_icK")
            rightScroll.classList.add("_nJ")
            if(indexElement-30<=0) {
                indexElement = 15
                e.currentTarget.classList.remove("_nJ")
                e.currentTarget.classList.add("_nS","_icK")
            } else {
                indexElement>=listDateSort.length-1?indexElement=listDateSort.length-1-15:indexElement
                indexElement-=15
            }
            renderBarChar(null,listDateSort[indexElement])
        }
  }

  function renderBarChar(e,index) {
        const date = e?.currentTarget.dataset.val || index
        const positionDate = listDateSort.findIndex(item=>item==date)
        index?selectedDay:selectedDay = date
        let price = Math.round(result.calendar[selectedDay].avgPrice)
        let currency = currencyTransform(result.parameters.currency)
        let tooltip = renderToolTip(0, price, currency, "visible", 37, 52)
        const dateArray = []
        barChartIndex = positionDate
        if(positionDate-15>0 && positionDate+15<listDateSort.length) {
            dateArray.push(...listDateSort.slice(positionDate-16,positionDate+16))
        } else if(positionDate-15<=0) {
            dateArray.push(...listDateSort.slice(0,32))
        } else {
            dateArray.push(...listDateSort.slice(listDateSort.length-32,listDateSort.length))
        }

        const totalWidthContainer = primaryContainerSVG.getBoundingClientRect().width
        const height = primaryContainerSVG.getBoundingClientRect().height
        const widthGBar = totalWidthContainer/dateArray.length
        let translateX = 0
        let idxBar = 0
        containerArea.innerHTML = ""
        highlightedArea.innerHTML = ""
        graphZoom.innerHTML = ""
        dayLabels.innerHTML = ""
        document.querySelector(".tooltip")?.remove()
        document.querySelector(".graph-marker")?.remove()
        const listMonth = {}
        function renderDay(arrayDate) {
          const startIndex = listDateSort.findIndex(item=>item==selectedDay)
          const endIndex = startIndex+duration>listDateSort.length?listDateSort.length:startIndex+duration
          arrDaySelected = listDateSort.slice(startIndex,endIndex)
          dayLabels.innerHTML = ""
          arrayDate.forEach(item=>{
          dayLabels.innerHTML += `
          <div class="day-label _igf _iaB _iak _iZU _iai _itL ${
            arrDaySelected.findIndex(el=>el==item) == 0?"selected":
            arrDaySelected.findIndex(el=>el==item) > 0 && arrDaySelected.findIndex(el=>el==item) < arrDaySelected.length-1?"preselected":
            arrDaySelected.findIndex(el=>el==item) == arrDaySelected.length-1?"selected":"selectable"
          }" 
          data-val="${item}">
              <div class="_iac _iab _iKf _i1M _iax">${new Date(item).getDate()}</div>
              <div class="_iac _iab _iKf _i1M _iax">${dateTransform(item)}</div>
          </div>
        `
        })
        }
        dateArray.forEach(item=>{
            listMonth[new Date(item).getMonth()]?listMonth[new Date(item).getMonth()].push(item):listMonth[new Date(item).getMonth()]=[item]
            const gBar = document.createElementNS("http://www.w3.org/2000/svg","g")
            gBar.setAttribute("class", `bar ${item==selectedDay?"selected":"selectable"}`)
            gBar.setAttribute("transform", `translate(${translateX}, 0)`)
            gBar.setAttribute("height", heightBlock)
            gBar.dataset.val = item
            gBar.dataset.idx = idxBar++
            translateX += widthGBar

            let y = primaryContainerSVG.getBoundingClientRect().height+2
            let priceHeight = result.calendar[item].avgPrice*heightBlock/maxPrice
            let invisibleBarHeight = heightBlock-priceHeight
            let yInvisibleBar = y-heightBlock
           
            let path = topRoundedColumn(0,y,priceHeight,widthGBar)
            gBar.innerHTML = `
            <rect class="invisible-bar" x="0" y="${yInvisibleBar}" width="${widthGBar}" height="${invisibleBarHeight}"/>
            <path class="visible-bar _oi _h-Y _oj" d="${path}"></path>
            `

            gBar.onmouseenter = e=>{
                gBar.classList.add("highlighted")
                let style = window.getComputedStyle(gBar)
                let translateX = new DOMMatrix(style.transform).m41 || gBar.transform.baseVal[0].matrix.e
                renderSmallTootip(false, widthGBar, translateX, priceHeight, item)
            }

            gBar.onmouseleave = e=>{
                gBar.classList.remove("highlighted")
                renderSmallTootip(true)
            }

            gBar.onclick = e=>{
                const selectedItemArray = document.querySelector(`[data-val="${selectedDay}"]`)
                selectedItemArray?.classList.remove("selected")
                selectedItemArray?.classList.add("selectable")

                gBar.classList.remove("selectable")
                gBar.classList.add("selected")
                
                selectedDay = item
                renderDay(dateArray)
                changePositionTooltip(selectedDay)
            }
            
            containerArea.append(gBar)
            document.querySelector(".day-labels-wrapper").classList.remove("_iaL")
            
            
            if(item == selectedDay) {
                changePositionTooltip(selectedDay)
            }
        })
        renderDay(dateArray)
        function changePositionTooltip(selectedDay) {
            graphView.append(tooltip)
            let elementSelect = document.querySelector(`.bar[data-val="${selectedDay}"]`)
            let style = window.getComputedStyle(elementSelect)
            let translate = new DOMMatrix(style.transform).m41 || elementSelect.transform.baseVal[0].matrix.e
            tooltip.setAttribute("transform", `translate(${translate+widthGBar/2},0)`)
            let priceBox = tooltip.querySelector(".price-box")
            let widthPriceBox = priceBox.querySelector("rect").getBoundingClientRect().width
            let width = primaryContainerSVG.getBoundingClientRect().width
            if(widthPriceBox/2>=translate) {
                priceBox.setAttribute("transform",`translate(-${translate+widthGBar/2},0)`)
            } else if(width-widthPriceBox/2<=translate+widthGBar/2) {
                priceBox.setAttribute("transform",`translate(-${widthPriceBox-(width-translate)+widthGBar/2},0)`)
            } else {
                priceBox.setAttribute("transform",`translate(-${widthPriceBox/2},0)`)
            }
            let priceHeight = result.calendar[selectedDay].avgPrice*heightBlock/maxPrice
            let Mx = height-priceHeight+10
            let price = Math.round(result.calendar[selectedDay].avgPrice)
            let currency = currencyTransform(result.parameters.currency)
            tooltip.querySelector("._ikm._ov._j1J").setAttribute("y2",`${Mx-10}`)
            tooltip.querySelector("._ikm._ov._j1J").setAttribute("x1",0)
            tooltip.querySelector("._ikm._ov._j1J").setAttribute("x2",0)
            tooltip.querySelector(".tri._ikm._ot").setAttribute("points",`0 112 -6 106 6 106`)
            tooltip.querySelector(".price").innerHTML = ` +${moneyDelimitation(price)}&nbsp;${currency}`
        }

        monthContainer.innerHTML = ""
        for(let key in listMonth) {
            renderMonth(key, dateArray.length, listMonth)
        }
  }

  function renderSmallTootip(delBar, widthGBar, translateX, gBarHeight, item) {
        if(delBar) {
            document.querySelector(".smallTooltip").remove()
            return
        }
        let smallTootip = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        smallTootip.setAttribute("class","smallTooltip _ikm")
        smallTootip.setAttribute("transform",`translate(${translateX},0)`)

        const totalHeightContainer = primaryContainerSVG.getBoundingClientRect().height
        
        const x1 = widthGBar/2
        const y1 = totalHeightContainer-gBarHeight
        const x2 = x1-3
        const y2 = y1-6
        const x3 = x1+3
        const y3 = y2
        
        const points = `${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`

        smallTootip.innerHTML = `
        <g class="price-box" transform="translate(0,0)">
            <rect x="0" y="0" rx="6" ry="6" height="36" class="_ok" width="64"></rect>
            <text x="32" y="22" class="price PriceGraph__Highlight__Black__Price _ial _j1M _idj _on _iaj">${moneyDelimitation(Math.round(result.calendar[item].avgPrice))}&nbsp;${currencyTransform(result.parameters.currency)}</text>
        </g>
        <polygon class="tri _ok" points="${points}"></polygon>
        `
        graphView.append(smallTootip)

        const priceContainer = smallTootip.querySelector(".price")
        const rectContainer = smallTootip.querySelector("rect._ok")
        const priceBoxContainer = smallTootip.querySelector(".price-box")

        const totalWidthContainer = primaryContainerSVG.getBoundingClientRect().width
        const widthPrice = priceContainer.getBoundingClientRect().width+8

        let translatePrice = (widthGBar-widthPrice)/2

        if(translateX+widthGBar/2<=widthPrice/2) {
          translatePrice=-translateX
        } else if(translateX>=totalWidthContainer-widthPrice/2-widthGBar/2) {
          translatePrice=-(widthPrice-totalWidthContainer+translateX)
        }

        rectContainer.setAttribute("width",widthPrice)
        priceContainer.setAttribute("x",widthPrice/2)
        priceBoxContainer.setAttribute("transform",`translate(${translatePrice},${y1-42})`)
  }

  function renderToolTip(Mx, price, currency, search="hidden", positionSVG = 75, positionText = 90) {
        let tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        tooltip.setAttribute("class","tooltip")
        tooltip.setAttribute("transform","translate(0,0)")
        tooltip.setAttribute("width",229)
        tooltip.setAttribute("height",106)
        tooltip.style.display="block"
        tooltip.innerHTML =  `
                  <rect x="0" y="0" height="0" width="0" class="_oc _oi _h-Y _oj" visibility="hidden"></rect>
                  <line x1="2.653631284916201" y1="109" x2="2.653631284916201" y2="${Mx-10}" class="_ikm _ov _j1J"></line>
                  <polygon class="tri _ikm _ot" points="2.653631284916201 112 -3.346368715083799 106 8.653631284916202 106"></polygon>
                  <g class="price-box" transform="translate(0,0)" height="106" width="229">
                    <rect x="0" y="0" rx="6" ry="6" height="106" class="_kLY _ov _j1J _oX" width="229"></rect>
                    <text x="12" y="27" class="price _ij8 _oV _ial _j1L _iaj">
                      +${moneyDelimitation(price)}&nbsp;${currency}
                    </text>
                    <text x="12" y="57" class="dates _oV _j1L _idj" visibility="${search=="hidden"?"visible":"hidden"}">
                      ${departureText} ${dateTransform(objMonth[month[saveIndex]][0])} ${new Date(objMonth[month[saveIndex]][0]).getDate()}/${new Date(objMonth[month[saveIndex]][0]).getMonth()+1}
                    </text>
                    <text x="12" y="${positionText}" class="trip _oV _ial _j1L _idj _iaj">
                      ${textTrip()}
                    </text>
                    <svg x="187" y="${positionSVG}" width="20" height="20" visibility="visible" class="increase-duration _oP _nR _oS _oU _oE _nM">
                      <rect x="0" y="0" rx="2" ry="2" width="20" height="20"></rect>
                      <path fill="currentColor" d="m6 11 h3 v3 h2 v-3 h3 v-2 h-3 v-3 h-2 v3 h-3 v2 z"></path>
                    </svg>
                    <svg x="159" y="${positionSVG}" width="20" height="20" visibility="visible" class="reduce-duration _oP _nR _oS _oU _oE _nM">
                      <rect x="0" y="0" rx="2" ry="2" width="20" height="20"></rect>
                      <path fill="currentColor" d="m6 11 h8 v-2 h-8 z"></path>
                    </svg>
                    <svg x="40" y="65" width="150" height="34" visibility="${search}" class="submit _h-Y">
                      <rect x="0" y="0" rx="6" ry="6" width="150" height="34" class="_o2 _oW _o7"></rect>
                      <text x="75" y="22" class="_ikm _ial _j1M _o- _idj _iaj">
                        ${searchText}
                      </text>
                    </svg>
                  </g>
        `
        durationDay(tooltip)
        tooltip.querySelector(".submit._h-Y").onclick = () => {
          if(typeof actionSearch != "function") return
          actionSearch(arrDaySelected)
        }
        return tooltip
  }

  function goBack() {
      document.querySelector(".day-labels-wrapper").classList.add("_iaL")
      let keySelected = Object.keys(objMonth).find(item=>objMonth[item].find(el=>el==selectedDay))
      if(keySelected<6) {
        saveIndex = 0
      } else if(month.length-keySelected>=3) {
        saveIndex = 3
      } else {
        saveIndex = month.length - 6
      }
      qtyScroll=saveIndex
      changePage(saveIndex,selectedDay)
      scrollChart()
  }

  function durationDay(tooltip) {
      const increaseDuration = tooltip.querySelector(".increase-duration")
      const reduceDuration = tooltip.querySelector(".reduce-duration")
      const text = tooltip.querySelector(".trip")
      const minDay = 1
      const maxDay = 28

      if(duration <= minDay) {
        reduceDuration.classList.add("limit")
      } else if(duration >= maxDay) {
        increaseDuration.classList.add("limit")
      }
      const initValue = {...result.calendar}
      const recalculPrice = async (increase) => {
          maxPrice = 0
          // need data from AJAX
          let i = 0
          // const data = await fetch("/js/data.json")
          // const result1 = await data.json(data)
          // console.log(result1)
          for(let key in result.calendar) {
            if(increase) {
              i++
              i%2?result.calendar[key].avgPrice = initValue[key].avgPrice * 0.992:result.calendar[key].avgPrice = initValue[key].avgPrice * 0.98
            } else {
              i--
              i%2?result.calendar[key].avgPrice = initValue[key].avgPrice / 0.992:result.calendar[key].avgPrice = initValue[key].avgPrice / 0.98
            }
            result.calendar[key].avgPrice>maxPrice?maxPrice = result.calendar[key].avgPrice:maxPrice
          }

          if(typeChart == "area") {
            changePage(saveIndex)
          } else if(typeChart == "bar") {
            renderBarChar(null,listDateSort[barChartIndex])
          }
          renderInfoDiv()  
      }

      increaseDuration.onclick = () =>{
        if(duration>=maxDay) return
        reduceDuration.classList.remove("limit")
        duration++
        recalculPrice(true)
        text.innerHTML = textTrip()
        if(duration>=maxDay) increaseDuration.classList.add("limit")
      }

      reduceDuration.onclick = () =>{
        if(duration<=minDay) return
        increaseDuration.classList.remove("limit")
        duration--
        recalculPrice(false)
        text.innerHTML = textTrip()
        if(duration<=minDay) reduceDuration.classList.add("limit")  
      }
  }

  scrollChart()

  // Adaptiv Chart (max 560px)
  window.onresize = () => {
      if(typeChart=="area") {
        changePage(saveIndex)
      } else if(typeChart=="bar") {
        renderBarChar(null,listDateSort[barChartIndex])
      }
  }
  // auxiliar function =>

  function currencyTransform(value) {
      const currency = currencyParameters.find(item=>item.currency.trim().toLowerCase() == value.trim().toLowerCase())
      if(!currency) {
        return result.parameters.currency
      } else {
        return currency.value
      }
  }
  
  function dateTransform(date) {
      let value = new Date(date).getDay()
      return arrDay[value]
  }
  
  function monthTransform(month) {
      return arrMonth[month]
  }

  function moneyTransform(money) {
    if(money>=1000 && money<1000000) {
      let moneyChange = (money/1000).toFixed(1)
      return `${moneyChange<10?moneyChange:Math.round(moneyChange)}k`
    } else if (money>=1000000) {
      let moneyChange = (money/1000000).toFixed(1)
      return `${moneyChange<10?moneyChange:Math.round(moneyChange)}M`
    } else {
      return money
    }
  }

  function moneyDelimitation(money) {
    const moneyArray = [...String(money)]
    const moneyResult = []
    moneyArray.reverse()
    moneyArray.forEach((item,index)=>{
      if(index%3==2 && index != moneyArray.length-1) {
        moneyResult.unshift("&nbsp;",item)
      } else {
        moneyResult.unshift(item)
      }
    })
    return moneyResult.join("")
  }
  
  function topRoundedColumn(x, y, height, width) {
      const radius = width / 4 ;
      const heightBeforeArc = height - radius;
      return (
        `M${x},${y} ` + // Mx,y Move the pen to(x, y)
        `v-${heightBeforeArc} ` + // h<length> Draw a vertical line of length <height>px
        `a ${radius},${radius} 0 0 1 ${radius},-${radius} ` + // arc
        `h ${2*radius}` +
        `a ${radius},${radius} 0 0 1 ${radius},${radius} ` +
        `v${heightBeforeArc} ` +
        `z` // close shape
      );
  }
  
  function containerPrincipalRender(container) {
      container.innerHTML = `
      <div id="containerChart" class="_jad _jae">
        <div id="price-graph-container" class="_j1N _ieD">
          <div class="price-graph _i6H _kWJ _ibG _h-- _ia1 _i6F _iaA _ico _i6C">
            <div class="horizontal-axes _i0S _Z- _jiW _h-Z _kFP _iai">
              <!-- Axis Horizontal -->
            </div>
            <div class="wrapper _ia4 _igU _ia1 _nv _nx _ibo">
              <div class="_ibe _igf _m9 _h-Z _ibo _ian _ibi _ibk _iaL">
                <div class="_iiW _iaB _iQX _iUL">
                  <span
                    class="
                      _iUW
                      _iUX
                      _iUY
                      _iUZ
                      _iF5
                      _h--
                      _ieu
                      _iaA
                      _iUV
                      _h-8
                      _iq7
                      _iq8
                    "
                    >&nbsp;</span
                  >
                  <span
                    class="
                      _iUW
                      _iUX
                      _iUY
                      _iUZ
                      _iF5
                      _h--
                      _ieu
                      _iaA
                      _iUV
                      _h-8
                      _iq7
                      _iq8
                    "
                    >&nbsp;</span
                  >
                  <span
                    class="
                      _iUW
                      _iUX
                      _iUY
                      _iUZ
                      _iF5
                      _h--
                      _ieu
                      _iaA
                      _iUV
                      _h-8
                      _iq7
                      _iq8
                    "
                    >&nbsp;</span
                  >
                </div>
              </div>
              <svg class="_iRe" width="100%" height="100%">
                <g class="graph-view">
                  <g class="graph-axis">
                    <line
                      class="axis axis-0 _og _j1J"
                      x1="0"
                      x2="100%"
                      y1="118"
                      y2="118"
                    ></line>
                    <line
                      class="axis axis-1 _og _j1J"
                      x1="0"
                      x2="100%"
                      y1="194.66666666666666"
                      y2="194.66666666666666"
                    ></line>
                    <line
                      class="axis axis-2 _og _j1J"
                      x1="0"
                      x2="100%"
                      y1="267.3333333333333"
                      y2="267.3333333333333"
                    ></line>
                  </g>
                  <svg class="graph-area">
                    <!-- Area Chart -->
                    <!-- EmptyBar Area -->
                  </svg>
  
                  <svg
                    class="highlighted-area _ikm _h-Y"
                    x="0"
                    visibility="visible"
                  >
                    <!-- Area High -->
                  </svg>
  
                  <!-- Marker -->
                  <svg
                    class="graph-zoom _ikm _o4 _iaB _iak _iZU _ial _iaj"
                    x="0"
                    y="304"
                    height="34"
                    visibility="hidden"
                  >
                    <!-- Graph Zoom -->
                  </svg>
                </g>
              </svg>
            </div>
  
            <div class="day-labels-wrapper _id7 _iaL">
              <div class="day-labels _ib4 _ixV _nt _ixW _ib3 _ii0 _iai"></div>
            </div>
  
            <div class="month-slider _ib4 _iad _ibG _ia1 _ib3 _iai">
              <a class="scroll-left _ikn _iih _j1Z _h-Y _iS0 _nJ">
                <svg
                  class="_i3e"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 26 26"
                  fill="currentColor"
                >
                  <path d="M16.49 20.89L7.89 13l8.6-7.89 1.02 1.11-7.4 6.78 7.4 6.78-1.02 1.11z"></path>
                </svg>
              </a>
              <div class="month-labels-wrapper _id7 _itL">
                <ul class="month-labels _nt _ii0 _iai">
                  <!-- Month Label -->
                </ul>
              </div>
              <a class="scroll-right _ikn _iih _j1Z _h-Y _iS0 _nJ">
                <svg
                  class="_i3e"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 26 26"
                  fill="currentColor"
                >
                  <path d="M9.91 20.87l-1.07-1.05L15.57 13 8.84 6.18l1.07-1.05L17.68 13l-7.77 7.87"></path>
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
      `
  }

}