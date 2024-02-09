// Конфигурация для запросов
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-6/",
  headers: {
    authorization: "f7885659-10a1-45b0-bf8f-0f4785f56493",
    "Content-Type": "application/json",
  },
};

// Функция проверки ответа на запрос
const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
};

// Запрос информации по пользователю
export function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

// Запрос на изменение данных профиля
export function sendProfileData(nameImput, jobInput) {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameImput,
      about: jobInput,
    }),
  }).then((response) => checkResponse(response));
}

// Запрос на изменение аватара
export function sendProfileAvatar(avatarLink) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((response) => checkResponse(response));
}

// Запрос информации по карточкам
export function getInitialCards() {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

// Запрос на отправку новой карточки
export function sendNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((response) => checkResponse(response));
}

// Запрос на удаление карточки
export function sendDeleteCard(cardID) {
  return fetch(`${config.baseUrl}cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

// Запрос на отправку лайка
export function sendLike(cardID) {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}

// Запрос на удаление лайка
export function sendDeleteLike(cardID) {
  return fetch(`${config.baseUrl}cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => checkResponse(response));
}
