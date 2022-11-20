import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';

import { Typography, Box, Button, Stack } from '@mui/material';

export interface Props {
  message?: string | any;
  tooltip?: string;
  max?: number;
  value?: number;
  width?: number;
  height?: number;
  parentRef?: React.RefObject<HTMLDivElement>;
}
export const ProgressBar: React.FC<Props> = ({
  message = 'Status',
  tooltip = 'This is a tooltip',
  max = 100,
  value = 2,
  width = 335,
  height = 25,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [widthBar, setWidthBar] = useState(
    width ? width : ref?.current?.parentElement?.offsetWidth || 200
  );
  useEffect(() => {
    if (width) return;
    setWidthBar(ref?.current?.parentElement?.offsetWidth || 200);
  }, [ref?.current?.parentElement?.offsetWidth]);

  const [hover, setHover] = useState<boolean>(false);
  const [shallowValue, setShallowValue] = useState<number>(value);
  const [showControls, setShowControls] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  const memoWidth = useMemo(() => {
    const w = (shallowValue / max) * widthBar;
    if (shallowValue >= max) return widthBar;
    return w;
  }, [shallowValue, max, widthBar]);

  useEffect(() => {
    setShallowValue(value);
  }, [value]);

  const style = {
    position: 'absolute',
    height: height,
    width: widthBar,
    p: 0,
    background: `linear-gradient(90deg, rgba(142,142,142,1) 0%, rgba(96,96,97,1) 69%, rgba(78,79,79,1) 100%)`,
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box
      ref={ref}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
      sx={{
        cursor: 'pointer',
        height: height + 2,
        width: widthBar,
      }}
    >
      {showControls && (
        <>
          <Stack
            id="controls"
            sx={{ width: `${widthBar}px` }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <Button onClick={() => setShallowValue(0)}>0</Button>
            <Button onClick={() => setShallowValue(50)}>50</Button>
            <Button onClick={() => setShallowValue(100)}>100</Button>
          </Stack>
        </>
      )}

      <Box
        sx={{
          ...style,
          width: `${memoWidth}px`,
          background: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
          zIndex: 1,
          // transition: 'width 0.5s ease-in-out', //30fps
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
