`use strict`;

const URL_GET = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_POST = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_IN_MS = 2000;

let form = document.querySelector(`#upload-select-image`);

window.getData = (onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL_GET);
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, () => {
        onLoad(xhr.response);
    });

    xhr.addEventListener(`error`, () => {
        onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.send();
}

window.sendData = (data, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function() {
        onLoad();
    });

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
}