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
  <Box>
    <ProgressBar {...args} />
  </Box>
);

export const Progress = Template.bind({});
Progress.args = {
  message: '0/200',
};
