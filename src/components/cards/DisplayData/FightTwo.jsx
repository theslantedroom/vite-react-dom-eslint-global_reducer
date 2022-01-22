import React, { useEffect, useState } from 'react';

//style
import { globalStyles } from '../../../theme/globalStyles';
import '../../../../src/static/css/index.css';

export const FightTwo = ({ objectA, objectB }) => {
  const [textA, setTextA] = useState('....');
  const style = {
    border: '1px solid grey',
    padding: '3px',
    display: 'flex',
    width: '250px',
    flexDirection: 'column',
    textAlign: 'center',
  };
  useEffect(() => {
    return function cleanup() {
      console.log('cleanup');
    };
  }, []);

  const renderAlive = (obj) => {
    return (
      <div>
        <h1>{obj.name?.toUpperCase()}</h1>
        <div>{obj.health}</div>
      </div>
    );
  };
  const renderDead = (obj) => {
    return (
      <div>
        <h1>{obj.name?.toUpperCase()}</h1>
        <div>Dead</div>
      </div>
    );
  };

  const animateCompute = () => {
    let i = 0;
    let timer = setInterval(function () {
      ++i;
      if (i === 10) clearInterval(timer);
      setTextA('.'.repeat(i));
    }, 30);
  };
  const fight = () => {
    console.log('objectB.type', objectB.isAlive);
    objectA.defend(objectB);
    objectB.defend(objectA);
  };

  const compute = () => {
    animateCompute();
    fight();
  };

  return (
    <>
      <div>
        <h1>FIGHT TWO</h1>
      </div>

      <div style={globalStyles.flexRowSA}>
        {objectA.health > 0 ? renderAlive(objectA) : renderDead(objectA)}
        <div>
          <h1>VS</h1>
        </div>
        {objectB.health > 0 ? renderAlive(objectB) : renderDead(objectB)}
      </div>
      <div>
        <h1>{textA}</h1>
      </div>
      <button className="button-74" onClick={compute}>
        Compute
      </button>
    </>
  );
};
