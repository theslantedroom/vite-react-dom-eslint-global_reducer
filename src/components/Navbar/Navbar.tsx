import React, { useCallback, useState, useMemo } from 'react';

import { Stack, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Box className="box">
      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={0}>
        <Link to="/" className="text">
          Home
        </Link>

        <Link to="/boxing" className="text">
          Boxing Game
        </Link>

        <Link to="/mobileWrapper" className="text">
          Mobile
        </Link>
      </Stack>
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}

export default Navbar;
