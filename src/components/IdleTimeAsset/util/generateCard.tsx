const dayMs = 8.64e7;
const yearMs = 8.64e7 * 365;

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
  description: ['help... help me....', '1.2.3.', 'I will die soon..'],
  lifeDuration: yearMs * 1,
  dateCreated: new Date(),
  timeRate: 1000000,
  counterSpeedMs: 200,
};

export const baseTime = {
  name: 'Time Probe',
  description: [
    '.......',
    '.......',
    'performing system diagnostics',
    '.......',
    'this is your local frame of reference',
    'all systems normal',
    'proceeding as normal',
  ],
  // lifeDuration: yearMs * yearMs * 1.212 + 3453667,
  lifeDuration: 3000000,
  dateCreated: new Date(),
  timeRate: 12,
  counterSpeedMs: 200,
};

export const genTimeProbe = () => {
  return {
    name: 'Time Probe',
    description: [
      '.......',
      '.......',
      'performing system diagnostics',
      '.......',
      'this is your local frame of reference',
      'all systems normal',
      'proceeding as normal',
    ],
    // lifeDuration: yearMs * yearMs * 1.212 + 3453667,
    lifeDuration: 100000,
    dateCreated: new Date(),
    timeRate: 12,
    counterSpeedMs: 200,
  };
};
export const subjectLongDead = {
  name: 'Long Dead Roman',
  description: ['help... help me....', '1.2.3.', 'I will die soon..'],
  lifeDuration: yearMs * 25,
  dateCreated: new Date(-50000000000000),
  timeRate: 1,
  counterSpeedMs: 200,
};

console.log('NOW:', Date.now());
