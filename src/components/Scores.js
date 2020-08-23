import React from 'react';

export const Scores = (props) => {
  return (
    <div className="Scores">
      <div className="Scores-playerScore">
        Player score: {props.playerScore}
      </div>
      <div className="Scores-computerScore">
        Computer Score: {props.computerScore}
      </div>
    </div>
  );
}