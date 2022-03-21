const navbarButton = document.getElementById("navbarButton"),
	navbar = document.getElementById("navbar"),
	searchForm = document.getElementById("searchForm"),
	searchButton = document.getElementById("searchButton");



if (navbarButton) {
	navbarButton.addEventListener("click", function () {
		navbarButton.classList.toggle('active');
		navbar.classList.toggle('active');
	});
};

[...document.querySelectorAll('.navbar__link')].forEach(function (item) {
	item.addEventListener('click', function () {
		navbarButton.classList.remove('active');
		navbar.classList.remove('active');
	});
});

if (searchButton) {
	searchButton.addEventListener("click", function () {
		searchButton.classList.toggle('active');
		searchForm.classList.toggle('active');
	});
};



$('.header__sldier').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	infinite: true,
	dots: true,
	appendDots: $('.header__sldier__dots')
});


$('.projects__slider').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: $('.projects__slider__btn__prev'),
	nextArrow: $('.projects__slider__btn__next'),
	responsive: [
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToScroll: 1,
				slidesToShow: 1
			}
		}
	]
});

$('.event__slider').slick({
	infinite: true,
	slidesToShow: 2,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: $('.event__slider__btn__prev'),
	nextArrow: $('.event__slider__btn__next'),
	responsive: [
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}
	]
});

$('.members__slider').slick({
	infinite: true,
	slidesToShow: 6,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: $('.members__slider__btn__prev'),
	nextArrow: $('.members__slider__btn__next'),
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		},
	]
});


$('.partners__slider').slick({
	infinite: true,
	slidesToShow: 6,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: $('.partners__slider__btn__prev'),
	nextArrow: $('.partners__slider__btn__next'),
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 4
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		},
	]
});



let $status = $('.pagingInfo');
let $slickElement = $('.events__slider');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
	let i = (currentSlide ? currentSlide : 0) + 1;
	$status.text(i + '/' + slick.slideCount);
});

$('.events__slider').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: $('.events__slider__btn__prev'),
	nextArrow: $('.events__slider__btn__next'),
	responsive: [
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1
			}
		}
	]
});








// All collapsible 
[...document.querySelectorAll('.collapsible ')].forEach(function (item) {
	item.addEventListener('click', function () {
		item.classList.toggle('active');
	});
});

// SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});
