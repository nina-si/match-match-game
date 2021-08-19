import { MainBlock } from './main-block/main-block';

export class PageTemplate {
  private readonly main: MainBlock;

  private readonly pageType: string;

  constructor(private readonly rootElement: HTMLElement, pageType: string) {
    this.pageType = pageType;
    this.main = new MainBlock();
    this.rootElement.appendChild(this.main.element);
  }

  add(): void {
    if (!this.main) {
      throw Error('main element not found');
    }
    if (this.pageType === 'about') {
      this.main.element.innerHTML = `
      <div class='how-to-play'>
        <h1>How to play?</h1>
        <ul class = 'game-instruction'>
          <li>Before playing, you need to click on 'Register'</li>
          <li>After filling registration form, click 'Register' and you'll see a 'Start game' button</li>
          <li>You can proceed to Game Settings page and choose Category and Field size</li>
          <li>If you start the game without choosing game settings, default settings will be applied</li>
        </ul>
      </div>`;
    } else if (this.pageType === 'settings') {
      this.main.element.innerHTML = `
        <div class="settings-wrapper">
          <form action="" class="category-list">
            <h2 class='category-name'>Category:</h2>
            <input type="radio" id="animals" name="category" value="animals">
            <label for="animals">Animals</label><br>
            <input type="radio" id="travel" name="category" value="travel">
            <label for="travel">Travel</label><br>
          </form>
          <form action="" class="size-list">
            <h2 class='field-size'>Field Size:</h2>
            <input type="radio" id="44" name="size" value="44">
            <label for="44">4 x 4</label><br>
            <input type="radio" id="66" name="size" value="66">
            <label for="66">6 x 6</label><br>
          </form>
        </div>
      `;
    } else if (this.pageType === 'score') {
      this.main.element.innerHTML = 'TOP Score';
    }
  }
}
