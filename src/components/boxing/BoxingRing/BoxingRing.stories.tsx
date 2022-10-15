import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { BoxingRing, Props } from './BoxingRing';
export default { title: 'BoxingRing/BoxingRing', component: BoxingRing } as Meta;

const Template: Story<Props> = (args) => <BoxingRing {...args} />;

export const Default = Template.bind({});
Default.args = { optional: true, required: 'required' };
