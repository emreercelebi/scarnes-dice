import React from 'react';
import { Button } from 'semantic-ui-react';

export const ButtonRow = (props) => {

  const buttonData = [
    {
      handler: props.onRoll,
      text: 'Roll'
    },
    {
      handler: props.onHold,
      text: 'Hold'
    },
    {
      handler: props.onReset,
      text: 'Reset'
    }
  ];

  return (
    <div className="ButtonRow">
      <div className="ButtonRow-buttons">
        {buttonData.map( entry => (
          <Button onClick={entry.handler} disabled={props.disableButtons}>
            {entry.text}
          </Button>
        ))}
      </div>
    </div>
  )
}