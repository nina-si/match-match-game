import { BaseComponent } from '../base-component';
import './stopwatch.scss';

export class Stopwatch extends BaseComponent {
  private time;

  private running;

  constructor() {
    super('div', ['stopwatch']);
    this.time = 0;
    this.element.innerHTML = `
      00 : 00
    `;
    this.running = 0;
  }

  public start(running: number): void {
    this.running = running;
    if (this.running === 1) {
      setTimeout(() => {
        this.time++;
        let mins = Math.floor(this.time / 60).toString();
        let secs = (this.time % 60).toString();
        if (mins.length < 2) {
          mins = `0${mins}`;
        }
        if (secs.length < 2) {
          secs = `0${secs}`;
        }
        this.element.innerHTML = `
          ${mins} : ${secs}
        `;
        this.start(this.running);
      }, 1000);
    }
  }

  public stop(): void {
    this.running = 0;
    const timeValue = this.element.innerText;
    this.element.innerHTML = `
        ${timeValue}
      `;
  }
}
