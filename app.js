function loadUserData() {
  fetch("http://localhost:3000/item/:itemid")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      return response.json();
    })
    .then((data) => {
      const content = data.content;
      const catalogItems = document.querySelectorAll(".catalog__item");

      catalogItems.forEach((item) => {
        const titleElement = item.querySelector(".item__title");
        const priceElement = item.querySelector(".item__price");

        titleElement.textContent = content.name;
        priceElement.textContent = `$${content.price.value} ${content.price.currency}`;
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}

function loadPicture(pictureId) {
  fetch(`http://localhost:3000/picture/min/${pictureId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Ошибка загрузки картинки");
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      const imageElements = document.querySelectorAll(".item__min");

      imageElements.forEach((imageElement) => {
        imageElement.src = imageUrl;
        imageElement.alt = "Загруженное изображение";
      });
    })
    .catch((error) => console.error("Ошибка:", error));
}

loadUserData();

loadPicture();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".item__image").forEach(function (item) {
    item.addEventListener("click", function () {
      window.location.href = "product_in.html";
    });
  });
});
