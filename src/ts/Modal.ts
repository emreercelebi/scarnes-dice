
class Modal {

  container: HTMLDivElement | null;
  resetButton: HTMLButtonElement | null;
  textEl: HTMLDivElement | null;
  resetGame: Function;

  constructor(resetGame: Function) {
    this.container = document.querySelector('.js-modal');
    this.resetButton = document.querySelector('.js-modal-reset');
    this.textEl = document.querySelector('.js-modal-text');
    this.resetGame = resetGame;

    this.initResetButton();
  }

  reveal(message: string): void {
    if (this.textEl) {
      this.textEl.innerHTML = message;
    }
    this.container?.classList.remove('u-hidden');
  }

  hide(): void {
    this.container?.classList.add('u-hidden');
  }

  initResetButton(): void {
    this.resetButton?.addEventListener('click', () => {
      this.hide(); 
      this.resetGame()
    });
  }
}

export {
  Modal
}