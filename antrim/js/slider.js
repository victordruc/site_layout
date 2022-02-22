$(".slider-home-main-recomand").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  // arrows: false,
  nextArrow: $(".slider-recomand-wrapper .control-right"),
  prevArrow: $(".slider-recomand-wrapper .control-left"),
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

$(".slide-interesting").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  // arrows: false,
  nextArrow: $(".slider-interesting-control.control-right"),
  prevArrow: $(".slider-interesting-control.control-left"),
});

$("#sliderBlog").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  // arrows: false,
  nextArrow: $("#sliderBlogRight"),
  prevArrow: $("#sliderBlogLeft"),
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});