`use strict`;

(() => {
  window.data;

  let onLoad = (request) => {
    console.log(request);
    window.renderPictures(request);
    window.data = request;
  };

  let onError = (error) => {
    console.log(error);
  };

  window.getData(onLoad, onError);

})();
