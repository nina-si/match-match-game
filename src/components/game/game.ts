import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { Popup } from '../popup/popup';
import { delay } from '../shared/delay';
import { Stopwatch } from '../stopwatch/stopwatch';
import './game.scss';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private readonly stopwatch: Stopwatch;

  private activeCard?: Card;

  private isAnimation = false;

  private isGameFinished = false;

  constructor() {
    super('div', ['game']);
    this.stopwatch = new Stopwatch();
    this.element.appendChild(this.stopwatch.element);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();

    const cards = [...images]
      .concat([...images])
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });

    this.cardsField.addCards(cards);
    this.stopwatch.start(1);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      card.element.classList.add('wrong-card');
      this.activeCard.element.classList.add('wrong-card');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    if (this.activeCard.image === card.image) {
      card.element.classList.add('right-card');
      this.activeCard.element.classList.add('right-card');
      this.checkVictory();
      if (this.isGameFinished) {
        this.stopwatch.stop();
        setTimeout(this.finishGame, 2500);
      }
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  private checkVictory() {
    const cards = document.querySelectorAll('.card-container');
    let counter = 0;

    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].classList.contains('right-card')) {
        this.isGameFinished = false;
      } else counter++;
    }
    if (counter === cards.length) {
      this.isGameFinished = true;
    }
  }

  finishGame = (): void => {
    const block = document.getElementById('main');
    const popup = new Popup();
    block?.appendChild(popup.element);
  };
}
