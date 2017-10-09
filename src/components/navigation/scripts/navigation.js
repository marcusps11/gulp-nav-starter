import Snappy from '../../../libs/snappy/snappy';
import PROJECT_CONSTANTS from '../../../scripts/projectConstants';

Snappy.Component.Navigation = class Navigation extends Snappy.BaseComponent {
  static get tagName() {
    return 'navigation';
  }

  constructor(element, body) {
    super(element, body);
  }

  get CONSTANTS() {
    return {
      selectors: {
        menuOpen: 'menu-open'
      }
    };
  }

  render() {
    this.setVars();
    this.addListeners();
  }

  setVars() {
    this.menuButton = this.element.querySelector('.site-navigation__menu-button');
  }

  addListeners() {
    this.menuButton.addEventListener(PROJECT_CONSTANTS.events.click, this.onMenuButtonClick.bind(this));
  }

  onMenuButtonClick() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenu();
  }

  toggleMenu() {
    if (this.isMenuOpen) {
      this.body.classList.add(this.CONSTANTS.selectors.menuOpen);
    } else {
      this.body.classList.remove(this.CONSTANTS.selectors.menuOpen);
    }
  }
}
