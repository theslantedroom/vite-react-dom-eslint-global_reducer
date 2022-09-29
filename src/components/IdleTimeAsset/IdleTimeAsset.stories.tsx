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
};

export const twoX = Template.bind({});
twoX.args = {
  name: 'twoX',
  timeRate: 2,
  minTimeRate: -2,
  maxTimeRate: 2,
  rateSliderStep: 1,
};

export const SecondCat = Template.bind({});
SecondCat.args = {
  name: 'Kitten',
  description: 'creates 1 Kitten every second',
  dateCreated: new Date('Sept 18, 2022 0:06:00 GMT+00:00'),
  timeRate: 0.001,
  counterSpeedMs: 100,
  rateReturn: 1,
};

export const Slow = Template.bind({});
Slow.args = {
  name: 'Slow',
  dateCreated: new Date('Sept 10, 2022 5:07:09 GMT+00:00'),
  timeRate: -2,
  counterSpeedMs: 100,
};

export const Fast = Template.bind({});
Fast.args = {
  name: 'Fast',
  dateCreated: new Date('Dec 10, 1894 5:07:09 GMT+00:00'),
  timeRate: 1000,
  counterSpeedMs: 100,
  minTimeRate: -2000,
  maxTimeRate: 2000,
  rateSliderStep: 1,
};

export const Steve = Template.bind({});
Steve.args = {
  name: 'Steve Born',
  dateCreated: new Date('July 14, 1984'),
  // timeRate: 0.001,
  // timeRate: -0,
  // counterSpeedMs: 100,
  // minTimeRate: -1000,
  // maxTimeRate: 1000,
  // rateSliderStep: 1,
};

export const Annabel = Template.bind({});
Annabel.args = {
  name: 'Annabel Born',
  dateCreated: new Date('May 30, 1994'),
  // timeRate: 1.2,
  // counterSpeedMs: 100,
  // minTimeRate: -20000,
  // maxTimeRate: 20000,
  // rateSliderStep: 1,
};

export const daysOld = Template.bind({});
daysOld.args = {
  name: 'Sept 15',
  dateCreated: new Date('Sept 15, 2022'),
  // timeRate: 1.2,
  // counterSpeedMs: 100,
  // minTimeRate: -20000,
  // maxTimeRate: 20000,
  // rateSliderStep: 1,
};
