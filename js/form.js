"use strict";

(() => {
  const EFFECT_LEVEL_DEFAULT = 20;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_COUNT = 5;

  let effectsList = document.querySelector(`.effects__list`);
  let effectLevel = document.querySelector(`.effect-level`);
  let effectLevelInput = document.querySelector(`.effect-level__value`);
  let effectLevelPin = document.querySelector(`.effect-level__pin`);
  let effectLevelDepth = document.querySelector(`.effect-level__depth`);
  let effectLevelLine = document.querySelector(`.effect-level__line`);
  let picture = document.querySelector(`.img-upload__preview`);
  let currentFilter = `effect-none`;

  effectLevel.classList.add(`visually-hidden`);

  let getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    return {
      x: box.left + pageXOffset,
      center: box.left + pageXOffset + box.width / 2
    };
  };

  let getCursorX = (evt) => {
    return evt.clientX;
  };

  let getEffectLevel = (evt) => {
    let levelPx = Math.round(evt.clientX - getCoords(effectLevelLine).x);
    let effectLineWidth = parseInt(getComputedStyle(effectLevelLine).width, 10);
    let levelPerCent = Math.round(levelPx / effectLineWidth * 100);
    if (levelPerCent <= 0) {
      levelPerCent = 0;
    } else if (levelPerCent >= 100) {
      levelPerCent = 100;
    }
    return levelPerCent;
  };

  let setEffectLevel = (level, effectName) => {
    let levelComputed = level / 100;;
    if (effectName === `effect-none`) {
      picture.style = ``;
      effectLevel.classList.add(`visually-hidden`);
    } else {
      switch (effectName) {
        case `effect-chrome`:
          picture.style = `filter:grayscale(` + levelComputed + `); `;
          break;
        case `effect-sepia`:
          picture.style = `filter:sepia(` + levelComputed + `); `;
          break;
        case `effect-marvin`:
          levelComputed = level;
          picture.style = `filter:invert(` + levelComputed + `%); `;
          break;
        case `effect-phobos`:
          levelComputed = Math.round(level / 100 * 3);
          picture.style = `filter:blur(` + levelComputed + `px); `;
          break;
        case `effect-heat`:
          levelComputed = Math.round(level / 100 * 2 + 1);
          picture.style = `filter:brightness(` + levelComputed + `); `;
          break;
      };
      effectLevel.classList.remove(`visually-hidden`);
    }
    moveLevelPin(level);
    console.log(effectLevelInput.value);
    effectLevelInput.value = level;
  };

  let moveLevelPin = (level) => {
    effectLevelPin.style.left = level + `%`;
    effectLevelDepth.style.width = level + `%`;
  };


  let onEffectLevelPinMove = (evt) => {
    let currentLevel = getEffectLevel(evt);
    setEffectLevel(currentLevel, currentFilter);
  };


  effectsList.addEventListener(`change`, (evt) => {
    currentFilter = evt.target.id;
    setEffectLevel(EFFECT_LEVEL_DEFAULT, evt.target.id);
  });

  effectLevelPin.addEventListener(`mousedown`, () => {
    document.addEventListener(`mousemove`, onEffectLevelPinMove);

    document.addEventListener(`mouseup`, () => {
      document.removeEventListener(`mousemove`, onEffectLevelPinMove);
    });

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
})();
