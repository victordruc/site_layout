document.addEventListener("DOMContentLoaded", () => {
  // Navbar Toggle Menu ---------------------------------->
  const buttonToggleNavbar = document.querySelector(".navbar-toggler");
  const idContent = document.querySelector(
    buttonToggleNavbar.dataset.navbarTarget
  );
  function navbarToggle(buttonToggleNavbar, idContent) {
    if (!idContent || !buttonToggleNavbar) return;

    document.body.addEventListener("click", (e) => {
      idContent.classList.remove("active");
    });

    buttonToggleNavbar.addEventListener("click", (e) => {
      e.stopPropagation();
      idContent.classList.toggle("active");
    });

    idContent.addEventListener("click", (e) => e.stopPropagation());
  }
  navbarToggle(buttonToggleNavbar, idContent);
  // Navbar Toggle Menu ----------------------------------<

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
        }

        function onPointerUp() {
          document.removeEventListener("pointerup", onPointerUp);
          document.removeEventListener("pointermove", onPointerMove);
          let event = new CustomEvent("changerange", {
            detail: {
              min,
              max,
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

  // Filter Toggle Menu ---------------------------------->
  const idFilterToggle = document.querySelector("#filterToggleButton");
  const idfilterArticle = document.querySelector("#filterArticle");

  function filterToggle(idFilterToggle, idfilterArticle) {
    if (!idFilterToggle || !idfilterArticle) return;

    idfilterArticle.onclick = (e) => e.stopPropagation();

    idFilterToggle.onclick = (e) => {
      e.stopPropagation();
      idfilterArticle.classList.toggle("active");

      document.body.addEventListener(
        "click",
        () => {
          idfilterArticle.classList.remove("active");
        },
        { once: true }
      );
    };
  }

  filterToggle(idFilterToggle, idfilterArticle);
  // Filter Toggle Menu ----------------------------------<

  // change backGround ------------------------------------>
  function changeBackgroundNav(corection=100) {
    let navbar = document.querySelector(".navbar.navbar-expand")
    let prevScrollpos = window.pageYOffset;
    if(prevScrollpos > corection) {
      navbar.classList.add("scroll-top")
    }
  
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos > corection) {
        navbar.classList.add("scroll-top")
      } else {
        navbar.classList.remove("scroll-top")
      }
      prevScrollpos = currentScrollPos;
    };
  }
  const correction = 50
  changeBackgroundNav(correction)
  // change backGround ------------------------------------<
});
