import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { IdleTimeAsset, Props } from './IdleTimeAsset';

export default {
  title: 'IdleTime/IdleTime',
  component: IdleTimeAsset,
} as Meta;

const Template: Story<Props> = (args) => (
  <Box>
    <IdleTimeAsset {...args} />
  </Box>
);

export const startCalcOnMount = Template.bind({});
startCalcOnMount.args = {
  name: 'startCalcOnMount',
  perMillisecond: 0.001,
};

export const SecondCat = Template.bind({});
SecondCat.args = {
  name: 'Kitten',
  description: 'creates 1 Kitten every second',
  dateCreated: new Date('Sept 18, 2022 0:06:00 GMT+00:00'),
  perMillisecond: 0.001,
  counterSpeedMs: 100,
};

export const Rabbit = Template.bind({});
Rabbit.args = {
  name: 'Rabbit',
  dateCreated: new Date('Sept 10, 2022 5:07:09 GMT+00:00'),
  perMillisecond: 0.00015,
  counterSpeedMs: 100,
};

export const Fast = Template.bind({});
Fast.args = {
  name: 'Fast',
  dateCreated: new Date('Dec 10, 1894 5:07:09 GMT+00:00'),
  perMillisecond: 0.184,
  counterSpeedMs: 100,
};

export const Steve = Template.bind({});
Steve.args = {
  name: 'Steve',
  dateCreated: new Date('July 14, 1984 5:07:09 GMT+00:00'),
  perMillisecond: 0.184,
  counterSpeedMs: 100,
};

export const Annabel = Template.bind({});
Annabel.args = {
  name: 'Annabel',
  dateCreated: new Date('May 30, 1994 5:07:09 GMT+00:00'),
  perMillisecond: 0.001,
  counterSpeedMs: 100,
};
