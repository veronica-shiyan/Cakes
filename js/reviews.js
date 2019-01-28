var dots = document.querySelector(".reviews__dots");
var detail = document.querySelector(".reviews__details");
var text = document.querySelector(".reviews__text p");

var putDown = function () {
  dots.style.top = "210px";
};
detail.addEventListener("click", putDown);

var closeDetail = function () {
  detail.removeAttribute('open');
  dots.style.top = "181px";
};
text.addEventListener("click", closeDetail);
