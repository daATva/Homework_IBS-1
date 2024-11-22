import { fetchItems } from "./api.js";
import { renderItems, filterAndRenderItems } from "./render.js";
import { debounce } from "./debounce.js";

let catalogData = [];

// Функция фильтрации
function handleSearchInput(event) {
  const query = event.target.value;
  filterAndRenderItems(catalogData, query);
}

// Дебаунс для фильтрации
const debouncedSearch = debounce(handleSearchInput, 300);

document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("headerInput");

  fetchItems()
    .then((data) => {
      console.log("Ответ API:", data);
      if (Array.isArray(data.content)) {
        catalogData = data.content;
        renderItems(catalogData);
      } else {
        console.error("Ожидался массив товаров, но получен:", data.content);
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });

  if (inputElement) {
    inputElement.addEventListener("input", debouncedSearch);
  }
});

function toggleFavorite(element) {
  element.classList.toggle("favorite-active");
}
