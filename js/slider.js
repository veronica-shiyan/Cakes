function initSlider(domElement, hasCounter, double) {
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
      if (double) {
        counter.textContent = (index) + '/' + (slides.length / 2);
      }
      else {
        counter.textContent = (index) + '/' + (slides.length);
      }
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

  if (double) {
    findCurrentSlide();
    slides[currentSlide + 1].classList.add("slider__slide--showing");
  }

  function NextSlideHandler() {
    findCurrentSlide();
    findCurrentController();

    if (double) {
     if (currentSlide < (slides.length - 1)) {
        slides[currentSlide +1].classList.add("slider__slide--showing");
        slides[currentSlide + 2].classList.add("slider__slide--showing");
        slides[currentSlide].classList.remove("slider__slide--showing");
        slides[currentSlide - 1].classList.remove("slider__slide--showing");
        setCounter(slides.length);
      }
      else if (currentSlide === (slides.length - 1)) {
        slides[0].classList.add("slider__slide--showing");
        slides[1].classList.add("slider__slide--showing");
        slides[currentSlide].classList.remove("slider__slide--showing");
        slides[currentSlide - 1].classList.remove("slider__slide--showing");
        setCounter(1);
      }
    }
    else {
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
  }

  function PrevSlideHandler() {
    findCurrentSlide();
    findCurrentController();

    if (double) {
      if (currentSlide === 1) {
        slides[slides.length - 1].classList.add("slider__slide--showing");
        slides[slides.length - 2].classList.add("slider__slide--showing");
        slides[currentSlide].classList.remove("slider__slide--showing");
        slides[currentSlide - 1].classList.remove("slider__slide--showing");
        setCounter(slides.length);
      }
      else {
        slides[currentSlide - 2].classList.add("slider__slide--showing");
        slides[currentSlide - 3].classList.add("slider__slide--showing");
        slides[currentSlide].classList.remove("slider__slide--showing");
        slides[currentSlide - 1].classList.remove("slider__slide--showing");
        setCounter(slides.length);
      }
    }
    else {
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
var controlElement = document.querySelector(".page-header");

// Init slider
// Init first slider
initSlider(sliderElements[0], true, false);

//Init second slider
var offSlider = function () {
  var noneSlider = document.querySelectorAll(".order__item--size");
  if (controlElement.clientWidth >= 768) {
    sliderElements[1].classList.remove("slider");
    for (var i = 0; i < noneSlider.length; i++) {
      noneSlider[i].classList.remove("slider__slide");
    }
  }
  else {
    sliderElements[1].classList.add("slider");
    for (i = 0; i < noneSlider.length; i++) {
      noneSlider[i].classList.add("slider__slide");
    }
  }
};
window.addEventListener("resize", offSlider);

if (controlElement.clientWidth < 768) {
  initSlider(sliderElements[1], false);
}
else {
  offSlider();
}

// Init 3-th double slider
if (controlElement.clientWidth < 768) {
  initSlider(sliderElements[2], true, false);
}
else {
  initSlider(sliderElements[2], true, true);
}

var toggleDoubleSlider = function () {
  var slides = sliderElements[2].querySelectorAll(".slider__slide--showing");
  if (controlElement.clientWidth >= 768) {
    if (slides.length === 1) {
      initSlider(sliderElements[2], true, true);
    }
  }
  else {
    if (slides.length > 1) {
      for (var i = 1; i < slides.length; i++) {
        slides[i].classList.remove("slider__slide--showing");
      }
    }
  }
};
window.addEventListener("resize", toggleDoubleSlider);

// Init 4-th slider
initSlider(sliderElements[3], true, false);
