`use strict`;

const NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const DESCRIPTIONS = [
  `Красивая фотография`,
  `Снято на плёнку`,
  `Всем привет!`,
  `Если фото понравилось, ставьте лайк`,
  `Спасибо за внимание!`,
  `Всем хорошего настроения!`,
  `Передаю привет бабушке`,
  `Угадайте, где это?`,
  `:-)`,
  `Это фото сделано в городе Ессентуки`];
const MESSAGES = [
  `Всё отлично! В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const NUMBER_PICTURES = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATARS = 1;
const MAX_AVATARS = 6;
const MIN_COMMENTS_PER_POST = 1;
const MAX_COMMENTS_PER_POST = 5;

let urls = [];
let descriptions = [];
let comments = [];
let posts = [];
let bigPicture = document.querySelector(`.big-picture`);
let commentCount = document.querySelector(`.social__comment-count`);
let commentsLoader = document.querySelector(`.comments-loader`);

let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; /* Максимум не включается, минимум включается*/
};

let getURLs = () => {
  let array = [];
  for (let i = 0; i < NUMBER_PICTURES; i++) {
    array.push(`photos/` + (i + 1) + `.jpg`);
  }
  return array;
};

let getComment = () => {
  return {
    avatar: `img/avatar-` + getRandomInt(MIN_AVATARS, MAX_AVATARS + 1) + `.svg`,
    message: MESSAGES[getRandomInt(0, MESSAGES.length)],
    name: NAMES[getRandomInt(0, NAMES.length)]
  }
};

let getComments = (numberComments) => {
  let comments = [];
  for (let i = 0; i < NUMBER_PICTURES; i++) {
    let numberComments = getRandomInt(MIN_COMMENTS_PER_POST, MAX_COMMENTS_PER_POST + 1);
    let photoComments = [];
    for (let j = 0; j < numberComments; j++) {
      photoComments.push(getComment());
    }
    comments.push(photoComments);
  }
  return comments;
};

let getPost = (url, comment) => {
  return {
    url: url,
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)],
    likes: getRandomInt(MIN_LIKES, MAX_LIKES + 1),
    comments: comment
  }
};

let getPosts = (arrayOfURLs, arrayOfComments) => {
  let arrayOfPosts = [];
  for (let i = 0; i < NUMBER_PICTURES; i++) {
    arrayOfPosts.push(getPost(arrayOfURLs[i], arrayOfComments[i]));
  }
  return arrayOfPosts;
};

let renderPosts = (arrayOfPosts) => {
  let template = document.querySelector(`#picture`).content.querySelector(`a`);
  let fragment = document.createDocumentFragment();
  let pictures = document.querySelector(`.pictures`);
  for (let i = 0; i < arrayOfPosts.length; i++) {
    let newPicture = template.cloneNode(true);
    newPicture.querySelector(`.picture__img`).src = arrayOfPosts[i].url;
    newPicture.querySelector(`.picture__likes`).textContent = arrayOfPosts[i].likes;
    newPicture.querySelector(`.picture__comments`).textContent = arrayOfPosts[i].comments.length;
    fragment.appendChild(newPicture);
  }
  pictures.appendChild(fragment);
};

let renderComment = (arrayOfComments) => {
  let commentsContainer = document.querySelector(`.social__comments`);
  let template = document.querySelector(`#social__comment`).content.querySelector(`li`);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arrayOfComments.length; i++) {
    let newComment = template.cloneNode(true);
    newComment.querySelector(`img`).src = arrayOfComments[i].avatar;
    newComment.querySelector(`img`).alt = arrayOfComments[i].name;
    newComment.querySelector(`p`).textContent = arrayOfComments[i].message;
    fragment.appendChild(newComment);
  }
  commentsContainer.appendChild(fragment);
};

let renderPostBigPicture = (posts) => {
  bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).src = posts[0].url;
  bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).alt = posts[0].description;
  bigPicture.querySelector(`.likes-count`).textContent = posts[0].likes;
  bigPicture.querySelector(`.comments-count`).textContent = posts[0].comments.length;
  renderComment(posts[0].comments);
};

urls = getURLs();
comments = getComments();
posts = getPosts(urls, comments);
renderPosts(posts);

bigPicture.classList.remove('hidden');
commentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
renderPostBigPicture(posts);
