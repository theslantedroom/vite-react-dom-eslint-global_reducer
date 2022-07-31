import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { InventorySlot, Props } from './InventorySlot';

import { gameItems } from '../../../src/hardData/items';

export default {
  title: 'CharacterCard/InventorySlot',
  component: InventorySlot,
  parameters: {
    info: {
      text: `InventorySlot`,
    },
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <Box>
    <InventorySlot {...args} />
  </Box>
);

export const Single = Template.bind({});
Single.args = {
  itemId: 'bandage',
  isDouble: false,
};

export const Double = Template.bind({});
Double.args = {
  itemId: '1',
  isDouble: true,
};
