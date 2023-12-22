// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function creatCard(name, link, delFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  buttonDelete.addEventListener("click", () => delFunc(cardElement));

  // Заполняем ссылку на картику и текст заголовка карточки
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(elem) {
  elem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((arr) => {
  const newCard = creatCard(arr.name, arr.link, deleteCard);
  cardList.append(newCard);
});