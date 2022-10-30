import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';
import { genGameTest, genPerson } from '../util/generateCard';

// Components
import { IdleTimeBoard, Props } from './IdleTimeBoard';

export default {
  title: 'IdleTime/IdleTimeBoard',
  component: IdleTimeBoard,
} as Meta;

const Template: Story<Props> = (args) => (
  <Box>
    <IdleTimeBoard {...args} />
  </Box>
);
const gameTest = genGameTest();

export const Default = Template.bind({});
Default.args = {
  cards: gameTest,
};

export const NewGame = Template.bind({});
NewGame.args = {
  cards: [],
};
