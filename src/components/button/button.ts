import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor() {
    super('div', ['button']);
    this.element.innerHTML = `
     <button class = 'header-button' id='start-button'>Start game</button>
    `;
  }
}
