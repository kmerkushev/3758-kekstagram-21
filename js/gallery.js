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
let closeBigPictureBtn = document.querySelector(`#picture-cancel`);
let newCommentInput = document.querySelector(`.social__footer-text`);
let newCommentInputIsFocused = false;


posts = window.posts();
window.renderPictures(posts);
