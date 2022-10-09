import { GameController } from "./GameController"

class ScarnesDice {
  controller: GameController;
  rollBtn: HTMLButtonElement | null;
  keepBtn: HTMLButtonElement | null;
  currentRoll: number;
  currentRollsTotal: number;
  currentRollsTotalEl: HTMLDivElement | null;

  constructor() {
    this.controller = new GameController;
    this.currentRollsTotal = 0;
    this.currentRoll = 0;
    this.rollBtn = document.querySelector('.js-btn-roll');
    this.keepBtn = document.querySelector('.js-btn-keep');
    this.currentRollsTotalEl = document.querySelector('.js-current-total');

    this.initButtons();
  }

  initButtons() : void {
    if (this.rollBtn) {
      this.rollBtn.addEventListener('click', async () => {
        this.currentRoll = await this.controller.executeRoll();
        if (this.currentRoll == 1) {
          this.resetCurrentRollsTotal();
          this.controller.changeTurns();
          this.computerTurn();
        } else {
          this.incrementCurrentRollsTotal(this.currentRoll);
        }
      });
    }
    if (this.keepBtn) {
      this.keepBtn.addEventListener('click', () => {
        this.controller.keep(this.currentRollsTotal);
        this.resetCurrentRollsTotal();
        this.controller.changeTurns();
        this.computerTurn();
      });
    }
  }

  async computerTurn() {
    let rolledAOne = false;
    while (this.currentRollsTotal < 10 && !rolledAOne) {
      this.currentRoll = await this.controller.executeRoll();
      if (this.currentRoll == 1) {
        rolledAOne = true;
      } else {
        this.incrementCurrentRollsTotal(this.currentRoll);
      }
    }
    
    if (!rolledAOne) {
      this.controller.keep(this.currentRollsTotal);
    }

    this.resetCurrentRollsTotal();
    this.controller.changeTurns();
  }

  resetCurrentRollsTotal() : void {
    this.updateCurrentRollsTotal(0);
  }

  incrementCurrentRollsTotal(delta : number) : void {
    this.updateCurrentRollsTotal(this.currentRollsTotal + delta);
  }

  updateCurrentRollsTotal(value : number) : void {
    this.currentRollsTotal = value;
    if (this.currentRollsTotalEl) {
      this.currentRollsTotalEl.innerHTML = `${this.currentRollsTotal}`;
    }
  }
}

export {
  ScarnesDice
}