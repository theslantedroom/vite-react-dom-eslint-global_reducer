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
      name: 'You',
      description: '',
      dateCreated: new Date(1667142263257),
      timeRate: 1,
      counterSpeedMs: 1000,
    },
    {
      name: 'Forward Traveler',
      description: 'Travels forward in time',
      dateCreated: new Date(1667145501762),
      timeRate: 11.1,
      counterSpeedMs: 100,
    },
    {
      name: 'Reverse Traveler',
      description: 'Travels backwards in time',
      dateCreated: new Date(1667145501762),
      timeRate: -2,
      counterSpeedMs: 100,
    },
  ];
};
export const genVillage = () => {
  return [
    {
      name: 'Modern Human',
      description: '',
      lifeDuration: 2.84e12,
      dateCreated: new Date('july, 14, 1984'),
      timeRate: 1,
      counterSpeedMs: 200,
    },
    {
      name: 'Early Roman',
      description: '-',
      lifeDuration: 1.04e12,
      dateCreated: new Date(-50000000000000),
      timeRate: 2,
      counterSpeedMs: 200,
    },
  ];
};

export const genIrlFamily = () => {
  return [
    {
      name: 'Steve',
      description: 'Steve',
      lifeDuration: 2.84e12,
      dateCreated: new Date('july, 14, 1984'),
      timeRate: 1,
      counterSpeedMs: 200,
    },
    {
      name: 'Annabel',
      description: 'Annabel',
      lifeDuration: 2.84e12,
      dateCreated: new Date('may, 30, 1994'),
      timeRate: 1,
      counterSpeedMs: 200,
    },
  ];
};

export const genPerson = () => {
  return {
    name: 'Person',
    description: 'creates 1 Person every second',
    dateCreated: new Date(1667142263257),
    timeRate: 1,
    counterSpeedMs: 200,
  };
};

export const genTimeTarget = () => {
  return {
    name: 'Hop to the future',
    dateTargetCreated: Date.now(),
    targetTime: Date.now() + 5000,
  };
};

export const subject0 = {
  name: 'Subject 0',
  description: [
    'help... help me....',
    '1.2.3.',
    'my lifespan is 15 seconds...',
    'I will die soon..',
  ],
  lifeDuration: 15000,
  dateCreated: new Date(),
  timeRate: 1,
  counterSpeedMs: 200,
};

console.log('NOW:', Date.now());
