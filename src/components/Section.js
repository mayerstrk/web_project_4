export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(item, method) {
    if (method === "append") {
      this._containerElement.append(item);
    } else {
      this._containerElement.prepend(item);
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }
}
