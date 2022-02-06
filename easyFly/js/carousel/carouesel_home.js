//main-carousel
$('.main-carousel').slick({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    // arrows: false,
    nextArrow: $(".main_carousel_arrow-right"),
    prevArrow: $(".main_carousel_arrow-left"),
    responsive:[
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 5,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });