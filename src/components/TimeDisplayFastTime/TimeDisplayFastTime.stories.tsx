import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { TimeDisplayFastTime, Props } from './TimeDisplayFastTime';

export default {
  title: 'Time/TimeDisplayFastTime',
  component: TimeDisplayFastTime,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <Box sx={{ border: '1px solid grey', position: 'absolute' }}>
    <TimeDisplayFastTime {...args} />
  </Box>
);

const user1 = { name: 'sessionWire', avatar: 'test-user-images/avatar-1' };

export const TimeDisplay = Template.bind({});
TimeDisplay.args = {
  message: 'Time Counter',
};
