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

// Слайдер Swiper
const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // autoplay: {
  //   delay: 7000,
  // },
});

// Бургер меню
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".burger-menu");
const closeMenu = document.querySelector(".close-burger-menu");

burger.addEventListener("click", function () {
  burgerMenu.classList.add("burger-menu--active");
});

closeMenu.addEventListener("click", function () {
  burgerMenu.classList.remove("burger-menu--active");
});

// Убирает бургер меню при клике на пустое место
document.addEventListener("click", function (e) {
  if (
    e.target.closest(".burger-menu") === null &&
    e.target.closest(".burger") === null &&
    burgerMenu.classList.contains("burger-menu--active")
  ) {
    burgerMenu.classList.remove("burger-menu--active");
  }
});

// Генерация каточек продукта
function renderCard(sale, imgNum, title, category, price, salePrice, width, depth, height) {
  const cardsWrapper = document.querySelector(".product-cards-wrapper");
  let saleElem = `<div class="product-sale flex gap-[5px] absolute top-0 left-0 md:top-[20px] md:left-[15px] xl:left-[20px]">
                        <img class="w-[14px] md:w-[17px]" src="icons/red-sale.svg" alt="скидка">
                        <div class="text-[10px] md:text-[12px]">-${sale}%</div>
                    </div>`;
  let salePriceElem = `<div class="product-sale-price font-medium text-[10px] text-gray-300 line-through md:text-[12px]">${salePrice}₽</div>`;

  // Убирает скидку в где она отсутствует
  if (sale === 0) {
    saleElem = "";
    salePriceElem = "";
  }

  const card = `<div class="product-card relative block w-[138px] md:w-[220px] md:px-[15px] md:pb-[20px] xl:w-[263px] xl:p-[20px] xl:hover:shadow-lg">
                    <a class="absolute inset-0" href="#" aria-label="открыть карточку товара"></a>
                    ${saleElem}
                    <button class="absolute top-0 right-0 md:top-[20px] md:right-[6px] xl:right-[20px]" type="button">
                        <svg class="main-icon w-[14px] md:w-[18px]" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="change" d="M2.467 9.55034L10.9167 18L19.3663 9.55034C20.3056 8.61103 20.8333 7.33706 20.8333 6.00867C20.8333 3.24246 18.5909 1 15.8247 1C14.4963 1 13.2223 1.5277 12.283 2.46701L10.9167 3.83333L9.55034 2.46701C8.61103 1.5277 7.33706 1 6.00867 1C3.24246 1 1 3.24246 1 6.00867C1 7.33706 1.5277 8.61103 2.467 9.55034Z" fill="white" />
                            <path d="M2.467 9.55034L10.9167 18L19.3663 9.55034C20.3056 8.61103 20.8333 7.33706 20.8333 6.00867C20.8333 3.24246 18.5909 1 15.8247 1C14.4963 1 13.2223 1.5277 12.283 2.46701L10.9167 3.83333L9.55034 2.46701C8.61103 1.5277 7.33706 1 6.00867 1C3.24246 1 1 3.24246 1 6.00867C1 7.33706 1.5277 8.61103 2.467 9.55034Z" stroke="black" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <img class="w-[94px] m-auto pt-[25px] mb-[25px] md:w-[160px] md:pt-[67px] md:mb-[30px] xl:pt-[54px] xl:mb-[54px]" src="img/product-${imgNum}.png" alt="" aria-hidden="true">
                    <h4 class="font-medium text-[13px] md:text-[14px] md:mb-[3px] lg:text-[16px]">${title}</h4>
                    <div class="text-[10px] md:text-[11px] md:mb-[4px]">${category}</div>
                    <div class="flex items-center gap-[5px] md:gap-[8px]">
                        <div class="font-medium text-[13px] md:text-[14px] lg:text-[14px]">${price}₽</div>
                        ${salePriceElem}
                    </div>
                    <div class="poduct-hover absolute left-0 hidden w-full bg-white p-[20px] pt-[15px] z-10 shadow-lg">
                        <div class="text-[12px] mb-[8px]">Размеры</div>
                        <ul class="flex gap-[37px] text-[9px] mb-[17px]">
                            <li class="relative after:content-['x'] after:absolute after:top-[7px] after:right-[-20px]">
                                <div class="text-gray-400">ШИРИНА</div>
                                <div>${width} СМ</div>
                            </li>
                            <li class="relative after:content-['x'] after:absolute after:top-[7px] after:right-[-20px]">
                                <div class="text-gray-400">ГЛУБИНА</div>
                                <div>${depth} СМ</div>
                            </li>
                            <li>
                                <div class="text-gray-400">ВЫСОТА</div>
                                <div>${height} СМ</div>
                            </li>
                        </ul>
                        <button class="flex justify-center items-center w-[223px] h-[40px] bg-slate-600" type="button"><span class="text-[17px] text-white">Добавить в корзину</span></button>
                    </div>
                </div>`;

  cardsWrapper.insertAdjacentHTML("beforeend", card);
}

renderCard(0, 1, "Валенсия Beige", "Барные стулья", "2 300", 0, 43, 43, 77);
renderCard(0, 2, "Толикс-2 White Gloss", "Барные стулья", "4 690", 0, 40, 40, 69);
renderCard(25, 3, "Динс Velvet Yellow", "Диваны", "28 490", "37 990", 300, 110, 100);
renderCard(0, 4, "Кускен Navy Blue", "Диваны", "2 300", 0, 250, 90, 100);
renderCard(0, 5, "Шерона Barhat Grey", "Двухспальные кровати", "21 990", 0, 300, 250, 80);
renderCard(0, 6, "Авиньон-1", "Буфеты", "18 990", 0, 90, 80, 200);
renderCard(0, 7, "Стелла Дуб Сонома", "Комоды", "8 990", 0, 100, 50, 95);
renderCard(0, 8, "Равенна-1 Light", "Комоды", "14 990", 0, 95, 45, 90);
renderCard(0, 9, "Бенфлит Grey", "Журнальные столы", "7 290", 0, 50, 55, 45);
renderCard(0, 10, "Тиффани Вудлайн Крем", "Письменные столы", "10 990", 0, 150, 90, 105);
renderCard(0, 11, "Валенсия Beige", "Шкафы", "19 990", 0, 270, 200, 80);
renderCard(0, 12, "Лайт-3-170-240 Белый", "Шкафы", "27 290", 0, 270, 200, 75);
renderCard(0, 13, "Вилли Pink", "Диваны", "21 990", 0, 80, 70, 65);
renderCard(0, 14, "Сан-Паулу Velvet Brown", "Диваны", "25 990", 0, 150, 100, 140);
renderCard(0, 15, "Валенсия Beige", "Стойки", "10 990", 0, 150, 70, 100);
renderCard(0, 16, "Валенсия Beige", "Стойки", "19 990", 0, 190, 80, 200);

// Ховер для карточки продукта
const productCard = document.querySelectorAll(".product-card");

if (window.innerWidth > 1280) {
  productCard.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelector(".poduct-hover").style.display = "block";
    });

    card.addEventListener("mouseleave", function () {
      this.querySelector(".poduct-hover").style.display = "none";
    });
  });
}
