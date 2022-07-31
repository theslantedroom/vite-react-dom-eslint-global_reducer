import type { Components, Theme } from '@mui/material';

export const components: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '4px',
      },
    },
  },
};
