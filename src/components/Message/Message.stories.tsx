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

const user1 = { name: 'sessionWire', avatar: 'test-user-images/avatar-1' };

export const FirstMessage = Template.bind({});
FirstMessage.args = {
  username: user1.name,
  avatar: user1.avatar,
  message: 'Hey buddy',
  createdAt: new Date('July 14, 2022 12:34:00'),
  isFirstMessage: true,
};

export const NotFirstMessage = Template.bind({});
NotFirstMessage.args = {
  username: user1.name,
  avatar: user1.avatar,
  message: `Hello? (Hello? Hello? Hello?)  I hear you are feeling down Well`,
  createdAt: new Date('July 14, 2022 2:24:00'),
  isFirstMessage: false,
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  username: user1.name,
  avatar: user1.avatar,
  message: `Hello? (Hello? Hello? Hello?) Is there anybody in there? Just nod if you can hear me Is there anyone home? Come on now I hear you're feeling down Well I can ease your pain Get you on your feet again Relax I'll need some information first Just the basic facts Can you show me where it hurts? There is no pain you are receding A distant ship smoke on the horizon You are only coming through in waves Your lips move but I can't hear what you're saying When I was a child I had a fever My hands felt just like two balloons Now I've got that feeling once again I can't explain you would not understand This is not how I am I have become comfortably numb I have become comfortably numb`,
  createdAt: new Date('July 14, 2022 2:54:00'),
  isFirstMessage: true,
};
