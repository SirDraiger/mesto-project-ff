// Импорты
import "../pages/index.css";
import {
  openModal,
  closeModal,
  handleFormOverlay,
} from "./components/modal.js";
import { creatCard, changeLike } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getProfileData,
  sendProfileData,
  sendProfileAvatar,
  sendNewCard,
  sendLike,
  sendDeleteLike,
  sendDeleteCard
} from "./components/api.js";

// Конфигурация для валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Переменная для хранения ID пользователя
let userID;

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const cardsContainer = document.querySelector(".places__list");
// Элементы формы добавления аватарки
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");
const newAvatarForm = newAvatarPopup.querySelector(".popup__form");
const newAvatarCloseButton = newAvatarPopup.querySelector(".popup__close");
const avatarLinkInput = newAvatarPopup.querySelector(".popup__input_type_url");
// Элементы формы редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const profileCloseButton = profilePopup.querySelector(".popup__close");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
// Элементы профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
// Элементы формы добавления карточки
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const titleImput = newCardPopup.querySelector(".popup__input_type_card-name");
const urlImput = newCardPopup.querySelector(".popup__input_type_url");
// Элементы формы просмотра картинки
const zoomModal = document.querySelector(".popup_type_image");
const zoomModalImage = zoomModal.querySelector(".popup__image");
const zoomModalDescription = zoomModal.querySelector(".popup__caption");
const zoomModalCloseButton = zoomModal.querySelector(".popup__close");

// Получаем данные по профилю и карточкам.
Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, initialCards]) => {
    // Заполняем данные профиля
    fillProfileData(profileData);

    // Выводим карточки на страницу
    initialCards.forEach((arr) => {
      const newCard = creatCard(
        arr,
        handlerDeleteCard,
        handlerLikeCard,
        handleViewCardImage,
        userID
      );
      // Вставляем карточку
      cardsContainer.append(newCard);
    });
  })
  .catch(() =>
    console.log("Произошла ошибка при загрузке данных профиля и карточки")
  );

// Функция заполнения профиля
function fillProfileData(profileData) {
  profileName.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  fillProfileAvatar(profileData);
  userID = profileData._id;
}

// Функция обновления аватара
function fillProfileAvatar(profileData) {
  profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
}

// ДОБАВЛЕНИЕ АВАТАРА
// Событие для открытия формы редактирования аватара
avatarEditButton.addEventListener("click", () => {
  newAvatarForm.reset();
  clearValidation(newAvatarForm, validationConfig);
  openModal(newAvatarPopup);
});

// Событие для закрытия формы редактирования аватара
newAvatarCloseButton.addEventListener("click", () => {
  closeModal(newAvatarPopup);
});

// Событие для закрытия формы редактирования аватара по клику на оверлей
newAvatarPopup.addEventListener("click", (evt) => {
  handleFormOverlay(evt);
});

// Событие на нажатие кнопки Сохранить в форме добавления карточки
newAvatarPopup.addEventListener("submit", (evt) => handleUploadAvatar(evt));

// Функция обработчик отправки нового аватара
function handleUploadAvatar(evt) {
  evt.preventDefault();
  isLoading(newAvatarPopup, "Сохранение...");

  const avatarLink = avatarLinkInput.value;

  // Функция отправки аватара
  sendProfileAvatar(avatarLink)
    .then((response) => {
      fillProfileAvatar(response);
      closeModal(newAvatarPopup);
    })
    .catch((error) =>
      console.log(`При отправке нового аватара произошла ошибка: "${error}"`)
    )
    .finally(() => isLoading(newAvatarPopup, "Сохранить"));
}

// РЕДАКТИРОВАНИЕ ДАННЫХ ПРОФИЛЯ
// Событие для открытия формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  // Заполняем поля ввода на основании имени и описания профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profilePopup);
});

// Событие для закрытия формы редактирования профиля
profileCloseButton.addEventListener("click", () => {
  closeModal(profilePopup);
});

// Событие для закрытия формы редактирования по клику на оверлей
profilePopup.addEventListener("click", (evt) => {
  handleFormOverlay(evt);
});

// Событие на нажатие кнопки Сохранить в форме редактирования профиля
profilePopup.addEventListener("submit", handleProfileFormSubmit);

// Функция обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  isLoading(profilePopup, "Сохранение...");

  // Отправляем данные из формы на сервер
  sendProfileData(nameInput.value, jobInput.value)
    .then((response) => {
      profileName.textContent = response.name;
      profileDescription.textContent = response.about;
      closeModal(profilePopup);
    })
    .catch((error) =>
      console.log(`При отправке данных профиля произошла ошибка: "${error}"`)
    )
    .finally(() => isLoading(profilePopup, "Сохранить"));
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
// Событие для открытия формы добавления карточки
newCardButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

// Событие для закрытия формы добавления карточки
newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

// Событие для закрытия формы добавления карточки по клику на оверлей
newCardPopup.addEventListener("click", (evt) => {
  handleFormOverlay(evt);
});

// Событие на нажатие кнопки Сохранить в форме добавления карточки
newCardPopup.addEventListener("submit", handleAddCard);

// Функция обработчик отправки формы добавления новой карточки
function handleAddCard(evt) {
  evt.preventDefault();
  isLoading(newCardPopup, "Сохранение...");

  const cardData = {
    name: titleImput.value,
    link: urlImput.value,
  };

  // Отправляем данные карточки на сервер
  sendNewCard(cardData.name, cardData.link)
    .then((response) => {
      const newCard = creatCard(
        response,
        handlerDeleteCard,
        handlerLikeCard,
        handleViewCardImage,
        userID
      );
      cardsContainer.prepend(newCard);
      closeModal(newCardPopup);
    })
    .catch((error) =>
      console.log(
        `При отправке данных новой карточки произошла ошибка: "${error}"`
      )
    )
    .finally(() => isLoading(newCardPopup, "Сохранить"));
}


// ПРОСМОТР КАРТОЧКИ
// Функция обработчик открытия карточки с изображением
function handleViewCardImage(cardData) {
  // const zoomModalImage = zoomModal.querySelector(".popup__image");
  // const zoomModalDescription = zoomModal.querySelector(".popup__caption");
  zoomModalImage.src = cardData.link;
  zoomModalImage.alt = `Фотография: ${cardData.name}`;
  zoomModalDescription.textContent = cardData.name;
  openModal(zoomModal);
}

// Событие на закрытие попапа просмотра картинки в карточке
zoomModalCloseButton.addEventListener("click", () => {
  closeModal(zoomModal);
});

// Событие для закрытия формы добавления карточки по клику на оверлей
zoomModal.addEventListener("click", (evt) => {
  handleFormOverlay(evt);
});

// Фунция для изменения текста в кнопке при начале и завершении загрузки
function isLoading(popupElem, message) {
  const buttomSubmit = popupElem.querySelector(".button");
  buttomSubmit.textContent = message;
}


// УДАЛЕНИЕ КАРТОЧКИ
function handlerDeleteCard(card, cardID, deleteCard) {
  sendDeleteCard(cardID)
    .then(() => deleteCard(card))
    .catch((error) => console.log(
      `При попытке удалить карточку произошла ошибка: "${error}"`
    ));
}


// ЛАЙК КАРТОЧКИ
// Функция обработчик лайков
function handlerLikeCard(buttonLike, cardID, cardLikeCount, likeStatus) {
  // Проверяем состояние кнопки лайка
  if (!likeStatus) {
    sendLike(cardID)
      .then((response) => {
        changeLike(response, buttonLike, cardLikeCount);
      })
      .catch((error) => console.log(error));
  } else {
    sendDeleteLike(cardID)
      .then((response) => {
        changeLike(response, buttonLike, cardLikeCount);
      })
      .catch((error) => console.log(error));
  }
}

// Функция для активации валидации
enableValidation(validationConfig);
