import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';
import { genGameTest, genVillage, genIrlFamily } from '../util/generateCard';

// Components
import { IdleHistoryBoard, Props } from './IdleHistoryBoard';

export default {
  title: 'IdleTime/IdleHistoryBoard',
  component: IdleHistoryBoard,
} as Meta;

const Template: Story<Props> = (args) => (
  <Box>
    <IdleHistoryBoard {...args} />
  </Box>
);
const gameTest = genGameTest();

export const NewGame = Template.bind({});
NewGame.args = {
  cards: [],
};

export const Village = Template.bind({});
Village.args = {
  cards: [...genVillage()],
};
