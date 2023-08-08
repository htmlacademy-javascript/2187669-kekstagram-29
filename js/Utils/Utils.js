import {closeOverlay, onCloseUploadEscPress} from '../UploadFile/UploadFile.js';

const ALERT_SHOW_TIME = 5000;
const body = document.body;

const getRandomInteger = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (min >= 0 && max >= 0) {
    if (min > max) {
      [min, max] = [max, min];
    }

    return Math.floor(min + Math.random() * (max + 1 - min));
  }
};

const getShuffle = (arr) => {
  const newArr = arr.slice();

  for (let currentIndex = newArr.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
  }

  return newArr;
};

const getRandomPosts = (posts) => getShuffle(posts).slice(0, 10);

// Функция сортировки
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;

// Функция сортировки по популярности
const sortByPopular = (pictures) => pictures.slice().sort(comparePosts);

const isEscapeKey = (evt) => evt.key === 'Escape';

const deleteSuccessPopup = () => {
  const popupSuccess = document.querySelector('.success__visible');
  body.removeChild(popupSuccess);
};

const deleteErrorPopup = () => {
  const popupError = document.querySelector('.error__visible');
  body.removeChild(popupError);
};

const closePopupsOnEsc = (closeFunction) => {
  const eventListener = (evt) => {
    if (!isEscapeKey(evt)) {
      return;
    }
    closeFunction();
    document.removeEventListener('keydown', eventListener, true);
  };
  return eventListener;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onUploadSuccess = () => {
  const uploadSuccess = document.querySelector('#success').content.querySelector('.success');

  const successTemplate = uploadSuccess.cloneNode(true);
  successTemplate.classList.add('success__visible');

  successTemplate.querySelector('.success__button').addEventListener('click', deleteSuccessPopup);
  closeOverlay();
  document.removeEventListener('keydown', onCloseUploadEscPress, true);
  body.appendChild(successTemplate);
  document.addEventListener('keydown', closePopupsOnEsc(deleteSuccessPopup), true);
};

const onUploadError = () => {
  const uploadError = document.querySelector('#error').content.querySelector('.error');

  const errorTemplate = uploadError.cloneNode(true);
  errorTemplate.classList.add('error__visible');

  errorTemplate.querySelector('.error__button').addEventListener('click', deleteErrorPopup);
  closeOverlay();
  document.removeEventListener('keydown', onCloseUploadEscPress, true);
  body.appendChild(errorTemplate);
  document.addEventListener('keydown', closePopupsOnEsc(deleteErrorPopup), true);
};

const showMessage = () => {
  const messageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');

  const messageElement = messageTemplate.cloneNode(true);
  document.body.appendChild(messageElement);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getShuffle,
  getRandomPosts,
  sortByPopular,
  isEscapeKey,
  onUploadSuccess,
  onUploadError,
  showMessage,
  showAlert,
  debounce
};
