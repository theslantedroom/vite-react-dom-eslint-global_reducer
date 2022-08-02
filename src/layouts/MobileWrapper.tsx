import React from 'react';
import { Box } from '@mui/material';

//style
export const MobileWrapper = ({ children }: any) => {
  return (
    <Box
      id="mobile-wrapper"
      sx={{
        border: '1px solid grey',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        backgroundColor: 'gray',
      }}
    >
      {children}
    </Box>
  );
};
