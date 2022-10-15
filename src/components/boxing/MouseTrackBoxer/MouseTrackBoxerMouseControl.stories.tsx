import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { MouseTrackBoxerMouseControl, Props } from './MouseTrackBoxerMouseControl';
export default {
  title: 'MouseTrackBoxer/MouseTrackBoxerMouseControl',
  component: MouseTrackBoxerMouseControl,
} as Meta;

const Template: Story<Props> = (args) => <MouseTrackBoxerMouseControl {...args} />;

export const Default = Template.bind({});
Default.args = {};
