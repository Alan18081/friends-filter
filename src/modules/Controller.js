import Model from './Model';
import View from './View';

import {compareStr} from './helpers';

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.containerAll = document.querySelector('#all');
    this.containerSelected = document.querySelector('#selected');
    this.showFriends();
  }
  showFriends() {
    this.model.getAllFriends()
      .then(res => {
        this.containerAll.innerHTML += this.view.render('list',res);
        this.model.getSelectedFriends();
        this.view.renderAll(this.containerAll,this.containerSelected,this.model.all,this.model.selected);
      });
  }
  clickFriendHandler(e) {
    const item = e.target;
    let activeItem;
    if(item.parentNode.id === 'all' || item.parentNode.parentNode.id === 'all') {
      let activeItem;
      if(item.parentNode.id === 'all') {
        activeItem = item;
      }
      else {
        activeItem = item.parentNode;
      }
      this.model.moveItem(activeItem.dataset.id,'all');
      this.view.renderAll(this.containerAll,this.containerSelected,this.model.all,this.model.selected);
    }
    else if(item.parentNode.id === 'selected' || item.parentNode.parentNode.id === 'selected') {
      if(item.parentNode.id === 'selected') {
        activeItem = item;
      }
      else {
        activeItem = item.parentNode;
      }
      this.model.moveItem(activeItem.dataset.id,'selected');
      this.view.renderAll(this.containerAll,this.containerSelected,this.model.all,this.model.selected);
    }

  }
  inputHandler(e) {
    const value = e.target.value;
    let type = 'all';
    let container = 'containerAll';
    if(e.target.dataset.type === 'selected') {
      type = 'selected';
      container = 'containerSelected'
    }
    const items = this.model.filterItems(value,type);
    this[container].innerHTML = this.view.render(items);
  }
  saveHandler() {
    this.model.saveInfo();
  }
  dragStartHandler(e) {
    if(e.target.classList.contains('filter__item')) {
      e.dataTransfer.setData('text/plain',e.target.dataset.id);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
    }
  }
  dropHandler(e) {
    if(e.target.id = 'selected') {
      const id = e.dataTransfer.getData('text/plain');
      this.model.moveItem(id,'all');
      this.view.renderAll(this.containerAll,this.containerSelected,this.model.all,this.model.selected);
    }
  }
}

export default Controller;