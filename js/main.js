"use strict";

const EFFECT_LEVEL_DEFAULT = 20;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

let uploadCancelBtn = document.querySelector(`#upload-cancel`);

let uploadFileInput = document.querySelector(`#upload-file`);
let imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

let effectsList = document.querySelector(`.effects__list`);
let effectLevelInput = document.querySelector(`.effect-level__value`);
let effectLevelPin = document.querySelector(`.effect-level__pin`);
let effectLevelDepth = document.querySelector(`.effect-level__depth`);
let effectLevelLine = document.querySelector(`.effect-level__line`);

let hashtagInput = document.querySelector(`.text__hashtags`);
let hashtagInputIsFocused = false;


uploadFileInput.addEventListener(`change`, () => {
  openPopup();
});

uploadCancelBtn.addEventListener(`click`, () => {
  closePopup();
});

let openPopup = () => {
  imageUploadOverlay.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = () => {
  uploadFileInput.value = ``;
  imageUploadOverlay.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};
