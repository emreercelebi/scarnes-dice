import React from 'react';
import { Button } from 'semantic-ui-react';

export const ButtonRow = (props) => {
  return (
    <div className="ButtonRow">
      <div className="ButtonRow-buttons">
        <Button>
          Roll
        </Button>
        <Button>
          Hold
        </Button>
        <Button>
          Reset
        </Button>
      </div>
    </div>
  )
}