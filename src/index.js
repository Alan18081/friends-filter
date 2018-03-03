import './main.sass';
window.VK = VK;

import Controller from './modules/Controller';

const controller = new Controller();
const btn = document.querySelector('.filter__button');

document.addEventListener('click',e => {
  controller.clickFriendHandler(e);
});

document.addEventListener('input', e => {
  controller.inputHandler(e);
});

document.addEventListener('dragstart', e => {
  controller.dragStartHandler(e);
});

controller.containerSelected.addEventListener('dragover', e => {
  e.preventDefault();
  e.stopPropagation();
});

controller.containerSelected.addEventListener('drop', e => {
  controller.dropHandler(e);
});

btn.addEventListener('click', () => {
  controller.saveHandler();
});