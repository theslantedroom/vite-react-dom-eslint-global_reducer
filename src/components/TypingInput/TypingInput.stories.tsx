import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { TypingInput, Props } from './TypingInput';
import { catWords, descriptiveWords } from './wordArrays';

export default {
  title: 'TypingInput/TypingInput',
  component: TypingInput,
} as Meta;

const Template: Story<Props> = (args) => (
  <Box sx={{ border: '1px solid grey', width: '300px', position: 'absolute' }}>
    <TypingInput {...args} />
  </Box>
);

const user1 = { name: 'sessionWire', avatar: 'test-user-images/avatar-1' };

export const Default = Template.bind({});
Default.args = {
  wordArray: catWords,
};
