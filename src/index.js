// В файле index.js описана инициализация приложения и основная логика страницы
import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import {
  openModal,
  closeModal,
  handleFormOverlay,
} from "./components/modal.js";
import { creatCard, deleteCard, likeCard } from "./components/card.js";

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Элементы формы редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileCloseButton = profilePopup.querySelector(".popup__close");
const nameInput = profilePopup.querySelector(".popup__input_type_name");
const jobInput = profilePopup.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Элементы формы добавления карточки
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const titleImput = newCardPopup.querySelector(".popup__input_type_card-name");
const urlImput = newCardPopup.querySelector(".popup__input_type_url");

// Элементы формы просмотра картинки
const zoomModal = document.querySelector(".popup_type_image");
const zoomModalCloseButton = zoomModal.querySelector(".popup__close");

// Вывод карточек на страницу
initialCards.forEach((arr) => {
  const newCard = creatCard(arr, deleteCard, likeCard, handleViewCardImage);
  cardsContainer.append(newCard);
});

// Функция обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.currentTarget);
}

// Функция обработчик отправки формы добавления новой карточки
function handleAddCard(evt) {
  evt.preventDefault();

  const cardData = {
    name: titleImput.value,
    link: urlImput.value,
  };

  const newCard = creatCard(
    cardData,
    deleteCard,
    likeCard,
    handleViewCardImage
  );
  cardsContainer.prepend(newCard);
  closeModal(evt.currentTarget);
}

// Функция обработчик открытия карточки с изображением
function handleViewCardImage(cardData) {
  const zoomModalImage = zoomModal.querySelector(".popup__image");
  const zoomModalDescription = zoomModal.querySelector(".popup__caption");
  zoomModalImage.src = cardData.link;
  zoomModalImage.alt = `Фотография: ${cardData.name}`;
  zoomModalDescription.textContent = cardData.name;
  openModal(zoomModal);
}

// Событие для открытия формы редактирования профиля
profileEditButton.addEventListener("click", () => {
  // Заполняем поля ввода на основании имени и описания профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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

// Событие для открытия формы добавления карточки
newCardButton.addEventListener("click", () => {
  // Находим элемент формы в модальном окне и сбрасываем его
  newCardPopup.querySelector(".popup__form").reset();
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

// Событие на закрытие попапа просмотра картинки в карточке
zoomModalCloseButton.addEventListener("click", () => {
  closeModal(zoomModal);
});

// Событие для закрытия формы добавления карточки по клику на оверлей
zoomModal.addEventListener("click", (evt) => {
  handleFormOverlay(evt);
});
