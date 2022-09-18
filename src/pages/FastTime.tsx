import React, { useState } from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';
import { useGlobalContext } from '../contexts/global/GlobalContext';
import { TypeOut2 } from '../components/cards/DisplayData/TypeOut';
import { FastLifeGame } from '../components/TimeDisplayFastTime/FastLifeGame';
import TypeOut from 'react-typeout';
//style

interface Person {
  sex: 'male' | 'female';
  generation: number;
  age: number;
  name: string;
}

const defaultChild = { generation: 0, age: 0, sex: 'male', name: 'Clone' } as Person;

export const FastTime: React.FC = () => {
  const [familyTree, setFamilyTree] = useState<Person[]>([defaultChild]);
  const [text, setText] = useState<string[]>(['You will have a child soon.']);
  const handleDoneTyping = () => {
    setText(['thats all']);
    alert('d');
  };

  return (
    <div>
      <FastLifeGame realTimeOnRender={new Date()} message="..."></FastLifeGame>

      {familyTree.map((person) => {
        return <PersonCard person={person}></PersonCard>;
      })}
    </div>
  );
};

export interface PersonCardProps {
  person: Person;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div>
      <div>{person.name}</div>
      <div>generation: {person.generation}</div>
      <div>age: {person.age}</div>
    </div>
  );
};
