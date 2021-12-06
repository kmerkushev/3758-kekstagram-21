`use strict`;

let imgFilters = document.querySelector(`.img-filters`);
let filterDefaultBtn = imgFilters.querySelector(`#filter-default`);
let filterRandomBtn = imgFilters.querySelector(`#filter-random`);
let filterDiscussedBtn = imgFilters.querySelector(`#filter-discussed`);

const randomCount = 10;


let onLoad = (request) => {
    imgFilters.classList.remove(`img-filters--inactive`);

    window.data = request;

    window.renderPictures(request);

    let filterHandler = (e) => {
        let filteredRequest = [];

        document.querySelector(`.img-filters__button--active`).classList.toggle(`img-filters__button--active`);
        e.target.classList.toggle(`img-filters__button--active`);

        if (e.target === filterDefaultBtn) {
            filteredRequest = request;
        } else if (e.target === filterRandomBtn) {
            let filteredPosts = [];
            let duplicate = request.slice();
            for (let i = 0; i < randomCount; i++) {
                let currentNumber = window.getRandomInt(0, duplicate.length);
                filteredPosts.push(duplicate[currentNumber]);
                duplicate.splice(currentNumber, 1);
            }
            filteredRequest = filteredPosts;
        } else if (e.target === filterDiscussedBtn) {
            let compareCommentsNumber = (a, b) => {
                if (a.comments.length < b.comments.length) return 1;
                if (a.comments.length == b.comments.length) return 0;
                if (a.comments.length > b.comments.length) return -1;
            }
            filteredRequest = request.slice().sort(compareCommentsNumber);
        }

        update = () => {
            updatePictures(filteredRequest);
        }

        debounce(update);
    }

    filterDefaultBtn.addEventListener(`click`, filterHandler);
    filterRandomBtn.addEventListener(`click`, filterHandler);
    filterDiscussedBtn.addEventListener(`click`, filterHandler);
};

let onError = (error) => {
    console.log(error);
};

window.getData(onLoad, onError);