import React, { useCallback, useState, useMemo } from 'react';

import { Stack, Box, Divider, Chip, Link } from '@mui/material';

import { appRoutes } from './../../layouts/App';

function Navbar() {
  return (
    <Box
      sx={{
        direction: 'row',
        alignItems: 'center',
        spacing: 1,
        p: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {appRoutes.map((route, index) => {
        return (
          <Link key={route.path} href={route.path} underline={'none'}>
            <Chip label={route.navText} />
          </Link>
        );
      })}
    </Box>
  );
}

export default Navbar;
