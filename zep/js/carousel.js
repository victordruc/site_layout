$(".slider-new").slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  // arrows: false,
  nextArrow: $(".home-main-new-slider-wrapper .btn-slider-next"),
  prevArrow: $(".home-main-new-slider-wrapper .btn-slider-prev"),
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

$(".images-list-carousel-detail").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  // arrows: false,
  nextArrow: $("#carouselDetailBtnRight"),
  prevArrow: $("#carouselDetailBtnLeft"),
  asNavFor: '.top-images-carousel-detail',
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});


$(".top-images-carousel-detail").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false,
  asNavFor: '.images-list-carousel-detail',
});

$(".slider-similar").slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
  // arrows: false,
  nextArrow: $(".btn-slider.btn-slider-similar-next"),
  prevArrow: $(".btn-slider.btn-slider-similar-prev"),
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





$( window ).resize(function(){
  changeMargin()
})

function changeMargin() {
  if($(".home-main-new-slider-wrapper .btn-slider").hasClass("slick-hidden")) {
    $(".slider-new").css("margin","0 -10px")
  } else {
    $(".slider-new").css("margin","")
  }

  if($(".bottom-carousel-detail-btn").hasClass("slick-hidden")) {
    $(".images-list-carousel-detail").css("margin","0 -5px")
  } else {
    $(".images-list-carousel-detail").css("margin","")
  }

  if($(".similar-products-slider-wrapper .btn-slider").hasClass("slick-hidden")) {
    $(".slider-similar").css("margin","0 -10px")
  } else {
    $(".slider-similar").css("margin","")
  }
}

changeMargin()