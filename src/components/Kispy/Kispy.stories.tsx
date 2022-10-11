import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Kispy, Props } from './Kispy';
export default { title: 'Category/Kispy', component: Kispy } as Meta;
const Template: Story<Props> = (args) => <Kispy {...args} />;
export const Default = Template.bind({});
Default.args = { optional: true, required: 'string' };
