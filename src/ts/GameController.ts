import { Dice } from "./Dice"
import { Score } from "./Score";

class GameController {
  dice: Dice;
  isPlayerTurn: boolean;
  playerScore: Score;
  computerScore: Score;

  constructor() {
    this.dice = new Dice();
    this.isPlayerTurn = true;
    this.playerScore = new Score('player');
    this.computerScore = new Score('computer');
  }

  executeRoll() {
    return this.dice.roll();
  }

  keep(points: number): boolean {
    const newTotal = this.isPlayerTurn ?
      this.playerScore.updateScore(points) :
      this.computerScore.updateScore(points);

    return newTotal >= 100;
  }

  changeTurns(): void {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.playerScore.toggleActive();
    this.computerScore.toggleActive();
  }

}

export {
  GameController
}