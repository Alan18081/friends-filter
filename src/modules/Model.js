import {compareStr} from './helpers';

class Model {
  constructor() {
    this.all = [];
    this.selected = [];
    VK.init({
      apiId: 6385881
    });
  }
  getAllFriends() {
    return new Promise((resolve,reject) => {
      VK.Api.call('friends.get',{fields: 'photo_50',v: '5.73'},response => {
        if(response.error) {
          console.log(response.error);
          reject(response.error);
        }
        this.all = response.response.items;
        resolve(this.all);
      });
    })
  }
  getSelectedFriends() {
    if(localStorage.friends) {
      const friendsId = JSON.parse(localStorage.getItem('friends'));
      friendsId.forEach(id => {
        this.moveItem(id,'all');
      });
    }
  }
  moveItem(id,container) {
    const index = this[container].findIndex(item => item.id == id);
    this[container === 'all' ? 'selected' : 'all'].push(this[container][index]);
    this[container].splice(index,1);
  }
  filterItems(value,container) {
    return this[container].filter(item => {
      const name = `${item.first_name} ${item.last_name}`;
      return compareStr(name,value);
    });
  }
  saveInfo() {
    const idArray = this.selected.map(item => item.id);
    const friendsJson = JSON.stringify(idArray);
    localStorage.setItem('friends',friendsJson);
  }
}

export default Model;