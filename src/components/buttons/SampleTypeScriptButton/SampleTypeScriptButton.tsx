import React from 'react';

export interface Props {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  imgUrl?: string;
  diameter?: number;
  iconSize?: 0.2 | 0.3 | 0.4 | 0.5 | 0.6;
  onClick: () => void;
  datacy?: string;
}

/**
 * Renders a form input.
 * @param {string} color 'primary' | 'secondary'  Border color when selected.
 * @param {string} imgUrl The button image url.
 * @param {string} diameter The diameter of the button.
 * @param {number} iconSize The size of the + icon.
 */

export const SampleTypeScriptButton: React.FC<Props> = ({
  color = 'primary',
  imgUrl = '',
  diameter = 100,
  iconSize = 0.3,
  onClick,
  datacy,
}) => {
  return (
    <div>
      <h1>{diameter}</h1>
    </div>
  );
};
