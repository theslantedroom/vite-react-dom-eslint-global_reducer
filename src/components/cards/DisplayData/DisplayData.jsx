import React from 'react';

//style
import { globalStyles } from '../../../theme/globalStyles';
export const DisplayData = ({ object }) => {
  const style = {
    border: '1px solid grey',
    padding: '3px',
    display: 'flex',
    width: '250px',
    flexDirection: 'column',
    textAlign: 'center',
  };

  const generateDivs = (obj) => {
    if (!obj) return <div>no data</div>;
    let keys = Object.keys(obj);
    return keys.map((key, i) => <div key={i}>{` ${key}: ${object[key]}`}</div>);
  };

  return (
    <>
      <div style={style}>{generateDivs(object)}</div>
    </>
  );
};
