import React, { Component } from 'react';
import { ButtonRow } from './ButtonRow';
import { Scores } from './Scores';
import { Dice } from './Dice';
import { Rules } from './Rules';
import { Message } from './Message';
import { sleep } from '../helpers';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      computerScore: 0,
      roll: 1,
      isPlayersTurn: true,
      turnTotal: 0,
      disableButtons: false,
      pausedForOne: false
    };

    this.rollDice = this.rollDice.bind(this);
    this.holdValue = this.holdValue.bind(this);
    this.reset = this.reset.bind(this);
    this.computerTurn = this.computerTurn.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.enableButtons = this.enableButtons.bind(this);
  }

  async rollDice() {
    this.disableButtons();
    for (let i = 0; i < 12; i++) {
      await this.setState( prevState => ({
        roll: (prevState.roll % 6) + 1
      }));
      await sleep(75);
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    this.setState({
      roll: roll
    });

    if (roll === 1) {
      this.setState({
        turnTotal: 0,
        pausedForOne: true,
        disableButtons: true
      });
      await sleep(2000);
      this.setState({
        pausedForOne: false,
        disableButtons: false
      });
      this.holdValue();
    } else {
      this.setState( prevState => ({
        turnTotal: prevState.turnTotal + roll,
      }));
    }
    this.enableButtons();
  }

  holdValue() {
    const { turnTotal, isPlayersTurn } = this.state;

    if (isPlayersTurn) {
      this.setState( prevState => ({
        playerScore: prevState.playerScore + turnTotal,
        turnTotal: 0,
        isPlayersTurn: !prevState.isPlayersTurn
      }), () => setTimeout(this.computerTurn, 2000));
    } else {
      this.setState( prevState => ({
        computerScore: prevState.computerScore + turnTotal,
        turnTotal: 0,
        isPlayersTurn: !prevState.isPlayersTurn
      }));
    }
  }

  reset() {
    this.setState({
      isPlayersTurn: true,
      playerScore: 0,
      computerScore: 0,
      turnTotal: 0
    })
  }

  async computerTurn() {
    this.disableButtons();
    while (!this.state.isPlayersTurn) {
      await this.rollDice();
      if (!this.state.isPlayersTurn && this.state.turnTotal > 10) {
        this.holdValue();
      }
      await sleep(500);
    }
    this.enableButtons();
  }

  disableButtons() {
    this.setState({
      disableButtons: true
    });
  }

  enableButtons() {
    this.setState({
      disableButtons: false
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <Scores 
            playerScore={this.state.playerScore} 
            computerScore={this.state.computerScore} 
            isPlayersTurn={this.state.isPlayersTurn}
          />
          <Dice roll={this.state.roll}/>
          <div className="App-currentTotal">
            Current Total: {this.state.turnTotal}
          </div>
          <ButtonRow 
            disableButtons={this.state.disableButtons}
            onRoll={this.rollDice}
            onHold={this.holdValue}
            onReset={this.reset}
          />
          <Message 
            isPlayersTurn={this.state.isPlayersTurn}
            pausedForOne={this.state.pausedForOne}
          />
          <Rules />
        </div>
      </div>
    );
  }  
}

export default App;
