import Handlebars from 'handlebars/dist/handlebars.min';

class View {
  render(data) {
    const template = document.querySelector(`#list-template`).textContent;
    return Handlebars.compile(template)({friends: data});
  }
  renderAll(containerAll,containerSelected,dataAll,dataSelected) {
    containerAll.innerHTML = this.render(dataAll);
    containerSelected.innerHTML = this.render(dataSelected);
  }
}

export default View;