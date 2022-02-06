$(document).ready(function(){

  $('.carousel-list-news').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    // arrows: false,
    nextArrow: $(".carousel-button-left"),
    prevArrow: $(".carousel-button-right"),
    responsive:[
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

  $('.main-partners-carousel').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    // nextArrow: $(".carousel-button-left"),
    // prevArrow: $(".carousel-button-right"),
    responsive:[
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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


})