// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function creatCard(cardData, delFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  buttonDelete.addEventListener("click", () => delFunc(cardElement));

  // Заполняем ссылку на картику, альтернативный текст картинки и текст заголовка карточки
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = `Фотография: ${cardData.name}`;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(elem) {
  elem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((arr) => {
  const newCard = creatCard(arr, deleteCard);
  cardsContainer.append(newCard);
});