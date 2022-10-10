import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { MouseTrackBoxer, Props } from './MouseTrackBoxer';
export default { title: 'MouseTrackBoxer/MouseTrackBoxer', component: MouseTrackBoxer } as Meta;

const Template: Story<Props> = (args) => <MouseTrackBoxer {...args} />;

export const Default = Template.bind({});
Default.args = { optional: true, required: 'required' };
