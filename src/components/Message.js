import React from 'react';
import { MESSAGES } from '../constants';

export const Message = (props) => {
  const { isPlayersTurn, pausedForOne } = props;
  let message;
  if (isPlayersTurn && !pausedForOne) {
    message = MESSAGES.yourTurn;
  } else if (isPlayersTurn && pausedForOne) {
    message = MESSAGES.youRolledOne;
  } else if (!isPlayersTurn && !pausedForOne) {
    message = MESSAGES.compTurn;
  } else {
    message = MESSAGES.compRolledOne;
  }

  return (
    <div className="Message">
      <div className="Message-text">
        {message}
      </div>
    </div>
  );
}