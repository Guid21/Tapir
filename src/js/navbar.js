document.getElementsByClassName('navbar__burger')[0].onclick = () => {
  document
    .getElementsByClassName('navbar__burger')[0]
    .classList.toggle('active');
  document.getElementsByClassName('navbar__menu')[0].classList.toggle('active');
  document.body.classList.toggle('lock');
};
