import React from 'react';
import { Meta, Story } from '@storybook/react';

// Components
import { SampleTypeScriptButton, Props } from './SampleTypeScriptButton';

export default {
  title: 'Button/SampleTypeScriptButton',
  component: SampleTypeScriptButton,
  parameters: {
    info: {
      text: `
                A circle button for selecting an image to upload.
            `,
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <SampleTypeScriptButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
};

export const CustomDiameter = Template.bind({});
CustomDiameter.args = {
  color: 'primary',
  diameter: 200,
  iconSize: 0.3,
};

export const withImage = Template.bind({});
withImage.args = {
  color: 'primary',
  diameter: 200,
  iconSize: 0.3,
  imgUrl:
    'https://lh3.googleusercontent.com/proxy/BSgfUOOgDwUAESrMkcl7LQDI9NhbTHCzFX9PY-i3quf--9Ssdh_YtQDwjQiGqb9LU5UAeWIJjV9yPa7hocMWdgfAp6QOyU4S3lFWtgcmG7J6jZFz9NWMePBIn_iGTcA9UFoKg-hB5xNpGNeZnQ',
};
