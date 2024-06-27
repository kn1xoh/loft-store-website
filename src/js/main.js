// Всплывающее меню в навигации
const accordionBtn = document.querySelector(".nav-accordion-btn");
const accordionList = document.querySelector(".nav-accordion-list");

accordionBtn.addEventListener("mouseenter", function () {
  accordionList.style.display = "block";
});

accordionBtn.addEventListener("mouseleave", function () {
  accordionList.style.display = "none";
});
