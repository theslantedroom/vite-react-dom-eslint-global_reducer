import React from 'react';
import { Box } from '@mui/material';

// Providers
import { MuiThemeProvider } from '../src/components/theme/MuiThemeProvider';


export const decorators = [
  (Story) => {
    const [optionalMode, setOptionalMode] = React.useState('dark');
    if (!optionalMode) return null;

    return (
      <>
        <button
          style={{
            position: 'absolute',
            left: 4,
            bottom: 4,
            cursor: 'pointer',
            zIndex: 10e6, // display in front of all MUI components
          }}
          onClick={() => setOptionalMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
        >
          Toggle Theme
        </button>
        <MuiThemeProvider optionalMode={optionalMode}>
              <Box
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh',
                  display: 'flex',
                }}
              >
                {Story()}
              </Box>
        </MuiThemeProvider>
      </>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'center',
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: false,
  },
};
