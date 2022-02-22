// Search form Navbar ------------------------------------------------->

function searchNavbar() {
    const btnSearch = document.getElementById("searcBtnNavbar")
    const formSearchNavbar = document.getElementById("formSearchNavbar")

    if(!btnSearch || !formSearchNavbar) return

    btnSearch.addEventListener("click",()=>{
        formSearchNavbar.classList.toggle("show-navbar-search")
    })
}

searchNavbar()

// Search form Navbar -------------------------------------------------<

// Scroll Top ---------------------------------------------------------->

function scrollTop(top) {
    let y = $(window).scrollTop()
    if(y<top) {
        $('#scrollUP').css('display','none')
    } else {
        $('#scrollUP').css('display','block')
    }


    $(window).on("scroll",()=>{
        y = $(window).scrollTop()
        if(y<top) {
            $('#scrollUP').css('display','none')
        } else {
            $('#scrollUP').css('display','block')
        }
        
    })
    
    $('#scrollUP').on('click', function() {
        $(window).scrollTop(0);
    });
}

scrollTop(100)

// Scroll Top ----------------------------------------------------------<

// Toggle NavAux ----------------------------------------------------------->

function toggleNavAux() {
    const btnNav = document.querySelector('.navbar-toggler')
    const auxNav = document.getElementById('navbarAuxiliar')
    if(!btnNav || !auxNav) return

    btnNav.addEventListener('click',()=>{
        if(!btnNav.classList.contains('collapsed')) {
            auxNav.classList.add('show-navbar-auxiliar')
        } else {
            auxNav.classList.remove('show-navbar-auxiliar')
        }
    })
}

toggleNavAux()

// Toggle NavAux -----------------------------------------------------------<

// Filter Mobile Show ------------------------------------------------------->

function filterToggle() {
    const btn = document.getElementById('btnShowFilter')
    const filterContainer = document.getElementById('filterContainer')
    if(!btn || !filterContainer) return
    btn.addEventListener('click',e=>{
        e.stopPropagation()
        filterContainer.classList.toggle('show-filter')
    })

    filterContainer.addEventListener('click',e=>e.stopPropagation())

    document.body.addEventListener('click',()=>{
        filterContainer.classList.remove('show-filter')
    })
}

filterToggle()

// Filter Mobile Show -------------------------------------------------------<

// Filter QtyShow ------------------------------------------------------------>

function filterQty(elShow) {
    const listFilter = document.querySelectorAll('.filter-type-list')
    const btn = document.querySelectorAll('.btn-type-action')

    listFilter.forEach((el, i)=>{
        const arrayEl = Array.from(el.children)
            arrayEl.forEach((item,index)=>{
            if(index>=elShow) {
                item.style.display = 'none'
            }
        })

        if(!btn[i]) return

        if(arrayEl.length>elShow) {
            btn[i].style.display = 'block'
        } else {
            btn[i].style.display = 'none'
        }

        btn[i].addEventListener('click',()=>{
            arrayEl.forEach(filter=>{
                filter.style.display = 'block'
            })
            btn[i].style.display = 'none'
        })
    })


}

filterQty(5)

// Filter QtyShow ------------------------------------------------------------<

// Input range ----------------------------------------->
function inputRange() {
    function move(slider, thumbMin, thumbMax, track, { minNumber, maxNumber }) {
      thumbMin.onpointerdown = onPointerDown;
      thumbMin.ondragstart = function () {
        return false;
      };
      thumbMax.onpointerdown = onPointerDown;
      thumbMax.ondragstart = function () {
        return false;
      };

      let rangeMin = +(slider.dataset?.rangeMin || 0)
      let rangeMax = +(slider.dataset?.rangeMax || 0)

      let valueMin = rangeMin
      let valueMax = rangeMax
      let min = 0;
      let max = 100;

      function onPointerDown(event) {
        event.preventDefault();

        let thumb = event.target;
        let typeThumb = JSON.parse(thumb.dataset.left);
        let widthProportion = 100 / slider.offsetWidth;

        let shiftX =
          (event.clientX - thumb.getBoundingClientRect().left) *
          widthProportion;

        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);

        function onPointerMove(event) {
          let thumbMinLeft =
            (thumbMin.offsetLeft + thumbMin.offsetWidth) * widthProportion;
          let thumbMaxLeft =
            (thumbMax.offsetLeft - thumbMax.offsetWidth) * widthProportion;

          let newLeft =
            (event.clientX - shiftX - slider.getBoundingClientRect().left) *
            widthProportion;

          if (newLeft < 0 && typeThumb) {
            newLeft = 0;
          } else if (newLeft < thumbMinLeft && !typeThumb) {
            newLeft = thumbMinLeft;
          }

          let rightEdge =
            (slider.offsetWidth - thumb.offsetWidth) * widthProportion;

          if (newLeft > rightEdge && !typeThumb) {
            newLeft = rightEdge;
          } else if (newLeft > thumbMaxLeft && typeThumb) {
            newLeft = thumbMaxLeft;
          }
          track.style.left =
            (typeThumb
              ? newLeft + thumbMin.offsetWidth * widthProportion
              : thumbMinLeft) + "%";
          track.style.width =
            thumbMaxLeft -
            thumbMinLeft +
            thumbMax.offsetWidth * widthProportion +
            "%";

          thumb.style.left = newLeft + "%";
          
          min = Math.round(((thumbMinLeft - minNumber) * 100) / maxNumber);
          max = Math.round(
            ((thumbMax.offsetLeft - thumbMax.offsetWidth) *
              widthProportion *
              100) /
              maxNumber
          );
          valueMin = min*(rangeMax-rangeMin)/100+rangeMin
          valueMax = max*(rangeMax-rangeMin)/100+rangeMin

        }

        function onPointerUp() {
          
          document.removeEventListener("pointerup", onPointerUp);
          document.removeEventListener("pointermove", onPointerMove);
          let event = new CustomEvent("changerange", {
            detail: {
              min,
              max,
              valueMin,
              valueMax,
            },
          });
          slider.dispatchEvent(event);
        }
      }
    }

    document.querySelectorAll(".range-filter").forEach((element) => {
      let thumbMin = document.createElement("span");
      thumbMin.className = "range-filter-thumb-min";
      thumbMin.dataset.left = true;
      let thumbMax = document.createElement("span");
      thumbMax.className = "range-filter-thumb-max";
      thumbMax.dataset.left = false;
      let track = document.createElement("span");
      track.className = "range-filter-track";

      element.append(thumbMin, thumbMax, track);

      let left =
        ((thumbMin.offsetLeft + thumbMin.offsetWidth) * 100) /
        element.offsetWidth;
      let width =
        ((thumbMax.offsetLeft - thumbMax.offsetWidth) * 100) /
        element.offsetWidth;

      track.style.left = left + "%";
      track.style.width = width + "%";

      move(element, thumbMin, thumbMax, track, {
        minNumber: left,
        maxNumber: width,
      });
    });
  }
inputRange();
  
document
    .querySelector(".range-filter")
    ?.addEventListener("changerange", (e) => console.log(e.detail)); // example
// Input range -----------------------------------------<

// Show - Hide text --------------------------------------------------------->

function textToggle() {
  const btn = document.querySelectorAll('.text-toggle-btn')

  btn.forEach(item=>{
    const textContainer = item.closest('.text-toggle-container')?.querySelector('.text-toggle-text')
    if(!textContainer) return
    const height = textContainer.offsetHeight
    const heightScroll = textContainer.scrollHeight

    if(height>=heightScroll) {
      item.style.display = 'none'
    }

    item.addEventListener('click',()=>{
      textContainer.classList.toggle('show-text')
      item.style.display = 'none'
    })
  })
  
}

textToggle()

// Show - Hide text ---------------------------------------------------------<

// Toggle feedback container ------------------------------------------------->

function toggleFeedback() {
  const btnOpen = document.getElementById('offersOpenFeedback')
  const btnClose = document.getElementById('offersCloseFeedback')
  const feedbackContent = document.getElementById('feedbackContent')

  if(!btnOpen || !btnClose || !feedbackContent) return

  btnOpen.addEventListener('click',()=>{
    feedbackContent.classList.add('show-mobile')
  })

  btnClose.addEventListener('click',()=>{
    feedbackContent.classList.remove('show-mobile')
  })
}

toggleFeedback()

// Toggle feedback container -------------------------------------------------<

// Offers toggle -------------------------------------------------------------->

function offersFormToggle() {
  const form = document.getElementById('offersForm')
  const btn = document.getElementById('offersFormBtn')
  if(!form || !btn) return

  btn.addEventListener('click',()=>{
    btn.classList.toggle('opened-form')
    form.classList.toggle('opened-form')
  })
}

offersFormToggle()

// Offers toggle --------------------------------------------------------------<

if($( "#offersFormDate" ).datepicker) {
  $( "#offersFormDate" ).datepicker();
}

// Open popup personal cabinet ------------------------------------------------>

function openPopUp() {
  const btn = document.querySelectorAll('.cabinet-list-item-btn-setting')

  let prevBtn = null
  let prevPopUp = null

  btn.forEach(item=>{
    item.addEventListener('click',e=>{
      e.stopPropagation()
      if(prevBtn != item) {
        prevBtn?.classList.remove('active-modal')
        prevPopUp?.classList.remove('active-modal')
      }
      item.classList.toggle('active-modal')
      item.nextElementSibling.classList.toggle('active-modal')
      prevBtn = item
      prevPopUp = item.nextElementSibling
    })

    document.body.addEventListener('click',()=>{
      item.classList.remove('active-modal')
      item.nextElementSibling.classList.remove('active-modal')
    })

    item.nextElementSibling.addEventListener('click',e=>e.stopPropagation())
  })
}

openPopUp()

// Open popup personal cabinet ------------------------------------------------<

// Cabinet toggle ------------------------------------------------------------->

function cabinetToggle() {
  const btn = document.getElementById('cabinetToggle')
  const cabinetCard = document.getElementById('cabinetCard')

  if(!btn || !cabinetCard) return

  btn.addEventListener('click',e=>{
    e.stopPropagation()
    cabinetCard.classList.toggle('open-menu')
  })

  cabinetCard.addEventListener('click', e=>e.stopPropagation())

  document.body.addEventListener('click',()=>{
    cabinetCard.classList.remove('open-menu')
  })

}

cabinetToggle()

// Cabinet toggle -------------------------------------------------------------<

// More info client ----------------------------------------------------------->

function moreInfo() {
  const containerBtn = document.querySelectorAll(".cabinet-list-container-client .cabinet-list-item")
  const containerInfo = document.querySelectorAll(".cabinet-list-container-client .cabinet-list-item-more-info")

  containerBtn.forEach(item=>{
    item.addEventListener("click",()=>{
      item.classList.toggle("more-info")
    })
  })

  containerInfo.forEach(item=>{
    item.addEventListener("click",e=>e.stopPropagation())
  })

}

moreInfo()

// More info client -----------------------------------------------------------<

// Questions container open answer -------------------------------------------->

function openAnswer() {
  const listQuestions = document.querySelectorAll(".list-questions-item")
  const questionContainer = document.querySelector(".questions-content-desktop .questions-content-header")
  const answerContainer = document.querySelector(".questions-content-desktop .questions-content-body")
  if(!questionContainer || !answerContainer) return

  let prevElement = null

  listQuestions.forEach((item, index)=>{
    if(index === 0) {
      handleClick(item)
      prevElement = item
    }
    item.addEventListener("click",()=>handleClick(item))
  })

  function handleClick(item) {
    prevElement?.classList.remove("item-selected")
    
    const question = item.querySelector(".item-questions-action").innerText
    const answer = item.querySelector(".item-questions-content").innerHTML
    item.classList.add("item-selected")
    questionContainer.innerText = question
    answerContainer.innerHTML = answer
    prevElement = item

    const answerContainerMobile = item.querySelector(".item-questions-content")
    answerContainerMobile.style.height = 0
    $(answerContainerMobile).animate({
      height: `${answerContainerMobile.scrollHeight}px`,
      display: "inherit"
    }, 3000, ()=>{
      answerContainerMobile.style = null
    })
  }

}

openAnswer()

// Questions container open answer --------------------------------------------<