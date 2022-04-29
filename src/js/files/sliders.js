/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Controller } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

//import 'swiper/css/controller';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.slider-main__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.slider-main__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 5,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,

			centeredSlides: true,
			//grabCursor: true,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-main__arrows .slider-arrow_prev',
				nextEl: '.slider-main__arrows .slider-arrow_next',
			},

			// Брейкпоинты
			breakpoints: {
				0: {
					slidesPerView: 2.55,
					spaceBetween: 0,
				},
				350: {
					slidesPerView: 2.65,
					spaceBetween: 0,
				},
				500: {
					slidesPerView: 3.2,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 5,
					spaceBetween: 0,
				},
			},
			// События
			on: {
				slideChange: function () {
					//console.log('change event');  // make scale slides
					let myLeftSlideIndex = this.activeIndex - 2;
					let myRightSlideIndex = this.activeIndex + 2;
					let mySlides = this.slides;
					let myLeftSlide = mySlides[myLeftSlideIndex];
					let myRightSlide = mySlides[myRightSlideIndex];
					//console.log(myLeftSlide);
					//console.log(myRightSlide);
					myLeftSlide.classList.add('_slider-main__slider_special-left');
					myRightSlide.classList.add('_slider-main__slider_special-right');


					// make choice main
					let activeSlide = mySlides[this.activeIndex];
					activeSlide.addEventListener('click', choice);

					let links = activeSlide.querySelectorAll('a');

					function choice(e) {
						let target = e.target;

						if (target.closest('.swiper-slide-active') && !target.closest('.slider-main__choice')) {
							activeSlide.classList.toggle('_choice-active');

							if (activeSlide.closest('._choice-active')) {
								links.forEach(link => {
									link.removeAttribute('tabIndex')
								})
							} else {
								links.forEach(link => {
									link.setAttribute('tabIndex', '-1');
								})
							}
						}
					};


					this.on('slideChange', function () { // activeIndexChange
						activeSlide.classList.remove('_choice-active');
						activeSlide.removeEventListener('click', choice);
						links.forEach(link => {
							link.setAttribute('tabIndex', '-1');
						});

						//console.log('change a');
						//console.log(myLeftSlide);
						//console.log(myRightSlide);
						myLeftSlide.classList.remove('_slider-main__slider_special-left');
						myRightSlide.classList.remove('_slider-main__slider_special-right');
					})
				},
			}
		});
	}

	if (document.querySelector('.slider-autopark__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		let autoparkSlider = new Swiper('.slider-autopark__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,

			observeSlideChildren: true,
			//centeredSlides: true,
			//grabCursor: true,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			pagination: {
				el: '.slider-autopark__pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-autopark__arrows .slider-arrow_prev',
				nextEl: '.slider-autopark__arrows .slider-arrow_next',
			},

			// Брейкпоинты
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 1,
				},
				360: {
					slidesPerView: 1.15,
				},
				410: {
					slidesPerView: 1.3,
				},
				480: {
					slidesPerView: 1.5,
				},
				560: {
					slidesPerView: 1.7,
				},
				650: {
					slidesPerView: 1.9,
				},
				720: {
					slidesPerView: 2.1,
				},
				768: {
					slidesPerView: 2.35,
				},
				810: {
					slidesPerView: 2.4,
				},
				870: {
					slidesPerView: 2.5,
				},
				930: {
					slidesPerView: 2.7,
				},
				992: {
					slidesPerView: 3,
				},
			},
			// События
			on: {

			}
		});

		const autoparkButtons = document.querySelectorAll('.filter-autopark__button');
		const autoparkSlides = autoparkSlider.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate'));
		let filterInd = null;

		autoparkButtons.forEach(button => {
			button.addEventListener('click', function () {
				button.classList.toggle('_active-filter');
				autoparkButtons.forEach(buttonOth => {
					if (buttonOth !== button) buttonOth.classList.remove('_active-filter')
				})

				const buttonData = button.dataset.filter;

				if (button.classList.contains('_active-filter')) {
					filterInd = buttonData;
					//autoparkSlider.loopDestroy();
					autoparkSlider.slides.forEach(slide => {
						slide.remove()
					})

					const sliderWrapper = document.querySelector('.slider-autopark__wrapper');
					autoparkSlides.forEach(slide => {
						if (slide.classList.contains(`slider-autopark_${buttonData}`)) {
							sliderWrapper.append(slide);
						}
					})

					autoparkSlider.loopCreate();
					autoparkSlider.update();
					autoparkSlider.slideToLoop(0, 500);
				}

				if (!button.classList.contains('_active-filter') && filterInd === buttonData) {
					//autoparkSlider.loopDestroy();
					autoparkSlider.slides.forEach(slide => {
						slide.remove()
					})

					const sliderWrapper = document.querySelector('.slider-autopark__wrapper');
					autoparkSlides.forEach(slide => {
						sliderWrapper.append(slide);
					})

					autoparkSlider.loopCreate();
					autoparkSlider.update();
					autoparkSlider.slideToLoop(0, 500);
				}
			})
		})
	}

	if (document.querySelector('.slider-small-reviews__slider') && document.querySelector('.slider-big-reviews__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		let smallReviewsSlider = new Swiper('.slider-small-reviews__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Controller],
			observer: true,
			observeParents: true,
			slidesPerView: 5,
			spaceBetween: 15,
			autoHeight: false,
			speed: 800,

			observeSlideChildren: true,
			//centeredSlides: true,
			grabCursor: true,
			slideToClickedSlide: true,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			/* pagination: {
				el: '.slider-autopark__pagination',
				clickable: true,
			}, */


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			/* navigation: {
				prevEl: '.slider-autopark__arrows .slider-arrow_prev',
				nextEl: '.slider-autopark__arrows .slider-arrow_next',
			}, */

			// Брейкпоинты
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 1.2,
				},
				400: {
					slidesPerView: 1.7,
				},
				570: {
					slidesPerView: 2.5,
				},
				768: {
					slidesPerView: 3,
				},
				1001: {
					slidesPerView: 4,
				},
				1281: {
					slidesPerView: 5,
				}
			},
			// События
			on: {

			}
		});

		let bigReviewsSlider = new Swiper('.slider-big-reviews__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Controller],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: false,
			speed: 800,

			observeSlideChildren: true,
			//centeredSlides: true,
			//grabCursor: true,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			loopAdditionalSlides: 5,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			pagination: {
				el: '.slider-big-reviews__pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-big-reviews__arrows .slider-arrow_prev',
				nextEl: '.slider-big-reviews__arrows .slider-arrow_next',
			},

			// Брейкпоинты
			breakpoints: {

			},
			// События
			on: {

			}
		});

		smallReviewsSlider.controller.control = bigReviewsSlider;
		bigReviewsSlider.controller.control = smallReviewsSlider;

		bigReviewsSlider.on('slideChange', function () {
			let previousActiveSlide = bigReviewsSlider.slides[bigReviewsSlider.previousIndex];

			const showmoreBlock = previousActiveSlide.querySelector('[data-showmore]');
			//console.log(showmoreBlock);
			if (showmoreBlock.classList.contains('_showmore-active')) {
				const showmoreButton = showmoreBlock.querySelector('[data-showmore-button]');
				showmoreButton.click();
			}
		})
	}

}


// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
