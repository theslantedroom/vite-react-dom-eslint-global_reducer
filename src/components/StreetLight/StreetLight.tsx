import React from 'react';
import './streetLight.css';
import { useMachine } from '@xstate/react';
import { streetLightMachine } from './streetLightMachine';

export const StreetLight = () => {
  // Typescript will infer what current and send are here
  // And will provide useful information about usage
  const [current, send] = useMachine(streetLightMachine);

  return (
    <div className="container">
      <div className="pole" />
      <div className="traffic-light">
        <input type="radio" readOnly className="light red" checked={current.matches('red')} />
        <input type="radio" readOnly className="light yellow" checked={current.matches('yellow')} />
        <input type="radio" readOnly className="light green" checked={current.matches('green')} />
        <button onClick={() => send('NEXT')}>NEXT</button>
      </div>
    </div>
  );
};
