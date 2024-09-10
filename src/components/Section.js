export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      console.log(item);
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }

  setItems(items) {
    this._items = items;
  }
}
