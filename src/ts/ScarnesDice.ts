import { GameController } from "./GameController"
import { Modal } from "./Modal";

const MESSAGES = {
  playerKeepingRoll: (value: number) => `Adding ${value} to your total`,
  computerKeepingRoll: (value: number) => `Adding ${value} to the computer's total`,
  playerRolledOne: 'You rolled a 1! It\'s the computer\'s turn now',
  computerRolledOne: 'The computer rolled a 1! It\'s your turn now',
  playerTurn: 'Your turn',
  computerTurn: 'Computer\'s turn',
}

const MODAL_MESSAGES = {
  playerVictory: 'You win!',
  computerVictory: 'You lose :(',
}

class ScarnesDice {
  controller: GameController;
  rollBtn: HTMLButtonElement | null;
  keepBtn: HTMLButtonElement | null;
  currentRoll: number;
  currentRollsTotal: number;
  currentRollsTotalEl: HTMLDivElement | null;
  messageEl: HTMLDivElement | null;
  modal: Modal;

  constructor() {
    this.controller = new GameController;
    this.currentRollsTotal = 0;
    this.currentRoll = 0;
    this.rollBtn = document.querySelector('.js-btn-roll');
    this.keepBtn = document.querySelector('.js-btn-keep');
    this.currentRollsTotalEl = document.querySelector('.js-current-total');
    this.messageEl = document.querySelector('.js-game-message');
    this.modal = new Modal(this.resetGame.bind(this));

    this.initButtons();
  }

  initButtons(): void {
    if (this.rollBtn) {
      this.rollBtn.addEventListener('click', () => {
        this.playerRoll();
      });
    }
    if (this.keepBtn) {
      this.keepBtn.addEventListener('click', () => {
        this.playerKeep();
      });
    }
  }

  async playerRoll(): Promise<void> {
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
      if (this.hasEnoughToWin()) {
        this.playerKeep();
        this.playerVictory();
      }
    }
  }

  async playerKeep(isFinalTurn=false): Promise<void> {
    this.controller.keep(this.currentRollsTotal);

    this.updateMessage(MESSAGES.playerKeepingRoll(this.currentRollsTotal));
    await new Promise(r => setTimeout(r, 2000));
    this.updateMessage(MESSAGES.computerTurn);

    this.resetCurrentRollsTotal();
    this.controller.changeTurns();

    if (!isFinalTurn) {
      this.computerTurn();
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
        if (this.hasEnoughToWin()) {
          this.controller.keep(this.currentRollsTotal)
          this.computerVictory();
          return;
        }
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

  hasEnoughToWin(): boolean {
    let score = this.controller.isPlayerTurn ? this.controller.playerScore.getScore() : this.controller.computerScore.getScore();
    return score + this.currentRollsTotal >= 10;
  }

  playerVictory(): void {
    this.modal.reveal(MODAL_MESSAGES.playerVictory);
  }

  computerVictory(): void {
    this.modal.reveal(MODAL_MESSAGES.computerVictory);
  }

  resetGame(): void {
    this.resetCurrentRollsTotal();
    this.controller.computerScore.resetScore();
    this.controller.playerScore.resetScore();
  }
}

export {
  ScarnesDice
}