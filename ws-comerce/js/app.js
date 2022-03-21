// Initialization slider ------------------------------------->
(function () {
  $("#sliderList").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    //   dots: true,
    nextArrow: $("#sliderList~.btn-slider-next"),
    prevArrow: $("#sliderList~.btn-slider-prev"),
    responsive: [
      {
        breakpoint: 1660,
        settings: {
          arrows: false,
        },
      },
    ],
  });
})();
// Initialization slider -------------------------------------<

// Toggle Navigation Menu ------------------------------------>
(function(){
  const btn = document.querySelector(".toggle-nav")
  const navbar = document.querySelector(".navbar-wrapper")
  const navigationPanel = document.querySelector(".navigation-panel")

  btn.addEventListener("click",e=>{
    e.stopPropagation()
    navbar.classList.toggle("opened")
  })

  navigationPanel.addEventListener("click",e=>e.stopPropagation())

  document.body.addEventListener("click",()=>{
    navbar.classList.remove("opened")
  })

})()
// Toggle Navigation Menu ------------------------------------<

// Chart Design ---------------------------------------------->
(function(){
  const chartContainer = document.querySelectorAll(".chart-design-wrapper")
  console.log("ff")
  chartContainer.forEach(item=>{
    for(let i=0; i<10; i++) {
      item.innerHTML += `<div class="chart-design"></div>`
    }
  })
})()
// Chart Design ----------------------------------------------<