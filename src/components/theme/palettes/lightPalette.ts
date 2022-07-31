import type { PaletteMode } from '@mui/material';
import { colors } from './colors';

export const lightPalette = {
  mode: 'light' as PaletteMode,

  primary: {
    main: colors.black,
    dark: colors.veryDarkGrey,
  },
  secondary: {
    main: colors.red,
  },
  error: {
    main: colors.red,
  },
  success: {
    main: colors.darkGreen,
  },
  background: {
    default: colors.white,
    paper: colors.white,
  },
  text: {
    primary: colors.black,
    secondary: colors.darkGrey,
  },
  action: {
    hover: colors.veryLightGrey,
  },
  divider: colors.middleGrey,
};
