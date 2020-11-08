const buttonStart = document.querySelector('.show');
const menu = document.querySelector('.menu');
const sidebar = document.querySelector('.sidebar');

function toggleMenu(event) {
  menu.classList.remove('invisible');
  buttonStart.classList.add('invisible');
}

function displayButton(event) {
  const isButtonStart = event.target === buttonStart;
  if (!isButtonStart) {
    buttonStart.classList.remove('invisible');;
    menu.classList.add('invisible');
  }
}

buttonStart.addEventListener('click', toggleMenu);
window.addEventListener('click', displayButton);
