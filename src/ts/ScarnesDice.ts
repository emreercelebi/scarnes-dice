import { GameController } from "./GameController"

const MESSAGES = {
  playerKeepingRoll: (value: number) => `Adding ${value} to your total`,
  computerKeepingRoll: (value: number) => `Adding ${value} to the computer's total`,
  playerRolledOne: 'You rolled a 1! It\'s the computer\'s turn now',
  computerRolledOne: 'The computer rolled a 1! It\'s your turn now',
  playerTurn: 'Your turn',
  computerTurn: 'Computer\'s turn',
}

class ScarnesDice {
  controller: GameController;
  rollBtn: HTMLButtonElement | null;
  keepBtn: HTMLButtonElement | null;
  currentRoll: number;
  currentRollsTotal: number;
  currentRollsTotalEl: HTMLDivElement | null;
  messageEl: HTMLDivElement | null;

  constructor() {
    this.controller = new GameController;
    this.currentRollsTotal = 0;
    this.currentRoll = 0;
    this.rollBtn = document.querySelector('.js-btn-roll');
    this.keepBtn = document.querySelector('.js-btn-keep');
    this.currentRollsTotalEl = document.querySelector('.js-current-total');
    this.messageEl = document.querySelector('.js-game-message');

    this.initButtons();
  }

  initButtons(): void {
    if (this.rollBtn) {
      this.rollBtn.addEventListener('click', async () => {
        this.currentRoll = await this.controller.executeRoll();
        if (this.currentRoll == 1) {
          this.updateMessage(MESSAGES.playerRolledOne);
          await new Promise(r => setTimeout(r, 2000));
          this.updateMessage(MESSAGES.computerTurn);

          this.resetCurrentRollsTotal();
          this.controller.changeTurns();
          this.computerTurn();
        } else {
          this.incrementCurrentRollsTotal(this.currentRoll);
        }
      });
    }
    if (this.keepBtn) {
      this.keepBtn.addEventListener('click', async () => {
        this.controller.keep(this.currentRollsTotal);

        this.updateMessage(MESSAGES.playerKeepingRoll(this.currentRollsTotal));
        await new Promise(r => setTimeout(r, 2000));
        this.updateMessage(MESSAGES.computerTurn);

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
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!rolledAOne) {
      this.controller.keep(this.currentRollsTotal);

      this.updateMessage(MESSAGES.computerKeepingRoll(this.currentRollsTotal));
      await new Promise(r => setTimeout(r, 2000));
      this.updateMessage(MESSAGES.playerTurn);
    } else {
      this.updateMessage(MESSAGES.computerRolledOne);
      await new Promise(r => setTimeout(r, 2000));
      this.updateMessage(MESSAGES.playerTurn);
    }

    this.resetCurrentRollsTotal();
    this.controller.changeTurns();
  }

  resetCurrentRollsTotal(): void {
    this.updateCurrentRollsTotal(0);
  }

  incrementCurrentRollsTotal(delta: number): void {
    this.updateCurrentRollsTotal(this.currentRollsTotal + delta);
  }

  updateCurrentRollsTotal(value: number): void {
    this.currentRollsTotal = value;
    if (this.currentRollsTotalEl) {
      this.currentRollsTotalEl.innerHTML = `${this.currentRollsTotal}`;
    }
  }

  clearMessage(): void {
    this.updateMessage('');
  }

  updateMessage(message: string): void {
    if (this.messageEl) {
      this.messageEl.innerHTML = message;
    }
  }
}

export {
  ScarnesDice
}