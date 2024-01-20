// В файле card.js описаны функции для работы с карточками
import { cardTemplate } from "../index.js";

// Функция создания карточки
export function creatCard(cardData, delFunc, likeFunc, openModalFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  // Добавляем события для кнопки лайка, кнопки удаления и на изображение карточки
  buttonDelete.addEventListener("click", () => delFunc(cardElement));
  buttonLike.addEventListener("click", () => likeFunc(buttonLike));
  cardImage.addEventListener("click", () => openModalFunc(cardData));

  // Заполняем ссылку на картику, альтернативный текст картинки и текст заголовка карточки
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(elem) {
  elem.remove();
}

// Функция лайка на карточке
export function likeCard(elem) {
  elem.classList.toggle("card__like-button_is-active");
}
