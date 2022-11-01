import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { Message, Props } from './Message';

export default {
  title: 'Conversation/Message',
  component: Message,
} as Meta;

const Template: Story<Props> = (args) => (
  <Box sx={{ border: '1px solid grey', width: '300px', position: 'absolute' }}>
    <Message {...args} />
  </Box>
);

const user1 = { name: 'Milo', avatar: '/' };

export const FirstMessage = Template.bind({});
FirstMessage.args = {
  username: user1.name,
  avatar: user1.avatar,
  message: 'Meow',
  createdAt: new Date('July 14, 2022 12:34:00'),
  isFirstMessage: true,
};
