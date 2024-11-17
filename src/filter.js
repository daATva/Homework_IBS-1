const inputElement = document.getElementById("headerInput");

if (inputElement) {
  inputElement.addEventListener("input", function () {
    const inputValue = this.value;
    debouncedSearch(inputValue);
  });
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function filterCatalog(query) {
  const catalogItems = document.querySelectorAll(".catalog__item");

  catalogItems.forEach((item) => {
    const titleElement = item
      .querySelector(".item__title")
      .textContent.toLowerCase();
    const isVisible = titleElement.includes(query.toLowerCase());

    item.style.display = isVisible ? "block" : "none";
  });
}

const debouncedFilterCatalog = debounce(filterCatalog, 300);

if (inputElement) {
  inputElement.addEventListener("input", function () {
    const query = this.value;
    debouncedFilterCatalog(query);
  });
}
