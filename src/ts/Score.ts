class Score {
  element: HTMLDivElement | null;
  score: number;

  constructor(targetClass: string) {
    this.element = document.querySelector(`.${targetClass}`);
    this.score = 0;

    if (!this.element) {
      console.error(`Can't initialize score. No element with class ${targetClass}`);
    }
  }

  updateScore(delta : number) : number {
    this.score += delta;
    if (this.element) {
      this.element.innerHTML = `${this.score}`;
    }
    return this.score;
  }

  toggleActive() : void {
    this.element?.classList.toggle('u-active');
  }
}

export {
  Score
}