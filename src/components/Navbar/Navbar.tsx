import React, { useCallback, useState, useMemo } from 'react';

import { Stack, Box, Divider, Chip, Link } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

function Navbar() {
  const handleClick = () => {};
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
      <Link href="/" underline={'none'} className="text">
        <Chip label="Home" onClick={handleClick} />
      </Link>{' '}
      <Link href="/SwipeablePage" underline={'none'} className="text">
        <Chip label="SwipeablePage" onClick={handleClick} />
      </Link>
      <Link href="/EndlessScroll" underline={'none'} className="text">
        <Chip label="EndlessScroll" onClick={handleClick} />
      </Link>
      <Link href="/FightPage" underline={'none'} className="text">
        <Chip label="FightPage" onClick={handleClick} />
      </Link>
      <Link href="/StreetLightXstate" underline={'none'} className="text">
        <Chip label="StreetLightXstate" onClick={handleClick} />
      </Link>
    </Box>
  );
}

export default Navbar;
