// Placeholder for Input ------------------------------------------>
(function (inputPlaceholder) {
  const placeholder = document.querySelectorAll(inputPlaceholder);
  placeholder.forEach((item) => {
    const input = item.querySelector("input");
    const inputPlaceholder = item.querySelector(".input-placeholder-text");
    const padding = window.getComputedStyle(input).padding;
    inputPlaceholder.style.padding = padding;
    if (input.value) {
      inputPlaceholder.style.display = "none";
    }
    input.addEventListener("input", (e) => {
      if (e.target.value) {
        inputPlaceholder.style.display = "none";
      } else {
        inputPlaceholder.style.display = null;
      }
    });
  });
})(".input-placeholder");
// Placeholder for Input ------------------------------------------<

// Initialization slider ------------------------------------->
$("#sliderMustHave").slick({
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  nextArrow: $(".must-have.next-btn"),
  prevArrow: $(".must-have.prev-btn"),
  responsive: [
    {
      breakpoint: 575,
      settings: {
        arrows: false,
      },
    },
  ],
});

$("#sliderStagesDevelopment").slick({
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  nextArrow: $(".stages-development.next-btn"),
  prevArrow: $(".stages-development.prev-btn"),
  responsive: [
    {
      breakpoint: 920,
      settings: {
        // arrows: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        // arrows: false,
        slidesToShow: 1,
      },
    },
  ],
});
// Initialization slider -------------------------------------<

// Open left menu -------------------------------------------->
(function(){
  const btn = document.getElementById("btnNavigationTop")
  const container = document.getElementById("leftContentMenu")
  if(!btn || !container) return
  btn.addEventListener("click",e=>{
    e.stopPropagation()
    container.classList.toggle("open-left-menu")
  })
  container.addEventListener("click",e=>e.stopPropagation())
  document.body.addEventListener("click",e=>{
    container.classList.remove("open-left-menu")
  })
})()
// Open left menu --------------------------------------------<

// Open search input Navbar ----------------------------------->
function searchNavbar(searchBtn){
  const btn = document.querySelector(searchBtn);
  const input = document.querySelector("#searchInputNavbar")

  if(!btn || !input) return

  btn.addEventListener("click",e=>{
    e.stopPropagation()
    input.classList.toggle("search-input-open")
  })

  input.addEventListener("click",e=>e.stopPropagation())

  document.body.addEventListener("click",()=>{
    input.classList.remove("search-input-open")
  })
}
searchNavbar(".navbar-search-btn")
// Open search input Navbar -----------------------------------<