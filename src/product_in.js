import { renderProductDetails } from "./render.js";

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
