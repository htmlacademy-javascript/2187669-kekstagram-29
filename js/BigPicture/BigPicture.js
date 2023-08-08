import {isEscapeKey} from '../Utils/Utils.js';
import {comments} from '../Comments/Comments.js';

const COMMENT_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const showBigPicture = (obj) => {
  const cancelBigPicture = bigPicture.querySelector('.cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const currentCommentsCount = bigPicture.querySelector('.current-comments-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  let currentCommentsCountInt = parseInt(currentCommentsCount.textContent, 10);
  const commentsCountInt = obj.comments.length;

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  if (currentCommentsCountInt >= commentsCountInt) {
    currentCommentsCountInt = commentsCountInt;
    commentsLoader.classList.add('hidden');
  } else {
    currentCommentsCountInt = COMMENT_COUNT;
    commentsLoader.classList.remove('hidden');
  }
  currentCommentsCount.textContent = currentCommentsCountInt;
  comments(obj.comments, currentCommentsCountInt);

  bigPicture.querySelector('.big-picture__img img').src = obj.url;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  commentsCount.textContent = String(commentsCountInt);
  bigPicture.querySelector('.social__caption').textContent = obj.description;

  comments(obj.comments, currentCommentsCountInt);

  commentsLoader.addEventListener('click', () => {
    currentCommentsCountInt += COMMENT_COUNT;
    if (currentCommentsCountInt >= commentsCountInt) {
      currentCommentsCountInt = commentsCountInt;
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
    currentCommentsCount.textContent = currentCommentsCountInt;
    comments(obj.comments, currentCommentsCountInt);
  });

  const closeBigPicture = (evt) => {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    currentCommentsCount.textContent = String(COMMENT_COUNT);
    comments(obj.comments, currentCommentsCountInt);
  };

  const closeBigPictureEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPicture(evt);
    }
    document.removeEventListener('keydown', closeBigPictureEscKeydown, true);
  };

  document.addEventListener('keydown', closeBigPictureEscKeydown, true);
  cancelBigPicture.addEventListener('click', (evt) => {
    closeBigPicture(evt);
    document.removeEventListener('keydown', closeBigPictureEscKeydown);
  });
};

export {showBigPicture};
