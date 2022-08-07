import React from 'react';
import { Box } from '@mui/material';

//style
export const MobileWrapper = ({ children }: any) => {
  return (
    <Box
      id="mobile-wrapper"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        // backgroundImage:
        //   'radial-gradient( circle 610px at 5.2% 51.6%,  rgba(5,8,114,1) 0%, rgba(7,3,53,1) 97.5% )',
      }}
    >
      {children}
    </Box>
  );
};
