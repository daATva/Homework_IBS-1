import { renderProductDetails } from "./render.js";
import favoriteImage from "./img/favorite.svg";
import cartImage from "./img/cart.svg";
import userImage from "./img/user.svg";
import productImage from "./img/product.png";

// Использование:
document.querySelector(".item__favorite").src = favoriteImage;
document.querySelector(".header_cart").src = cartImage;
document.querySelector(".header_userpage").src = userImage;

document.addEventListener("DOMContentLoaded", function () {
  // Получаем данные из localStorage
  const productData = localStorage.getItem("selectedProduct");

  if (productData) {
    const product = JSON.parse(productData); // Преобразуем строку в объект
    renderProductDetails(product); // Отрисовываем детали товара
  } else {
    console.error("Данные товара не найдены в localStorage.");
  }
});
