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

  // Open-Close Filter ----------------------------------->
  function openCloseFilter() {
    const buttonFilter = document.querySelectorAll(".filter-item-content")
    
    buttonFilter.forEach(btn=>{
      btn.addEventListener("click",e=>{
        btn.classList.toggle("show-filter")
        const list = btn.closest(".catalog-filter-body-item").querySelector(".filter-toggle")
        const listContainerHeight = list.firstElementChild.offsetHeight
        list.classList.toggle("open-filter")
        if(list.classList.contains("open-filter")) {
          list.style.height = listContainerHeight + 20 + "px"
          list.addEventListener("transitionend", ()=>{
            list.style.height = "100%"
            list.style.height = list.offsetHeight + "px"
          },{once:true})
        } else {
          list.style.height = 0
          list.addEventListener("transitionend", ()=>{
            list.style.height = 0
          },{once:true})
        }
        
      })
    })
    
  }
  openCloseFilter() 
  // Open-Close Filter -----------------------------------<

  // Toggle filter catalog ------------------------------->
  function openFilter() {
    const btn = document.querySelector(".toggle-filter-btn")
    const filterCatalog = document.querySelector(".catalog-filter-wrapper")

    if(!btn || !filterCatalog) return
    btn.addEventListener("click",()=>{
      filterCatalog.classList.toggle("filter-show")
    })
    filterCatalog.addEventListener("click", e=>e.stopPropagation())
    document.body.addEventListener("click",()=>{
      filterCatalog.classList.remove("filter-show")
    })
  }
  openFilter()
  // Toggle filter catalog -------------------------------<

  // Detail Show-Hide ------------------------------------>
  function detailShowText() {
    const btn = document.querySelector(".detail-show-hide")
    const detailText = document.querySelector(".detail-description-product")
    if(!btn || !detailText) return

    btn.addEventListener("click",e=>{
      detailText.classList.add("show-text")
        btn.style.display = "none"
    })
  }
  detailShowText()
  // Detail Show-Hide ------------------------------------<