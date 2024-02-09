// В файле card.js описаны функции для работы с карточками
import { cardTemplate } from "../index.js";
import { sendDeleteCard, sendLike, sendDeleteLike } from "./api.js";

// Функция создания карточки
export function creatCard(cardData, delFunc, likeFunc, openModalFunc, userID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardLikeCount = cardElement.querySelector(".card__like-count");

  // Добавляем события для кнопки лайка, кнопки удаления и на изображение карточки
  buttonLike.addEventListener("click", () =>
    likeFunc(buttonLike, cardID, cardLikeCount)
  );
  cardImage.addEventListener("click", () => openModalFunc(cardData));

  // Заполняем ссылку на картику, альтернативный текст картинки и текст заголовка карточки
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Заполняем Data- атрибуты карточки
  const cardID = cardData._id;
  cardElement.dataset.cardId = cardID;

  // Выводим кол-во лайков
  if (cardData.likes.length !== 0) {
    cardLikeCount.textContent = cardData.likes.length;

    // Проверяем, есть ли лайк от текущего пользователя
    const isLiked = cardData.likes.some((element) => {
      return element._id === userID;
    });

    // Если лайк есть, делаем кнопку лайка активной
    if (isLiked) {
      buttonLike.classList.toggle("card__like-button_is-active");
    }
  } else {
    cardLikeCount.textContent = 0;
  }

  // Условие отображение кнопки удаления
  const cardOwnerID = cardData.owner["_id"];

  if (cardOwnerID === userID) {
    buttonDelete.addEventListener("click", () => delFunc(cardElement, cardID));
  } else {
    buttonDelete.style.display = "none";
  }

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(elem, cardID) {
  sendDeleteCard(cardID)
    .then(() => elem.remove())
    .catch((error) => console.log(error));
}

// Функция лайка на карточке
export function likeCard(elem, cardID, likeElement) {
  // Проверяем состояние кнопки лайка
  if (elem.classList.contains("card__like-button_is-active")) {
    sendDeleteLike(cardID)
      .then((response) => {
        elem.classList.remove("card__like-button_is-active");
        likeElement.textContent = response.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    sendLike(cardID)
      .then((response) => {
        elem.classList.add("card__like-button_is-active");
        likeElement.textContent = response.likes.length;
      })
      .catch((error) => console.log(error));
  }
}
