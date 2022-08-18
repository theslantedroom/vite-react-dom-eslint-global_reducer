import React from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import Battery20Icon from '@mui/icons-material/Battery20';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { Meta, Story } from '@storybook/react';

import { Box } from '@mui/material';

// Components
import { SwipeableButton, Props } from './SwipeableButton';
import { swipableButtonBoxing } from './swipableButtonBoxing';

export default {
  title: 'Swipeable/SwipeableButton',
  component: SwipeableButton,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => <SwipeableButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  // buttonGroups: buttonGroupsBoxing,
};

export const Boxing = Template.bind({});
Boxing.args = {
  buttonGroups: swipableButtonBoxing,
};
