import { BaseComponent } from '../base-component';
import { Popup } from '../popup/popup';

export class MainBlock extends BaseComponent {
  private popup = new Popup();

  constructor() {
    super('main', ['main']);
    this.element.id = 'main';
  }

  addPopup(): void {
    this.element.appendChild(this.popup.element);
  }

  clearMain = (): void => {
    const block = document.getElementById('main');
    if (block) {
      block.parentNode?.removeChild(block);
    }
  };
}
