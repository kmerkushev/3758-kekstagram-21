"use strict";

(() => {
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPicturePreview = document.querySelector(`.big-picture__preview`);
  let isBigPicturePreviewClicked = false;
  let overlay = document.querySelector(`.big-picture.overlay`);

  let commentCount = document.querySelector(`.social__comment-count`);
  let commentsLoader = document.querySelector(`.comments-loader`);
  let closeBigPictureBtn = document.querySelector(`#picture-cancel`);
  let newCommentInput = document.querySelector(`.social__footer-text`);
  let newCommentInputIsFocused = false;

  let picturesContainer = document.querySelector(`.pictures`);

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

  let renderPostBigPicture = (post) => {
    bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).src = post.url;
    bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).alt = post.description;
    bigPicture.querySelector(`.likes-count`).textContent = post.likes;
    bigPicture.querySelector(`.comments-count`).textContent = post.comments.length;
    renderComment(post.comments);
  };

  let onBigPictureEscPress = (evt) => {
    if ((evt.key === `Escape`) && (!newCommentInputIsFocused)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  let onBigPicturePreviewClick = () => {
    isBigPicturePreviewClicked = true;
  };

  let onOverlayClick = (evt) => {
    bigPicturePreview.addEventListener(`click`, onBigPicturePreviewClick);

    if (!isBigPicturePreviewClicked) {
      closeBigPicture();
    } else {
      isBigPicturePreviewClicked = false;
    };
  };

  let openBigPicture = () => {
    bigPicture.classList.remove('hidden');
    commentCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);

    newCommentInput.addEventListener(`focus`, () => {
      newCommentInputIsFocused = true;
    });

    newCommentInput.addEventListener(`blur`, () => {
      newCommentInputIsFocused = false;
    });

    document.addEventListener(`keydown`, onBigPictureEscPress);
    overlay.addEventListener(`click`, onOverlayClick);

    closeBigPictureBtn.addEventListener(`click`, () => {
      closeBigPicture();
    });
  };

  let closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    commentCount.classList.remove(`hidden`);
    commentsLoader.classList.remove(`hidden`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    overlay.removeEventListener(`click`, onOverlayClick);
    isBigPicturePreviewClicked = false;
  };

  let clickHandler = (evt) => {
    let postId;
    if (evt.target.matches(`.picture__img`) || evt.target.matches(`.picture__info`)) {
      postId = evt.target.parentNode.dataset.id;
    } else if (evt.target.matches(`.picture__comments`) || evt.target.matches(`.picture__likes`)) {
      postId = evt.target.parentNode.parentNode.dataset.id;
    } else if (evt.target.matches(`.picture`)) {
      postId = evt.target.dataset.id;
    } else {
      return;
    };
    openBigPicture();
    renderPostBigPicture(window.posts[postId]);
  };

  picturesContainer.addEventListener(`click`, (evt) => {
    clickHandler(evt);
  });

  picturesContainer.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      clickHandler(evt);
    }
  });

  let onPictureEnterPress = (evt) => {
    if (evt.target.matches(`.picture`)) {
      openBigPicture();
    }
  };
})();
