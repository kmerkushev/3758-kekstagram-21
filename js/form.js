`use strict`;

const EFFECT_LEVEL_DEFAULT = 20;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

let isSuccessMessageCreated = false;
let isErrorMessageCreated = false;
let isMessageShown = false;

let effectsList = document.querySelector(`.effects__list`);
let effectNone = effectsList.querySelector(`#effect-none`);
let effectLevel = document.querySelector(`.effect-level`);
let effectLevelInput = document.querySelector(`.effect-level__value`);
let effectLevelPin = document.querySelector(`.effect-level__pin`);
let effectLevelDepth = document.querySelector(`.effect-level__depth`);
let effectLevelLine = document.querySelector(`.effect-level__line`);
let picture = document.querySelector(`.img-upload__preview`);
let currentFilter = `effect-none`;
let form = document.querySelector(`#upload-select-image`);
let sendBtn = document.querySelector(`#upload-submit`);

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



let commentField = document.querySelector(`.text__description`);
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

let createMessage = (type) => {
    let main = document.querySelector(`main`);
    let template = document.querySelector(`#${type}`).content.querySelector(`section`);
    let fragment = document.createDocumentFragment();
    let message = template.cloneNode(true);
    message.classList.add(`visually-hidden`);
    fragment.appendChild(message);
    main.appendChild(message);

    if (type === `success`) {
        isSuccessMessageCreated = true;
    } else if (type === `error`) {
        isErrorMessageCreated = true;
    }

    let btn = main.querySelector(`.${type}__button`);
    btn.addEventListener(`click`, () => {
        hideMessage(`${type}`);
    });
};

let showMessage = (type) => {
    let message = document.querySelector(`.${type}`);
    message.classList.remove(`visually-hidden`);

    isMessageShown = true;

    let onMessageEscPress = (evt) => {
        if ((evt.key === `Escape`) && isMessageShown) {
            hideMessage();
        }
    };

    document.addEventListener(`keydown`, onMessageEscPress);

    let onOverlayClick = (evt) => {
        if ((isMessageShown) && (evt.target != document.querySelector(`.${type}__inner`)) && (evt.target != document.querySelector(`.${type}__title`)) && (evt.target != document.querySelector(`.${type}__button`)) && (evt.target != document.querySelector(`.${type}__inner`))) {
            hideMessage(`${type}`);
        }
    };
    message.addEventListener(`click`, onOverlayClick);
}

let hideMessage = (type) => {
    let message = document.querySelector(`.${type}`);
    message.classList.add(`visually-hidden`);
    isMessageShown = false;
};

let onLoad = () => {
    window.closePopup();
    if (!isSuccessMessageCreated) {
        createMessage(`success`);
    }
    showMessage(`success`);
};

let onError = (error) => {
    window.closePopup();
    if (!isErrorMessageCreated) {
        createMessage(`error`);
    }
    showMessage(`error`);
}

let clearForm = () => {
    effectNone.checked = true;
    picture.style = ``;
    moveLevelPin(EFFECT_LEVEL_DEFAULT);
    effectLevel.classList.add(`visually-hidden`);
    effectLevelInput.value = EFFECT_LEVEL_DEFAULT;
    hashtagInput.value = ``;
    commentField.value = ``;
};

form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.sendData(new FormData(form), onLoad, onError);
    clearForm();
});

window.clearForm = () => {
    clearForm();
};