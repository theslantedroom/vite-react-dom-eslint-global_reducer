import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { XInputTrackBoxer, Props } from './XInputTrackBoxer';
export default { title: 'XInputTrackBoxer/XInputTrackBoxer', component: XInputTrackBoxer } as Meta;

const Template: Story<Props> = (args) => <XInputTrackBoxer {...args} />;

export const Default = Template.bind({});
Default.args = {};
