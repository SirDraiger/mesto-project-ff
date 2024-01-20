// В файле modal.js описаны функции для работы с модальными окнами
// Фунция открытия модального окна
export function openModal(domElement) {
  domElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleFormEsc);
}

// Функция закрытия модального окна
export function closeModal(domElement) {
  domElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleFormEsc);
}

// Функция закрытия модального окна при клике на оверлей
export function handleFormOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Функция закрытия модального окна при нажатии на клавишу esc
function handleFormEsc(evt) {
  if (evt.key === "Escape") {
    // находим открытий popup по классу
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}
