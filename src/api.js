// api.js
export const BASE_URL = "http://localhost:3000";

export function fetchItems() {
  const apiUrl = `${BASE_URL}/item/:itemid`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки товаров");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
