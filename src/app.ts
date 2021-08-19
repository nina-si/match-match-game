import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';
import { GameSize } from './components/shared/game-size';
import { CardCategory } from './components/shared/card-category';

export class App {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    let cat = localStorage.getItem('category');
    if (!localStorage.getItem('category')) {
      cat = CardCategory.Animal;
    }
    let size = localStorage.getItem('size');
    if (!localStorage.getItem('size')) {
      size = GameSize.Easy;
    }
    const categoryImages = categories.filter(
      (category) => category.category === cat,
    );
    let images = categoryImages[0].images.map((name) => `${cat}/${name}`);
    if (size === GameSize.Easy) {
      images = images.slice(0, 8);
    }
    this.game.newGame(images);
  }
}
