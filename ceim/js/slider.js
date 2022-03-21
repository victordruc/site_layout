$(".slick-header").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
});

$(".slider-reviews").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    // nextArrow: $(".slider-recomand-wrapper .control-right"),
    // prevArrow: $(".slider-recomand-wrapper .control-left"),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
});

$(".main-medical-team-slider").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  // nextArrow: $(".slider-recomand-wrapper .control-right"),
  // prevArrow: $(".slider-recomand-wrapper .control-left"),
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

$(".main-about-footer-slider").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  // autoplay: true,
  // autoplaySpeed: 2000,
});