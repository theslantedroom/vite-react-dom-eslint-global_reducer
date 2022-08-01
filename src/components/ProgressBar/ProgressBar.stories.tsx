import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { ProgressBar, Props } from './ProgressBar';

export default {
  title: 'CharacterCard/ProgressBar',
  component: ProgressBar,
  parameters: {
    info: {
      text: `ProgressBar`,
    },
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <Box sx={{ position: 'absolute', border: '1px solid', height: 400, width: 400, p: 2 }}>
    <ProgressBar {...args} />
  </Box>
);

export const Progress = Template.bind({});
Progress.args = {
  message: 'Health',
  tooltip: 'Health is Half Full',
  max: 100,
  value: 50,
};

export const Long = Template.bind({});
Long.args = {
  message: 'Health',
  tooltip: 'Full',
  max: 100,
  value: 100,
  width: 300,
};
