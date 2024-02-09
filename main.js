(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function r(e){e.target===e.currentTarget&&n(e.currentTarget)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}e.d({},{O:()=>y});var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6/",headers:{authorization:"f7885659-10a1-45b0-bf8f-0f4785f56493","Content-Type":"application/json"}};function u(e,t,n,r,o){var c=y.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button"),i=c.querySelector(".card__image"),s=c.querySelector(".card__title"),l=c.querySelector(".card__like-count");a.addEventListener("click",(function(){return n(a,d,l)})),i.addEventListener("click",(function(){return r(e)})),i.src=e.link,i.alt="Фотография: ".concat(e.name),s.textContent=e.name;var d=e._id;return c.dataset.cardId=d,0!==e.likes.length?(l.textContent=e.likes.length,e.likes.some((function(e){return e._id===o}))&&a.classList.toggle("card__like-button_is-active")):l.textContent=0,e.owner._id===o?u.addEventListener("click",(function(){return t(c,d)})):u.style.display="none",c}function a(e,t){(function(e){return fetch("".concat(c.baseUrl,"cards/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(t).then((function(){return e.remove()})).catch((function(e){return console.log(e)}))}function i(e,t,n){e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(t){e.classList.remove("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(t){e.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),n.forEach((function(n){d(e,n,t.inputErrorClass,t.errorClass)}))}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function d(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f,_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),v=document.querySelector(".profile__image-edit-button"),h=document.querySelector(".popup_type_new-avatar"),S=h.querySelector(".popup__form"),b=h.querySelector(".popup__close"),k=h.querySelector(".popup__input_type_url"),q=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit"),E=g.querySelector(".popup__form"),L=g.querySelector(".popup__close"),C=g.querySelector(".popup__input_type_name"),j=g.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),O=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_new-card"),U=w.querySelector(".popup__form"),T=w.querySelector(".popup__close"),B=w.querySelector(".popup__input_type_card-name"),D=w.querySelector(".popup__input_type_url"),I=document.querySelector(".popup_type_image"),M=I.querySelector(".popup__close");function N(e){A.style.backgroundImage="url('".concat(e.avatar,"')")}function J(e){var n=I.querySelector(".popup__image"),r=I.querySelector(".popup__caption");n.src=e.link,n.alt="Фотография: ".concat(e.name),r.textContent=e.name,t(I)}function H(e,t){e.querySelector(".button").textContent=t}Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(c.baseUrl,"cards"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],s=o[1];t=c,x.textContent=t.name,P.textContent=t.about,N(t),f=t._id,s.forEach((function(e){var t=u(e,a,i,J,f);m.append(t)}))})).catch((function(){return console.log("Произошла ошибка при загрузке данных профиля и карточки")})),v.addEventListener("click",(function(){S.reset(),s(S,_),t(h)})),b.addEventListener("click",(function(){n(h)})),h.addEventListener("click",(function(e){r(e)})),h.addEventListener("submit",(function(e){return function(e){var t;e.preventDefault(),H(h,"Сохранение..."),(t=k.value,fetch("".concat(c.baseUrl,"users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){N(e),n(h)})).catch((function(e){return console.log('При отправке нового аватара произошла ошибка: "'.concat(e,'"'))})).finally((function(){return H(h,"Сохранить")}))}(e)})),q.addEventListener("click",(function(){C.value=x.textContent,j.value=P.textContent,s(E,_),t(g)})),L.addEventListener("click",(function(){n(g)})),g.addEventListener("click",(function(e){r(e)})),g.addEventListener("submit",(function(e){e.preventDefault(),H(g,"Сохранение..."),function(e,t){return fetch("".concat(c.baseUrl,"users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(C.value,j.value).then((function(e){x.textContent=e.name,P.textContent=e.about,n(g)})).catch((function(e){return console.log('При отправке данных профиля произошла ошибка: "'.concat(e,'"'))})).finally((function(){return H(g,"Сохранить")}))})),O.addEventListener("click",(function(){U.reset(),s(U,_),t(w)})),T.addEventListener("click",(function(){n(w)})),w.addEventListener("click",(function(e){r(e)})),w.addEventListener("submit",(function(e){e.preventDefault(),H(w,"Сохранение...");var t,r,o={name:B.value,link:D.value};(t=o.name,r=o.link,fetch("".concat(c.baseUrl,"cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=u(e,a,i,J,f);m.prepend(t),n(w)})).catch((function(e){return console.log('При отправке данных новой карточки произошла ошибка: "'.concat(e,'"'))})).finally((function(){return H(w,"Сохранить")}))})),M.addEventListener("click",(function(){n(I)})),I.addEventListener("click",(function(e){r(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t,n,r,o,c){var u=Array.from(e.querySelectorAll(t)),a=e.querySelector(n);l(u,a,r),u.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,o,c),l(u,a,r)}))}))}(t,e.inputSelector,e.submitButtonSelector,e.inactiveButtonClass,e.inputErrorClass,e.errorClass)}))}(_)})();