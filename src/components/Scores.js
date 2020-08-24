import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Scores = (props) => {
  return (
    <div className="Scores">
      <div className="Scores-player">
        <span className="Scores-playerScore">
          Player: {props.playerScore}
        </span>
        {props.isPlayersTurn ? <Icon name='chevron left'/> : null}
      </div>
      <div className="Scores-computer">
        {!props.isPlayersTurn ? <Icon name='chevron right'/> : null}
        <span className="Scores-computerScore">
          Computer: {props.computerScore}
        </span>
      </div>
    </div>
  );
}