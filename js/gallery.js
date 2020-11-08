`use strict`;

(() => {
  let onLoad = (request) => {
    window.renderPictures(request);
    window.data = request;
  };

  let onError = (error) => {
    console.log(error);
  };

  window.getData(onLoad, onError);

})();
