import type { PaletteMode } from '@mui/material';
import { colors } from './colors';

export const darkPalette = {
  mode: 'dark' as PaletteMode,

  primary: {
    main: colors.white,
    dark: colors.middleGrey,
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
    default: colors.darkGrey,
    paper: colors.darkGrey,
  },
  text: {
    primary: colors.white,
    secondary: colors.veryLightGrey,
  },
  action: {
    hover: colors.veryDarkGrey,
  },
  divider: colors.middleGrey,
};
