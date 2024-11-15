function toggleFavorite(element) {
  element.classList.toggle("favorite-active");
}

function duplicateBlock(selector, count) {
  const container = document.getElementById("catalog__item");
  const originalBlock = document.querySelector(selector);

  for (let i = 0; i < count; i++) {
    const clonedBlock = originalBlock.cloneNode(true);
    container.appendChild(clonedBlock);
  }
}

duplicateBlock(".catalog__item", 14);
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
