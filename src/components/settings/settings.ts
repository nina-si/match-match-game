import { GameSize } from '../shared/game-size';
import { CardCategory } from '../shared/card-category';

export function saveSettings(): void {
  const categoryList = document.querySelector('.category-list');
  const sizeList = document.querySelector('.size-list');
  let category: string;
  let size: string;

  categoryList?.addEventListener('click', () => {
    const animal = <HTMLInputElement>document.getElementById('animals');
    const travel = <HTMLInputElement>document.getElementById('travel');
    if (animal?.checked) {
      category = CardCategory.Animal;
    } else if (travel?.checked) {
      category = CardCategory.Travel;
    }
    localStorage.setItem('category', category);
  });

  sizeList?.addEventListener('click', () => {
    const easy = <HTMLInputElement>document.getElementById('44');
    const medium = <HTMLInputElement>document.getElementById('66');
    if (easy?.checked) {
      size = GameSize.Easy;
    } else if (medium?.checked) {
      size = GameSize.Medium;
    }
    localStorage.setItem('size', size);
  });
}
