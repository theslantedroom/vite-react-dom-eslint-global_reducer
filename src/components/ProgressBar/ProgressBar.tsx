import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';

export interface Props {
  message?: string;
  tooltip?: string;
  max?: number;
  value?: number;
  width?: number;
  height?: number;
}
export const ProgressBar: React.FC<Props> = ({
  message = 'Status',
  tooltip = 'This is a tooltip',
  max = 100,
  value = 2,
  width = 200,
  height = 30,
}) => {
  const style = {
    position: 'absolute',
    minHeight: height,
    width: width,
    p: 0,
    background: `linear-gradient(90deg, rgba(142,142,142,1) 0%, rgba(96,96,97,1) 69%, rgba(78,79,79,1) 100%)`,
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [hover, setHover] = useState<boolean>(false);
  const [shallowValue, setShallowValue] = useState<number>(value);
  const [showControls, setShowControls] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  const setValue = useCallback((val: number) => {
    setShallowValue(val);
  }, []);

  const memoWidth = useMemo(() => {
    const w = (shallowValue / max) * width;
    if (shallowValue >= max) return width;
    return w;
  }, [shallowValue, max, width]);

  useEffect(() => {
    setShallowValue(value);
  }, [value]);

  return (
    <Box
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
      sx={{
        cursor: 'pointer',
        height: height + 2,
        width: width,
      }}
    >
      {showControls && (
        <>
          <Stack
            id="controls"
            sx={{ width: `${width}px` }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <Button onClick={() => setValue(0)}>0</Button>
            <Button onClick={() => setValue(50)}>50</Button>
            <Button onClick={() => setValue(100)}>100</Button>
          </Stack>
        </>
      )}

      <Box
        sx={{
          ...style,
          width: `${memoWidth}px`,
          background: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
          zIndex: 1,
          transition: 'width 0.5s ease-in-out',
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
          background: `rgba(0,0,0,${hover ? 0.5 : 0.1})`,
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
