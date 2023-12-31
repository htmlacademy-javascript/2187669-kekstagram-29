import {getRandomInteger, getShuffle} from '../Utils/Utils.js';

const getMessage = (obj) => {
  const {min, max} = obj.comments.message.length;
  const countMessage = getRandomInteger(min, max);
  const messages = [];

  for (let messageIndex = min; messageIndex <= countMessage; messageIndex++) {
    messages.push(getShuffle(obj.comments.message.message)[messageIndex]);
  }

  return messages;
};

const getComments = (obj) => {
  const comments = [];
  const {min, max} = obj.comments.count;
  const {avatarMin, avatarMax} = obj.comments.avatar;
  const countComment = getRandomInteger(min, max);

  for (let commentIndex = min; commentIndex <= countComment; commentIndex++) {
    comments.push({
      id: commentIndex,
      avatar: `img/avatar-${getRandomInteger(avatarMin, avatarMax)}.svg`,
      message: getMessage(obj),
      name: obj.names[getRandomInteger(obj.names.length - 1)],
    });
  }

  return comments;
};

const createData = (obj) => {
  const {start, end} = obj.countPreview;
  const data = [];
  const {min, max} = obj.likes;

  for (let previewIndex = start; previewIndex <= end; previewIndex++) {
    data.push({
      id: previewIndex,
      url: `photos/${previewIndex}.jpg`,
      description: 'Какое-то описание для фотографии',
      likes: getRandomInteger(min, max),
      comments: getComments(obj),
    });
  }

  return data;
};

export {createData};
