// В файле card.js описаны функции для работы с карточками
import { cardTemplate } from "../index.js";

// Функция создания карточки
export function creatCard(cardData, handlerDeleteCard, handlerLikeCard, openModalFunc, userID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  // Добавляем события для кнопки лайка, кнопки удаления и на изображение карточки
  buttonLike.addEventListener("click", () =>
    handlerLikeCard(buttonLike, cardID, cardLikeCount, checkStatusLike(buttonLike)));
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
    buttonDelete.addEventListener("click", () => handlerDeleteCard(cardElement, cardID, deleteCard));
  } else {
    buttonDelete.style.display = "none";
  }

  return cardElement;
}

// Функция удаления карточки
function deleteCard(elem) {
  elem.remove()
}

// Функция проверки лайков (активен лайк или нет)
function checkStatusLike(buttonLike) {
  let likeStatus = false;
  if(buttonLike.classList.contains('card__like-button_is-active')) {
    likeStatus = true;
  }
  return likeStatus;
}

// Фунция изменения кол-во лайков
export function changeLike(response, buttonLike, cardLikeCount) {
    cardLikeCount.textContent = response.likes.length;
    buttonLike.classList.toggle('card__like-button_is-active');
  }
