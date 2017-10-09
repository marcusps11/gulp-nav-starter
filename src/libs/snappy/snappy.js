const Snappy = {

  init: function() {
    document.addEventListener('DOMContentLoaded', this.onDOMLoaded.bind(this));
  },

  onDOMLoaded: function(event) {
    this.renderComponents();
  },

  renderComponents: function() {
    const body = document.getElementsByTagName('body')[0];

    for (let key in this.Component) {
      let elements = document.querySelectorAll(`${this.Component[key].tagName}:not([defer-snappy])`);

      elements = Array.prototype.slice.call(elements);

      elements.forEach((element) => {
        let component = new this.Component[key](element, body);

        element.component = component;
        component.render();
      });
    }
  },

  Component: {},

  BaseComponent: class {
    constructor(element, body) {
      this.element = element;
      this.body = body;
    }
  }

};

export default Snappy;
