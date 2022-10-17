class Score {
  boxEl: HTMLDivElement | null;
  scoreEl: HTMLDivElement | null;
  score: number;

  constructor(player: string) {
    this.boxEl = document.querySelector(`.js-${player}-box`);
    this.scoreEl = document.querySelector(`.js-${player}-score`);
    this.score = 0;

    if (!this.scoreEl) {
      console.error(`Can't initialize score. No element with class js-${player}-score`);
    }

    if (!this.boxEl) {
      console.error(`Can't initialize score box. No element with class js-${player}-box`);
    }
  }

  getScore(): number {
    return this.score;
  }

  updateScore(delta: number): number {
    this.score += delta;
    if (this.scoreEl) {
      this.scoreEl.innerHTML = `${this.score}`;
    }
    return this.score;
  }

  toggleActive(): void {
    this.boxEl?.classList.toggle('Scores-box--active');
  }

  resetScore(): void {
    this.updateScore(this.score * -1);
  }
}

export {
  Score
}