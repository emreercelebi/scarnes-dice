import React, { Component } from 'react';
import { ButtonRow } from './ButtonRow';
import { Scores } from './Scores';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      computerScore: 0
    };
  }

  render() {
    return (
      <div className="App">
        <Scores playerScore={this.state.playerScore} computerScore={this.state.computerScore} />
        <ButtonRow/>
      </div>
    );
  }  
}

export default App;
