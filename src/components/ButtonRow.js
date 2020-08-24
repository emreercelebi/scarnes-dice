import React from 'react';
import { Button } from 'semantic-ui-react';

export const ButtonRow = (props) => {

  const buttonData = [
    {
      handler: props.onRoll,
      text: 'Roll',
      color: 'blue'
    },
    {
      handler: props.onHold,
      text: 'Hold',
      color: 'green'
    },
    {
      handler: props.onReset,
      text: 'Reset',
      color: 'red'
    }
  ];

  return (
    <div className="ButtonRow">
      <div className="ButtonRow-buttons">
        {buttonData.map( (entry, index) => (
          <Button 
            className="ButtonRow-button"
            key={index}
            onClick={entry.handler} 
            disabled={props.disableButtons} 
            color={entry.color}>
            {entry.text}
          </Button>
        ))}
      </div>
    </div>
  )
}