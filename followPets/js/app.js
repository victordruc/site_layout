// Initialization slider ------------------------------------->
(function () {
  $("#sliderSection5").on("init", function (event, slick) {
    const btnWrapper = document.getElementById("dotsSlider");
    btnWrapper.append(slick.$dots[0]);
  });

  $("#sliderSection5").on("breakpoint", function (event, slick) {
    const btnWrapper = document.getElementById("dotsSlider");
    btnWrapper.append(slick.$dots[0]);
  });

  $("#sliderSection5").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    nextArrow: $("#sliderSection5+.slider-btns .next-btn"),
    prevArrow: $("#sliderSection5+.slider-btns .prev-btn"),
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
})();
// Initialization slider -------------------------------------<

AOS.init();