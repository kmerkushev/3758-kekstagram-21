"use strict";

(() => {
  const EFFECT_LEVEL_DEFAULT = 20;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_COUNT = 5;

  let effectsList = document.querySelector(`.effects__list`);
  let effectLevelInput = document.querySelector(`.effect-level__value`);
  let effectLevelPin = document.querySelector(`.effect-level__pin`);
  let effectLevelDepth = document.querySelector(`.effect-level__depth`);
  let effectLevelLine = document.querySelector(`.effect-level__line`);

  let getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    return {
      x: box.left + pageXOffset,
      center: box.left + pageXOffset + box.width / 2
    };
  };

  effectLevelPin.addEventListener(`mouseup`, () => {
    getEffectLevel();
  });

  let getEffectLevel = () => {
    let levelPx = Math.round(getCoords(effectLevelPin).center - getCoords(effectLevelLine).x);
    let effectLineWidth = parseInt(getComputedStyle(effectLevelLine).width, 10);
    let levelPerCent = Math.round(levelPx / effectLineWidth * 100);
    return levelPerCent;
  };

  let setEffectLevel = (level) => {
    moveLevelPin(level);
    effectLevelInput.value = level;
  };

  let moveLevelPin = (level) => {
    effectLevelPin.style.left = level + `%`;
    effectLevelDepth.style.width = level + `%`;
  };

  effectsList.addEventListener(`change`, () => {
    setEffectLevel(EFFECT_LEVEL_DEFAULT);
  });


  let hashtagInput = document.querySelector(`.text__hashtags`);
  let hashtagInputIsFocused = false;

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

  window.hashtagInputIsFocused = hashtagInputIsFocused;
}) ();
