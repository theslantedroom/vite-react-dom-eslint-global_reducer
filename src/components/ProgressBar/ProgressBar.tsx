import React, { useCallback, useState } from 'react';

import { Typography, Box } from '@mui/material';

export interface Props {
  message: string;
  tooltip: string;
  max: number;
  value: number;
  width: number;
}
export const ProgressBar: React.FC<Props> = ({
  message = 'Status',
  tooltip = 'This is a tooltip',
  max = 100,
  value = 2,
  width = 200,
}) => {
  const style = {
    position: 'absolute',
    minHeight: 30,
    width: width,
    p: 0,
    background:
      'linear-gradient(90deg, rgba(142,142,142,1) 0%, rgba(96,96,97,1) 69%, rgba(78,79,79,1) 100%)',
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [hover, setHover] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <Box
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
      sx={{
        position: 'absolute',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          ...style,
          width: `${(value / max) * width}px`,
          position: 'absolute',
          background: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          ...style,
          background:
            'linear-gradient(90deg, rgba(142,142,142,1) 0%, rgba(96,96,97,1) 69%, rgba(78,79,79,1) 100%)',
          zIndex: 0,
        }}
      ></Box>

      <Box
        sx={{
          ...style,
          background: 'rgba(0,0,0,.5)',
          zIndex: 2,
        }}
      >
        <Typography
          sx={{ px: 2, color: hover ? 'darkGrey' : 'white', textAlign: 'center', zIndex: 3 }}
        >
          {hover ? tooltip : message}
        </Typography>
      </Box>
    </Box>
  );
};
