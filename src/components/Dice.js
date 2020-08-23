import React from 'react';
import dice1 from '../assets/images/dice1.png';
import dice2 from '../assets/images/dice2.png';
import dice3 from '../assets/images/dice3.png';
import dice4 from '../assets/images/dice4.png';
import dice5 from '../assets/images/dice5.png';
import dice6 from '../assets/images/dice6.png';


export const Dice = (props) => {

  const diceMap = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4, 
    5: dice5,
    6: dice6,
  }
  return (
    <div className="Dice">
      <img className="Dice-image" src={diceMap[props.roll]} alt={`dice with roll ${props.roll}`}/>
    </div>
  )
}