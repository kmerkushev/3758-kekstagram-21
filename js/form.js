"use strict";

(() => {
  let onPopupEscPress = (evt) => {
    if ((evt.key === `Escape`) && !hashtagInputIsFocused) {
      closePopup();
    }
  };

  let hashtagInputHandler = () => {
    let value = hashtagInput.value.toLowerCase();
    let valueSplitted = value.split(` `);
    let re = /^#[a-zA-Z\d]*$/;

    for (let i = 0; i < valueSplitted.length; i++) {
      if (valueSplitted.length > MAX_HASHTAG_COUNT) {
        hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
      } else if (!re.test(valueSplitted[i])) {
        if (valueSplitted[i][0] !== `#`) {
          hashtagInput.setCustomValidity(`Хеш-тег должен начинаться с #`);
        } else {
          hashtagInput.setCustomValidity(`Хеш-тег должен состоять только из букв и цифр`);
        }
      } else if (valueSplitted[i].length === 1) {
        hashtagInput.setCustomValidity(`Хеш-тег не может состоять только из одной решётки`);
      } else if (valueSplitted[i].length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(`Максимальная длина одного хэш-тега 20 символов, включая решётку`);
      } else if ((valueSplitted.length > 1) && (hasSameHashtags(valueSplitted))) {
        hashtagInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
      } else {
        hashtagInput.setCustomValidity(``);
      }

      hashtagInput.reportValidity();
    }
  };

  let hasSameHashtags = (arrayOfHashTags) => {
    let has = false;
    for (let i = 0; i < arrayOfHashTags.length; i++) {
      for (let j = i + 1; j < arrayOfHashTags.length; j++) {
        if (arrayOfHashTags[i] === arrayOfHashTags[j]) {
          has = true;
          break;
        }
      }
    }
    return has;
  };

  hashtagInput.addEventListener(`input`, () => {
    hashtagInputHandler();
  });

  hashtagInput.addEventListener(`focus`, () => {
    hashtagInputIsFocused = true;
  });

  hashtagInput.addEventListener(`blur`, () => {
    hashtagInputIsFocused = false;
  });
}) ();
