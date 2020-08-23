import React, { Component } from 'react';
import { ButtonRow } from './ButtonRow';
import { Scores } from './Scores';
import { Dice } from './Dice';
import { sleep } from '../helpers';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      computerScore: 0,
      roll: 1,
      isPlayersTurn: true,
      turnTotal: 0
    };

    this.rollDice = this.rollDice.bind(this);
  }

  async rollDice() {
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
      this.setState( prevState => ({
        turnTotal: 0,
        isPlayersTurn: !prevState.isPlayersTurn
      }));
    } else {
      this.setState( prevState => ({
        turnTotal: prevState.turnTotal + roll,
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <Scores playerScore={this.state.playerScore} computerScore={this.state.computerScore} />
        <Dice roll={this.state.roll}/>
        <div className="App-currentTotal">
          Current Total: {this.state.turnTotal}
        </div>
        <ButtonRow 
          onRoll={this.rollDice}
        />
      </div>
    );
  }  
}

export default App;
