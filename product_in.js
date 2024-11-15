function loadUserData() {
  console.log("Начинаем загрузку данных...");

  fetch("http://localhost:3000/item/123")
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка загрузки данных");
      return response.json();
    })
    .then((data) => {
      const content = data.content;
      if (!content) {
        console.error("Ошибка: данные content отсутствуют.");
        return;
      }
      const productContent = document.querySelector(".product__content");

      productContent.querySelector(".product__title").textContent =
        content.name;
      productContent.querySelector(".product__title_descr").textContent =
        content.info;
      productContent.querySelector(".product__details_descr").textContent =
        content.details;
      productContent.querySelector(
        ".product__price"
      ).textContent = `$${content.price.value}`;
    })
    .catch((error) => console.error("Ошибка:", error));
}

function loadPicture(pictureId) {
  fetch(`http://localhost:3000/picture/full/:pictureid`)
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка загрузки картинки");
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      const imageElement = document.querySelector(".product__preview img");
      if (imageElement) {
        imageElement.src = imageUrl;
        imageElement.alt = "Загруженное изображение";
      } else {
        console.error("Элемент img не найден ");
      }
    })
    .catch((error) => console.error("Ошибка:", error));
}

loadUserData();
loadPicture();
