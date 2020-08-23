import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Scores = (props) => {
  return (
    <div className="Scores">
      <div className="Scores-playerScore">
        Player score: {props.playerScore}
        {props.isPlayersTurn ? <Icon name='chevron left'/> : null}
      </div>
      <div className="Scores-computerScore">
        Computer Score: {props.computerScore}
        {!props.isPlayersTurn ? <Icon name='chevron left'/> : null}
      </div>
    </div>
  );
}