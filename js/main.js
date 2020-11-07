"use strict";

let uploadCancelBtn = document.querySelector(`#upload-cancel`);
let uploadFileInput = document.querySelector(`#upload-file`);
let imageUploadOverlay = document.querySelector(`.img-upload__overlay`);

let onPopupEscPress = (evt) => {
  if ((evt.key === `Escape`) && !hashtagInputIsFocused) {
    closePopup();
  }
};

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
