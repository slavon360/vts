// document.fonts.ready.then(function() {
//     // Fonts are loaded, trigger your event here
//     const preloader = document.querySelector('.content-preloader');
//     preloader.classList.add('d-none');
// });

window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader-container');
  preloader.classList.add('d-none');
});