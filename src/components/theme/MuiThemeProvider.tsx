/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useEffect,
  useMemo,
  useContext,
  useState,
  createContext,
} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { PaletteMode } from '@mui/material';
import { useMediaQuery } from '@mui/material';

// Custom Theme
import { getPalette } from './palettes/palettes';
import { typography } from './typography';
import { components } from './components';

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const shape = {
  borderRadius: 4,
};

const PaletteModeContext = createContext({ togglePaletteMode: () => {} });
export const usePaletteModeContext = () => useContext(PaletteModeContext);

interface Props {
  optionalMode?: PaletteMode;
  children: React.ReactNode;
}

export const MuiThemeProvider: React.FC<Props> = ({
  optionalMode,
  children,
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? 'dark' : 'light'
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: getPalette(optionalMode ? optionalMode : mode),
        typography,
        components,
        breakpoints,
        shape,
      }),
    [mode, optionalMode]
  );

  const togglePaletteMode = () => {
    setMode((prevMode: PaletteMode) => {
      const mode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mui-theme-mode', mode);
      return mode;
    });
  };

  useEffect(() => {
    const mode = localStorage.getItem('mui-theme-mode');
    if (mode === 'light' || mode === 'dark') setMode(mode);
  }, []);

  return (
    <PaletteModeContext.Provider value={{ togglePaletteMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PaletteModeContext.Provider>
  );
};

// Export themes for Storybook.
export const darkTheme = createTheme({
  palette: getPalette('dark'),
  typography,
  components,
  breakpoints,
  shape,
});

export const lightTheme = createTheme({
  palette: getPalette('light'),
  typography,
  components,
  breakpoints,
  shape,
});
