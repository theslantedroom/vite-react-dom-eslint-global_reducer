import React, { useState } from 'react';

function Boxing() {
  const [handA, setHandA] = useState([]);
  const [handB, setHandB] = useState([]);
  const [deckA, setDeckA] = useState(starterDeckA);
  const [deckB, setDeckB] = useState(starterDeckB);

  const addInjury = (hand) => {
    const rand = Math.floor(Math.random() * 4);
    switch (hand) {
      case 'A':
        console.log('deck a injury');
        const newDeckA = deckA;
        switch (rand) {
          case 0:
            newDeckA.Swelling += 1;
            setDeckA(newDeckA);
            break;
          case 1:
            newDeckA.Cut += 1;
            setDeckA(newDeckA);
            break;
          case 2:
            newDeckA.Bruising += 1;
            setDeckA(newDeckA);
            break;
          case 3:
            newDeckA.Fatigue += 1;
            setDeckA(newDeckA);
            break;
          default:
        }
        break;

      case 'B':
        console.log('deck b injury');

        const newDeckB = deckB;
        switch (rand) {
          case 0:
            newDeckB.Swelling += 1;
            setDeckB(newDeckB);
            break;
          case 1:
            newDeckB.Cut += 1;
            setDeckB(newDeckB);
            break;
          case 2:
            newDeckB.Bruising += 1;
            setDeckB(newDeckB);
            break;
          case 3:
            newDeckB.Fatigue += 1;
            setDeckB(newDeckB);
            break;
          default:
        }
        break;
      default:
    }
    console.log('deckA', deckA);
    console.log('deckB', deckB);
  };

  function myRandomInts(quantity, max) {
    const set = new Set();
    while (set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1);
    }
    return set;
  }

  const drawHand = (hand, count) => {
    const newHand = [];
    const builtDeckA = [];
    const builtDeckB = [];

    switch (hand) {
      case 'A':
        console.log('draw a', deckA);
        Object.keys(deckA).forEach((key, i) => {
          const value = deckA[key];
          const foundCard = cards.find((card) => card.name === key);
          for (var i = 0; i < value; i++) {
            builtDeckA.push(foundCard);
          }
        });

        console.log('builtDeck A', builtDeckA);
        if (builtDeckA.length < 6) return;

        const setA = myRandomInts(count, builtDeckA.length - 1);
        setA.forEach((value) => {
          newHand.push(builtDeckA[value]);
        });

        const checkBoxesA = document.getElementsByClassName('checkboxA');
        Object.values(checkBoxesA).forEach((box) => {
          box.checked = false;
        });
        setHandA(newHand);

        break;

      case 'B':
        console.log('draw b', deckB);
        Object.keys(deckB).forEach((key, i) => {
          const value = deckB[key];
          const foundCard = cards.find((card) => card.name === key);
          for (var i = 0; i < value; i++) {
            builtDeckB.push(foundCard);
          }
        });
        console.log('builtDeck B', builtDeckB);
        if (builtDeckB.length < 6) return;
        const setB = myRandomInts(count, builtDeckB.length - 1);
        setB.forEach((value) => {
          newHand.push(builtDeckB[value]);
        });

        const checkBoxesB = document.getElementsByClassName('checkboxB');
        Object.values(checkBoxesB).forEach((box) => {
          box.checked = false;
        });
        setHandB(newHand);
        break;
      default:
    }
  };

  const clearHand = (hand) => {
    switch (hand) {
      case 'A':
        setHandA([]);
        break;
      case 'B':
        setHandB([]);
        break;
      default:
    }
  };

  const renderData = (card, i, player) => (
    <div key={card + i}>
      <input
        type="checkbox"
        className={`checkbox${player}`}
        name={card.name}
        value={false}
      ></input>
      <span style={{ fontWeight: 'bold' }}>{`${card.name} > `}</span>
      <span>{`${card.type === 'AMod' ? 'Mod Attack |' : ''} `}</span>
      <span>{`${card.type === 'DMod' ? 'Mod Defense |' : ''} `}</span>

      <span>{`${card.type === 'Injury' ? 'Injury' : ''} `}</span>
      <span>{`${card.type === 'Fatigue' ? 'Fatigue' : ''} `}</span>
      <span>{`${card?.counters ? ` counters: ${card.counters} |` : ''}`}</span>
      <span>{`${
        card?.drawInjury ? ` drawInjury: ${card.drawInjury} |` : ''
      }`}</span>
      <span>{`${card?.dblDmg ? ` 2XDmg |` : ''}`}</span>
      <span>{`${
        card?.drawReduction ? ` drawReduction: ${card.drawReduction} |` : ''
      }`}</span>
      <span>{`${
        card?.drawFatigue ? ` drawFatigue: ${card.drawFatigue} |` : ''
      }`}</span>
      <span>{`${card?.extraDef ? ` extraDef: ${card.extraDef} |` : ''}`}</span>
      <span>{`${card?.extraAtk ? ` extraAtk: ${card.extraAtk} |` : ''}`}</span>
      <span>{`${card?.bonus ? ` bonus: ${card.bonus} |` : ''}`}</span>
    </div>
  );
  return (
    <>
      <h1>Boxing</h1>
      <hr />

      <div>
        <hr />
        {Object.keys(deckA).map((key, i) => (
          <div key={i}>
            <span>{`${key}: `}</span>
            <span>{deckA[key]}</span>
          </div>
        ))}
        <hr />
        <h1>Player 1</h1>
        <button onClick={() => drawHand('A', 6)}> Draw Hand</button>
        <button onClick={() => clearHand('A')}> Clear</button>
        <button onClick={() => addInjury('A')}> Injury</button>

        {handA?.map((card, i) => renderData(card, i, 'A'))}
      </div>
      <hr />
      <div>
        <button onClick={() => drawHand('B', 6)}> Draw Hand</button>
        <button onClick={() => clearHand('B')}> Clear</button>
        <button onClick={() => addInjury('B')}> Injury</button>
        {handB?.map((card, i) => renderData(card, i, 'B'))}
        <h1>Player 2</h1>
      </div>
      <hr />

      {Object.keys(deckB).map((key, i) => (
        <div key={i}>
          <span>{`${key}: `}</span>
          <span>{deckB[key]}</span>
        </div>
      ))}
    </>
  );
}

export default Boxing;

const starterDeckA = {
  Fatigue: 0,
  Cut: 0,
  Swelling: 0,
  Bruising: 0,
  AtkBody: 0,
  Powerful: 2,
  Combo: 1,
  Flurry: 1,
  Jab: 1,
  Straight: 1,
  Hook: 1,
  Uppercut: 1,
  Quickly: 1,
  Counter: 1,
  Block: 1,
  Slip: 1,
  Roll: 1,
  Hug: 1,
};
const starterDeckB = {
  Fatigue: 0,
  Cut: 0,
  Swelling: 0,
  Bruising: 0,
  AtkBody: 1,
  Powerful: 2,
  Combo: 1,
  Flurry: 1,
  Jab: 1,
  Straight: 1,
  Hook: 1,
  Uppercut: 1,
  Quickly: 1,
  Counter: 1,
  Block: 1,
  Slip: 1,
  Roll: 1,
  Hug: 1,
};

const cards = [
  {
    name: 'Fatigue',
    type: 'Injury',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Cut',
    type: 'Injury',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Swelling',
    type: 'Injury',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Bruising',
    type: 'Injury',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'AtkBody',
    type: 'AMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: 'cannot slip, roll, or hug',
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Powerful',
    type: 'AMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: true,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Combo',
    type: 'AMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: 1,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Flurry',
    type: 'AMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: 2,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Jab',
    type: 'Atk',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: 1,
    drawInjury: 2,
  },
  {
    name: 'Straight',
    type: 'Atk',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: 0,
    drawInjury: 4,
  },
  {
    name: 'Hook',
    type: 'Atk',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: 0,
    drawInjury: 6,
  },
  {
    name: 'Uppercut',
    type: 'Atk',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: 2,
    drawInjury: 5,
  },
  {
    name: 'Counter',
    type: 'DMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: 1,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Quickly',
    type: 'DMod',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: 'play another card',
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Block',
    type: 'Def',
    canPlay: null,
    counters: ['Everything'],
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: 8,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Slip',
    type: 'Def',
    canPlay: null,
    counters: ['Jab', 'Straight', 'Uppercut'],
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Roll',
    type: 'Def',
    canPlay: null,
    counters: ['Hook', 'Uppercut'],
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: null,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
  {
    name: 'Hug',
    type: 'Def',
    canPlay: null,
    counters: null,
    cardType: null,
    extraAtk: null,
    extraDef: null,
    bonus: null,
    drawReduction: 6,
    dblDmg: null,
    drawFatigue: null,
    drawInjury: null,
  },
];
