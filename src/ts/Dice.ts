class Dice {
  element: HTMLImageElement | null;
  value: number;

  constructor() {
    const diceClass = 'js-dice';
    this.element = document.querySelector(`.${diceClass}`);
    this.value = 1;

    if (!this.element) {
      console.error(`No dice element with class "${diceClass}"`);
    }
  }

  async roll(): Promise<number> {
    const finalValue: number = Math.ceil(Math.random() * 6);
    for (let i = 0; i < 15; i++) {
      this.updateValue(this.value % 6 + 1);
      await new Promise(r => setTimeout(r, 100));
    }
    this.updateValue(finalValue);
    return finalValue;
  }

  updateValue(newValue: number): void {
    this.value = newValue;
    if (this.element) {
      this.element.src = `assets/Dice${newValue}.png`;
    }
  }
}

export {
  Dice
}