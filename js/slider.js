function initSlider(domElement, hasCounter) {
  var slider = domElement;
  var slides = slider.querySelectorAll(".slider__slide");
  var currentSlide;
  var controllers = slider.querySelectorAll(".slider__controller");
  var control = slider.querySelector(".slider__control");
  var currentController;
  var btnNext = slider.querySelector(".slider__btn--next");
  var btnPrev = slider.querySelector(".slider__btn--prev");
  var counter = slider.querySelector(".slider__counter");

  findCurrentController();
  setCounter(currentController + 1);

  function setCounter(index) {
    if (hasCounter) {
      counter.innerHTML = (index) + '/' + (slides.length);
    }
  }

  function findCurrentSlide() {
    for (var n = 0; n < slides.length; n++) {
      if (slides[n].classList.contains("slider__slide--showing")) {
        currentSlide = n;
      }
    }
  }

  function findCurrentController() {
    for (var i = 0; i < controllers.length; i++) {
      if (controllers[i].classList.contains("slider__controller--active")) {
        currentController = i;
      }
    }
  }

  function NextSlideHandler() {
    findCurrentSlide();
    findCurrentController();
    if (currentSlide < (slides.length - 1)) {
      slides[currentSlide + 1].classList.add("slider__slide--showing");
      slides[currentSlide].classList.remove("slider__slide--showing");
      controllers[currentSlide + 1].classList.add("slider__controller--active");
      controllers[currentSlide].classList.remove("slider__controller--active");
      setCounter(currentController + 2);
    } else {
      slides[0].classList.add("slider__slide--showing");
      slides[currentSlide].classList.remove("slider__slide--showing");
      controllers[0].classList.add("slider__controller--active");
      controllers[currentSlide].classList.remove("slider__controller--active");
      setCounter(1);
    }
  }

  function PrevSlideHandler() {
    findCurrentSlide();
    findCurrentController();
    if (currentSlide === 0) {
      slides[slides.length - 1].classList.add("slider__slide--showing");
      slides[currentSlide].classList.remove("slider__slide--showing");
      controllers[slides.length - 1].classList.add("slider__controller--active");
      controllers[currentSlide].classList.remove("slider__controller--active");
      setCounter(slides.length);
    } else {
      slides[currentSlide - 1].classList.add("slider__slide--showing");
      slides[currentSlide].classList.remove("slider__slide--showing");
      controllers[currentSlide - 1].classList.add("slider__controller--active");
      controllers[currentSlide].classList.remove("slider__controller--active");
      setCounter(currentSlide);
    }
  }

  function controllerSlideHandler(event) {
    if (event.target.classList.contains("slider__controller")) {
      for (var n = 0; n < controllers.length; n++) {
        if (controllers[n].classList.contains("slider__controller--active")) {
          controllers[n].classList.remove("slider__controller--active");
        }
      }
      event.target.classList.add("slider__controller--active");
      findCurrentController();
      for (var j = 0; j < slides.length; j++) {
        if (slides[j].classList.contains("slider__slide--showing")) {
          slides[j].classList.remove("slider__slide--showing");
        }
      }
      slides[currentController].classList.add("slider__slide--showing");
      setCounter(currentController + 1);
    }
  }

  if (btnNext) {
    btnNext.addEventListener("click", NextSlideHandler);
  }
  if (btnPrev) {
    btnPrev.addEventListener("click", PrevSlideHandler);
  }

  control.addEventListener("click", controllerSlideHandler);
  slider.addEventListener("touchmove", NextSlideHandler);
}


var sliderElements = document.querySelectorAll('.slider');
for (var i = 0; i < sliderElements.length; i++) {
  if (i === 0 || i === 2 || i === 3) {
    initSlider(sliderElements[i], true);
  } else {
    initSlider(sliderElements[i], false);
  }
}

// Tablet
// Order__size
var noneSlider = document.querySelector(".order__list--size");
var noneSlides = noneSlider.querySelectorAll(".order__item--size");

if (window.innerWidth >= 768) {
  noneSlider.classList.remove("slider");
  for (i = 0; i < noneSlides.length; i++) {
    noneSlides[i].classList.remove("slider__slide");
  }
}


//Order__decoration
var doubleSlider = document.querySelector(".order__list--decoration");
var doubleSlides = doubleSlider.querySelectorAll(".order__item--decoration");
var currentDoubleSlide;
var btnNextDoubleSlide = doubleSlider.querySelector(".slider__btn--next");
var doubleCounter = doubleSlider.querySelector(".slider__counter");

function findCurrentDoubleSlide() {
  for (var n = 0; n < doubleSlides.length; n++) {
    if (doubleSlides[n].classList.contains("slider__slide--showing")) {
      currentDoubleSlide = n;
    }
  }
}

function setDoubleCounter(index) {
  doubleCounter.innerHTML = (index) + '/' + (doubleSlides.length / 2);
}

if (window.innerWidth >= 768) {
  findCurrentDoubleSlide();
  setDoubleCounter(currentDoubleSlide + 1);
  doubleSlides[currentDoubleSlide + 1].classList.add("slider__slide--showing");

  function NextDoubleSlideHandler() {
    findCurrentDoubleSlide();
    if (currentDoubleSlide < (doubleSlides.length - 1)) {
      doubleSlides[currentDoubleSlide].classList.add("slider__slide--showing");
      doubleSlides[currentDoubleSlide + 1].classList.add("slider__slide--showing");
      doubleSlides[currentDoubleSlide-1].classList.remove("slider__slide--showing");
      doubleSlides[currentDoubleSlide-2].classList.remove("slider__slide--showing");
      setDoubleCounter(currentDoubleSlide);
    } else {
      doubleSlides[0].classList.add("slider__slide--showing");
      doubleSlides[1].classList.add("slider__slide--showing");
      doubleSlides[currentDoubleSlide].classList.remove("slider__slide--showing");
      doubleSlides[currentDoubleSlide-1].classList.remove("slider__slide--showing");
      setDoubleCounter(1);
    }
  }

  btnNextDoubleSlide.addEventListener("click", NextDoubleSlideHandler);
}
