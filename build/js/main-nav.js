var mainNav = document.querySelector(".main-nav");
var toggleNav = document.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

toggleNav.addEventListener("click", function() {
  if (mainNav.classList.contains("main-nav--close")) {
    mainNav.classList.remove("main-nav--close");
    mainNav.classList.add("main-nav--opened");
  } else {
    mainNav.classList.add("main-nav--close");
    mainNav.classList.remove("main-nav--opened");
  }
});
