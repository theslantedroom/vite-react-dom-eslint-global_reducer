export const generateCard = () => {
  return {
    name: 'Kitten',
    description: 'creates 1 Kitten every second',
    dateCreated: new Date('Sept 18, 2022 0:06:00 GMT+00:00'),
    timeRate: 0.001,
    counterSpeedMs: 100,
    rateReturn: 1,
  };
};

// TEST GAME - CARDS
export const genGameTest = () => {
  return [
    {
      name: 'Person',
      description: '',
      dateCreated: new Date(1667142263257),
      timeRate: 1,
      counterSpeedMs: 1000,
    },
    {
      name: 'Forward Traveller',
      description: 'Travels forward in time',
      dateCreated: new Date(1667145501762),
      timeRate: 11.1,
      counterSpeedMs: 100,
    },
    {
      name: 'Reverse Traveller',
      description: 'Travels backwards in time',
      dateCreated: new Date(1667145501762),
      timeRate: -5,
      counterSpeedMs: 100,
    },
  ];
};

export const genPerson = () => {
  return {
    name: 'Person',
    description: 'creates 1 Person every second',
    dateCreated: new Date(1667142263257),
    timeRate: 1,
    counterSpeedMs: 100,
  };
};

console.log('NOW:', Date.now());
