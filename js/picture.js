"use strict";

(() => {
  let renderPictures = (arrayOfPosts) => {
    let template = document.querySelector(`#picture`).content.querySelector(`a`);
    let fragment = document.createDocumentFragment();
    let pictures = document.querySelector(`.pictures`);
    for (let i = 0; i < arrayOfPosts.length; i++) {
      let newPicture = template.cloneNode(true);
      newPicture.dataset.id = i;
      newPicture.querySelector(`.picture__img`).src = arrayOfPosts[i].url;
      newPicture.querySelector(`.picture__likes`).textContent = arrayOfPosts[i].likes;
      newPicture.querySelector(`.picture__comments`).textContent = arrayOfPosts[i].comments.length;
      fragment.appendChild(newPicture);
    }
    pictures.appendChild(fragment);
  };

  window.renderPictures = (posts) => {
    renderPictures(posts);
  };
}) ();
