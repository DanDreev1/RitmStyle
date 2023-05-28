// Отримуємо необхідні елементи з DOM
let slider = document.querySelector('.slider'); // Отримуємо елемент слайдера з класом "slider"
let slides = document.querySelectorAll('.slide'); // Отримуємо всі елементи слайдів з класом "slide"
let activeSlide = document.querySelector('.slide--active'); // Отримуємо активний слайд з класом "slide--active"

let scrollSpeed = 300; // Встановлюємо швидкість прокручування слайдів (в мілісекундах)
let isScrolling = false; // Флаг для визначення, чи відбувається прокручування

// Встановлюємо активний слайд
function setActiveSlide(slideIndex) {
  activeSlide.classList.remove('slide--active'); // Знімаємо клас "slide--active" з активного слайда

  slides[slideIndex].classList.add('slide--active'); // Додаємо клас "slide--active" до обраного слайда

  activeSlide = slides[slideIndex]; // Оновлюємо посилання на активний слайд

  // Переміщуємо слайдер, щоб активний слайд був по центру
  let slideWidth = activeSlide.offsetWidth; // Ширина активного слайда
  let sliderWidth = slider.offsetWidth; // Ширина слайдера
  let sliderOffset = slider.getBoundingClientRect().left; // Відстань слайдера до лівого краю вікна
  let slideOffset = activeSlide.getBoundingClientRect().left; // Відстань активного слайда до лівого краю вікна
  let slideCenterOffset = slideOffset - sliderOffset + slideWidth / 2; // Відстань активного слайда до центру слайдера
  let translateX = sliderWidth / 2 - slideCenterOffset; // Значення для зсуву слайдера
  slider.style.transform = `translateX(${translateX}px)`; // Застосовуємо зсув до слайдера
}

// Функція для показу попереднього слайда
function showPreviousSlide() {
  if (isScrolling) return; // Якщо вже відбувається прокручування, вийти з функції
  isScrolling = true; // Встановлюємо флаг прокручування

  let currentIndex = Array.from(slides).indexOf(activeSlide); // Отримуємо індекс активного слайда
  let previousIndex = (currentIndex - 1 + slides.length) % slides.length; // Обчислюємо індекс попереднього слайда (з врахуванням зацикленості)
  setActiveSlide(previousIndex); // Встановлюємо попередній слайд як активний

  setTimeout(function () {
    isScrolling = false; // Після закінчення прокручування, знімаємо флаг прокручування
  }, scrollSpeed);
}

// Функція для показу наступного слайда
function showNextSlide() {
  if (isScrolling) return; // Якщо вже відбувається прокручування, вийти з функції
  isScrolling = true; // Встановлюємо флаг прокручування

  let currentIndex = Array.from(slides).indexOf(activeSlide); // Отримуємо індекс активного слайда
  let nextIndex = (currentIndex + 1) % slides.length; // Обчислюємо індекс наступного слайда (з врахуванням зацикленості)
  setActiveSlide(nextIndex); // Встановлюємо наступний слайд як активний

  setTimeout(function () {
    isScrolling = false; // Після закінчення прокручування, знімаємо флаг прокручування
  }, scrollSpeed);
}

// Обробник події скролу на слайдері
slider.addEventListener('wheel', handleSliderScroll);

function handleSliderScroll(event) {
  event.preventDefault(); // Відміняємо стандартну поведінку скролу
  event.stopPropagation(); // Зупиняємо подальше поширення події

  let delta = Math.sign(event.deltaY); // Визначаємо напрямок прокручування (1 - вниз, -1 - вгору)
  if (delta > 0) {
    showNextSlide(); // Показуємо наступний слайд при прокручуванні вниз
  } else {
    showPreviousSlide(); // Показуємо попередній слайд при прокручуванні вгору
  }
}

// Задаємо активний слайд по центру після завантаження сторінки
window.addEventListener('load', function () {
  let initialSlideIndex = Array.from(slides).indexOf(activeSlide); // Отримуємо індекс активного слайда
  setActiveSlide(initialSlideIndex); // Встановлюємо активний слайд по центру
});
