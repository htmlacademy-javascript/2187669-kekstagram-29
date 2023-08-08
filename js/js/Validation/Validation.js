import {isEscapeKey} from '../Utils/Utils.js';


const REGEX_VALIDATE_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const ERROR_TEXT_COMMENT_EXCEEDS_MAX_LENGTH = 'Комментарий не может превышать 140 символов';
const ERROR_TEXT_HASHTAGS_EXCEEDS_MAX_COUNT = 'Нельзя указать больше пяти хэш-тегов';
const ERROR_TEXT_HASHTAG_EXCEEDS_MAX_LENGTH = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
const ERROR_TEXT_HASHTAG_NULL = 'хеш-тег не может состоять только из одной решётки';
const ERROR_TEXT_HASHTAG_VALID = 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
const ERROR_TEXT_HASHTAG_DOUBLE = 'хеш-теги не могут повторяться';

const textDescription = document.querySelector('.text__description');
const textHashTags = document.querySelector('.text__hashtags');

const clearFormItem = (evt) => {
  if (evt.target.closest('input') || evt.target.closest('textarea')) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.target.value = '';
      evt.target.currentValue = '';
    }
  }
};

const validationForm = () => {
  const checkDuplicates = (array) => (new Set(array)).size !== array.length;

  const validationComment = () => {
    if (textDescription.value.length > 140) {
      textDescription.setCustomValidity(ERROR_TEXT_COMMENT_EXCEEDS_MAX_LENGTH);
    } else {
      textDescription.setCustomValidity('');
    }

    textDescription.reportValidity();
  };

  const validationHashTagCount = (arr) => {
    let messageError = '';
    if (arr.length > 5) {
      messageError = ERROR_TEXT_HASHTAGS_EXCEEDS_MAX_COUNT;
    } else {
      messageError = '';
    }

    return messageError;
  };

  const validationHashTag = (str) => {
    if (str.length > 20) {
      return ERROR_TEXT_HASHTAG_EXCEEDS_MAX_LENGTH;
    } else if (str.length === 1) {
      return ERROR_TEXT_HASHTAG_NULL;
    } else if (!REGEX_VALIDATE_HASHTAG.test(str)) {
      return ERROR_TEXT_HASHTAG_VALID;
    }

    return '';
  };

  const validationHashTags = () => {
    const hashTagArr = textHashTags.value.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');
    let message = '';

    message = validationHashTagCount(hashTagArr);
    if (message.length === 0) {
      hashTagArr.forEach((item) => {
        if (checkDuplicates(hashTagArr)) {
          message = ERROR_TEXT_HASHTAG_DOUBLE;
        } else {
          message = validationHashTag(item);
        }
      });
    }

    textHashTags.setCustomValidity(message);
    textHashTags.reportValidity();
  };

  textDescription.addEventListener('input', validationComment);
  textHashTags.addEventListener('input', validationHashTags);
};

export {clearFormItem, validationForm};
