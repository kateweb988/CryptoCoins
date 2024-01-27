
// $('.articmodal-close').click(function (e) {
// 	$.arcticmodal('close');

// });
// $('.btn').click(function (e) {
// 	e.preventDefault();
// 	$('#popup-call').arcticmodal({
// 	});
// });
document.addEventListener("DOMContentLoaded", () => {

	function log(log) { console.log(log); }

	/** text_slider */
	{
		if ($('.text_slider--slide')) {
			let textSliderCounter = 1;
			let textSliderLength = $('.text_slider--slide').length;
			let userIsOnline = true;

			$(window).on('focus', () => { userIsOnline = true; }); /** Активная вкладка */
			$(window).on('blur', () => { userIsOnline = false; }); /** Неактивная вкладка */

			textSlider();

			function textSlider() {
				setInterval(() => {
					if (userIsOnline) {
						$('.text_slider--slide').slideUp(300);
						setTimeout(() => { $('.text_slider--slide').eq(textSliderCounter).slideDown(300); }, 300);
						textSliderCounter++;
						if (textSliderCounter >= textSliderLength) { textSliderCounter = 0; }
					}
				}, 2000);
			}
		}
	}

	/** Main menu on mobile */
	{
		let windowWidth = $(window).width();
		$(window).resize(() => {
			windowWidth = $(window).width();
			$('.main_submenu--list').removeAttr('style');
			$('.main_submenu').removeClass('active');
		});

		$('.main_menu--item.main_submenu').on('click', function () {
			if (windowWidth <= 1000) {
				$('.main_menu--item.main_submenu .main_submenu--list').slideUp(200);

				if (!$(this).hasClass('active')) {
					$('.main_submenu').removeClass('active');
					$(this).addClass('active');
					$(this).find('.main_submenu--list').slideDown(200);
				} else {
					$('.main_submenu').removeClass('active');
				}
			}
		});

		$('.menu_burger').on('click', mainMenuOpen);
		$('.header--menu').on('click', mainMenuClose);
		$('.main_menu--close_button').on('click', mainMenuClose);
		$('.header--menu_wrapper').on('click', (el) => { el.stopPropagation(); })

		function mainMenuOpen() {
			$('.header--menu').addClass('opening open');
		}

		function mainMenuClose() {
			$('.header--menu').removeClass('open');
			setTimeout(() => {
				$('.header--menu').removeClass('opening');
			}, 200)
		}
	}

	/** Tabslider */
	{
		/** при разрешении менее 1000px табы превращаются в аккордион */
		let tabOpen = $('[data-tabopen]'); 			/** Все кнопки переключающие табы */
		let tabItem = $('[data-tab]');					/** Все табы */
		let isSize = $(window).width() <= 1000; /** Определяем, переключатель между аккордионом и табами */
		let currentTab = ''; 										/** Тут будет идентификатор первого таба */

		$(window).resize(() => {																	/** При изменении разрешения */
			isSizeOld = isSize;
			isSize = $(window).width() <= 1000;											/** Перепроверяем размер экрана */

			if (isSize === isSizeOld) { return; }		/** Если произошло изменение ширины, НЕ требующее переключения состояния */

			if (!isSize) {
				$('.tabslider--content').slideDown();									/** При переходе на широкий открываем скрытый контет */
				$(`[data-tabopen=${currentTab}]`).addClass('active'); /** Активируем нужную кнопку переключателей */
			} else {
				$('.tabslider--content').slideUp();										/** Убираем весь контент */
				$(`[data-tab=${currentTab}]`).find('.tabslider--content').slideDown();	/** Раскрываем текущий контент */
				tabItem.removeClass('hide'); 													/** Удаляем касс анимации */
			}
		});

		tabOpen.eq(0).addClass('active'); 						/** Активируем первую кнопку сразу */
		tabItem.eq(0).addClass('active'); 						/** Открываем первый таб сразу */
		currentTab = tabItem.eq(0).attr('data-tab');	/** Фиксируем открытый таб */

		if ($(window).width() <= 1000) {														/** Если состояние аккордиона */
			tabItem.eq(0).find('.tabslider--content').slideDown();  /** раскрываем первый элемент */
		}

		tabOpen.on('click', function () {     /** Переключение табов */
			tabSlide($(this));
		});

		function tabSlide(tabBtn) {
			tabOpen.removeClass('active'); 		/** Дезактивируем все кнопки */
			tabBtn.addClass('active'); 				/** Активируем текущую */

			let tabTarget = tabBtn.attr('data-tabopen'); 			/** Достаем идентификатор таба */
			if (currentTab !== tabTarget) {										/** Если идентификатор именился */
				currentTab = tabTarget; 												/** Фиксируем новый идентификатор */
				let tab = $(`[data-tab="${tabTarget}"]`); 			/** Находим нужный таб */

				if (isSize) {																		/** Если состояние аккордиона */
					tabItem.removeClass('active'); 								/** Дезактивируем кнопку */
					$('.tabslider--content').slideUp();						/** Убираем весь контент */
					tab.find('.tabslider--content').slideDown();	/** Раскрываем текущий контент */
					tab.addClass('active'); 											/** Активируем кнопку */
				} else {
					tabItem.addClass('hide'); 				/** Запускаем анимацию сокрытия у всех табов */
					setTimeout(() => {									/** По заврешении анимации */
						tabItem.removeClass('active'); 	/** полностью скрываем все табы */
						tab.addClass('active'); 				/** Открываем текущий таб (Запускаятся анимация) */
						setTimeout(() => {								/** По заврешении анимации */
							tab.removeClass('hide'); 			/** Удаляем класс анимации */
						}, 200);
					}, 200);
				}
			}
		}
	}

	/** Project slider */
	{
		let projectsSlide = $('[data-prjct_slide]');
		let projectsLength = projectsSlide.length;
		let projectsPoints = $('[data-prjct_points]');
		let slideOpened = 0;

		projectsInit(1);


		function projectsInit(firstOpen) {
			for (let itm = 1; itm <= projectsLength; itm++) {
				projectsPoints.append(`<div data-prjct="${itm}" class="project_slider--point"></div>`);
			}
			slidePaging(firstOpen);
		}

		function slidePaging(toSlide) {

			if (slideOpened === toSlide) { return; }
			slideOpened = toSlide;
			$(`[data-prjct]`).removeClass('active');
			$(`[data-prjct=${toSlide}]`).addClass('active');

			projectsSlide[slideOpened].addClass('closure');
			projectsSlide[slideOpened].removeClass('active');
			setTimeout(() => {
				$(`[data-prjct_slide=${toSlide}]`).addClass('active');
			}, 200);
			slideOpened = toSlide;
		}


		log(`
			projectsLength: ${projectsLength}
		`);
	}



});
$('.mob-link1').click(function (event) {
	$(this).css('display', 'none');
	$('.mob-see1').slideToggle();
	return false;
});
$('.mob-link2').click(function (event) {
	$(this).css('display', 'none');
	$('.mob-see2').slideToggle();
	return false;
});
$('.mob-link3').click(function (event) {
	$(this).css('display', 'none');
	$('.mob-see3').slideToggle();
	return false;
});
$('.mob-link4').click(function (event) {
	$(this).css('display', 'none');
	$('.mob-see4').slideToggle();
	return false;
});
$('.mob-link5').click(function (event) {
	$(this).css('display', 'none');
	$('.mob-see5').slideToggle();
	return false;
});
$('.project-slider').slick({
	dots: true,
	infinite: false,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button type="button" class="slick-prev"><img src="img/project-slider/left.svg"></button>',
	nextArrow: '<button type="button" class="slick-next"><img src="img/project-slider/right.svg"></button>',
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 1,
			}
		}
	]

});
$('.tech__slider').slick({
	dots: true,
	infinite: true,
	arrows: false,
	slidesToShow: 7,
	slidesToScroll: 1,
	prevArrow: '<button type="button" class="slick-prev"><img src="img/project-slider/left.svg"></button>',
	nextArrow: '<button type="button" class="slick-next"><img src="img/project-slider/right.svg"></button>',
	responsive: [
		{
			breakpoint: 1570,
			settings: {
				slidesToShow: 6,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			}
		}
	]

});
$('.art__slider').slick({
	dots: true,
	infinite: true,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button type="button" class="slick-prev"><img src="img/project-slider/left.svg"></button>',
	nextArrow: '<button type="button" class="slick-next"><img src="img/project-slider/right.svg"></button>',
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 1,
			}
		}
	]

});
// Яндекс-карта
// Инициализация карты
ymaps.ready(init);

function init() {

	//Центрирование и выбор масштаба карты
	var myMap = new ymaps.Map('map', {
		center: [53.899642, 27.525234],  //ввод координат
		zoom: 11                         // масштаб
	});
	// Создание своей метки 
	var myPlacemark = new ymaps.Placemark(
		// Координаты метки
		[53.899642, 27.525234], {
		// Свойства метки
		// hintContent: 'Мой маркер'                //Подсказка при наведении на маркер
	}, {
		iconImageHref: 'img/map-icon.svg',  // картинка иконки
		iconImageSize: [46, 46],                                      // размеры картинки
		iconImageOffset: [-23, -46]                                   // смещение картинки
	});

	// Добавление метки на карту
	myMap.geoObjects.add(myPlacemark);

	//Элементы управления    
	myMap.controls
		// Кнопка изменения масштаба
		.add('zoomControl', { left: 5, top: 10 })
		// Список типов карты
		// .add('typeSelector')
		// // Кнопка изменения масштаба - справа
		.add('smallZoomControl', { right: 5, top: 10 })
		// // Стандартный набор кнопок
		// .add('mapTools')    
		//Линейка масштаба
		.add(new ymaps.control.ScaleLine());
	var isMobile = {
		Android: function () { return navigator.userAgent.match(/Android/i); },
		BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
		iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
		Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
		Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// после вызова карты
	if (isMobile.any()) {
		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');
	}
}