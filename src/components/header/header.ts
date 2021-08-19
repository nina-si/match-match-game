import { BaseComponent } from '../base-component';
import './header.scss';

export class Header extends BaseComponent {
  constructor() {
    super('div', ['header']);
    this.element.innerHTML = `
      <header class='main-header'>
      <nav>
        <ul class='main-menu'>
          <li class='menu-item active-menu-item'>
            <a class='menu-item-link' href="#about">About Game</a>
          </li>
          <li class='menu-item'>
            <a class='menu-item-link' href="#settings">Game Settings</a>
          </li>
          <li class='menu-item'>
            <a class='menu-item-link' href="#score">Best Score</a>
          </li>
        </ul>
      </nav>
      <button class='header-button' id='register-btn'>Register</button>
    </header>
    `;
  }
}
