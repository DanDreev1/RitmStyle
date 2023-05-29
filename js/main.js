// Отримуємо необхідні елементи з DOM
let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');
let activeSlide = document.querySelector('.slide--active');

let scrollSpeed = 300;
let isScrolling = false;

// Встановлюємо активний слайд
function setActiveSlide(slideIndex) {
  activeSlide.classList.remove('slide--active');

  slides[slideIndex].classList.add('slide--active');

  activeSlide = slides[slideIndex];

  // Переміщуємо слайдер, щоб активний слайд був по центру
  let slideWidth = activeSlide.offsetWidth;
  let sliderWidth = slider.offsetWidth;
  let sliderOffset = slider.getBoundingClientRect().left;
  let slideOffset = activeSlide.getBoundingClientRect().left; 
  let slideCenterOffset = slideOffset - sliderOffset + slideWidth / 2; 
  let translateX = sliderWidth / 2 - slideCenterOffset; 
  slider.style.transform = `translateX(${translateX}px)`; 
}

// Функція для показу попереднього слайда
function showPreviousSlide() {
  if (isScrolling) return; 
  isScrolling = true; 

  let currentIndex = Array.from(slides).indexOf(activeSlide); 
  let previousIndex = (currentIndex - 1 + slides.length) % slides.length; 
  setActiveSlide(previousIndex); 

  setTimeout(function () {
    isScrolling = false; 
  }, scrollSpeed);
}

// Функція для показу наступного слайда
function showNextSlide() {
  if (isScrolling) return; 
  isScrolling = true; 

  let currentIndex = Array.from(slides).indexOf(activeSlide); 
  let nextIndex = (currentIndex + 1) % slides.length; 
  setActiveSlide(nextIndex); 

  setTimeout(function () {
    isScrolling = false; 
  }, scrollSpeed);
}

// Обробник події скролу на слайдері
slider.addEventListener('wheel', handleSliderScroll);

function handleSliderScroll(event) {
  event.preventDefault(); 
  event.stopPropagation(); 

  let delta = Math.sign(event.deltaY); 
  if (delta > 0) {
    showNextSlide(); 
  } else {
    showPreviousSlide(); 
  }
}

// Задаємо активний слайд по центру після завантаження сторінки
window.addEventListener('load', function () {
  let initialSlideIndex = Array.from(slides).indexOf(activeSlide); 
  setActiveSlide(initialSlideIndex); 
});
