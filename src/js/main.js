// Всплывающее меню в навигации
const navItem = document.querySelectorAll(".nav-item");
const accordionList = document.querySelector(".nav-accordion-list");

navItem.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    if (this.querySelector(".nav-accordion-list")) {
      this.querySelector(".nav-accordion-list").style.display = "block";
    }
  });

  item.addEventListener("mouseleave", function () {
    if (this.querySelector(".nav-accordion-list")) {
      this.querySelector(".nav-accordion-list").style.display = "none";
    }
  });
});

// Слайдер свайпер
const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 7000,
  // },
});
