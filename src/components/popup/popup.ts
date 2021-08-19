import { BaseComponent } from '../base-component';
import './popup.scss';

export class Popup extends BaseComponent {
  constructor() {
    super('div', ['popup']);
    this.element.classList.add('popup-open');
    this.element.innerHTML = `
      <h1>Congratulations!!!</h1>
      <p>You found all the matches</p>
    `;
  }
}
