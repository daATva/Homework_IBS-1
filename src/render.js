import { BASE_URL } from "./api.js";

export function renderItems(items) {
  if (!Array.isArray(items)) {
    console.error("Ожидался массив товаров, но получено:", items);
    return;
  }

  const catalogContainer = document.getElementById("catalog__item");
  catalogContainer.innerHTML = "";

  items.forEach((item) => {
    const catalogItem = document.createElement("div");
    catalogItem.classList.add("catalog__item");
    catalogItem.setAttribute("data-id", item.id);

    // Устанавливаем класс favorite-active, если item.like ===
    const isFavorite = item.like === true ? "favorite-active" : "";

    catalogItem.innerHTML = `
        <div class="item__group">
          <div class="item__favorite ${isFavorite}" onclick="toggleFavorite(this)">
             <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                  class="heart-outline"
                >
                  <path
                    d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z"
                    fill="#959595"
                  />
                </svg>
          </div>
          <div class="item__image">
            <img class="item__min" src="${BASE_URL}${
      item.picture?.path || "/img/default.png"
    }" alt="${item.picture?.alt || "Изображение"}" />
          </div>
          <div class="item__title">${item.name || "Без названия"}</div>
          <div class="item__price">$${item.price?.value || "0"} ${
      item.price?.currency || "USD"
    }</div>
        </div>
      `;

    // Обработчик клика на элементе item__favorite
    const favoriteIcon = catalogItem.querySelector(".item__favorite");
    favoriteIcon.addEventListener("click", function () {
      this.classList.toggle("favorite-active");
    });

    // Обработчик клика на элементе item__min
    const itemMin = catalogItem.querySelector(".item__min");
    itemMin.addEventListener("click", function (event) {
      event.stopPropagation(); // Останавливаем всплытие событий
      const productData = {
        id: item.id,
        name: item.name,
        price: item.price?.value || "0",
        currency: item.price?.currency || "USD",
        image: item.picture?.path || "/img/default.png",
        description: item.description || "Описание отсутствует",
        details: item.details || "Детали отсутствуют",
      };

      localStorage.setItem("selectedProduct", JSON.stringify(productData));
      window.location.href = `product_in.html`;
    });

    catalogContainer.appendChild(catalogItem);
  });
}

// Функция для фильтрации и отрисовки товаров
export function filterAndRenderItems(items, query) {
  if (!Array.isArray(items)) {
    console.error("Ожидался массив товаров, но получено:", items);
    return;
  }

  // Фильтрация товаров
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // Отрисовка отфильтрованных товаров
  renderItems(filteredItems);
}

// Функция для отрисовки деталей одного товара
export function renderProductDetails(product) {
  if (!product) {
    console.error("Ошибка: передан пустой объект товара.");
    return;
  }
  const productContent = document.querySelector(".product__content");
  productContent.innerHTML = "";

  const productItem = document.createElement("div");
  productItem.classList.add("product__item");

  productItem.innerHTML = `
    <div class="product__details">
      <div class="product__group">
        <div class="product__preview">
        <img src="../img/product.png" alt="Product" />
        </div>
        <h2 class="product__title">${product.name || "Без названия"}</h2>
        <p class="product__title_descr">${
          product.description || "Описание недоступно"
        }</p>
        <p class="product__details_descr">${
          product.details || "Детали отсутствуют"
        }</p>
      </div>
          <div class="product__buy">
          <p class="product__price">$${product.price || "0"}</p>
            <div class="product__btns cart__group">
              <button type="button" class="decrement">-</button>
              <input type="number" value="1" min="1" id="quantity-input" />
              <button type="button" class="increment">+</button>
            </div>
            <button class="product__cart cart__group">Add to cart</button>
            <img
              class="item__favorite"
              src="../img/favorite.svg"
              alt="favorite_heart"
            />
          </div>
    </div>
  `;

  productContent.appendChild(productItem);
}
