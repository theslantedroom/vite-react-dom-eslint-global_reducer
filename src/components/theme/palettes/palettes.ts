import { colors } from './colors';
import { darkPalette } from './darkPalette';
import { lightPalette } from './lightPalette';

// custom components
import { webLightPaletteComponents } from './webLightPaletteComponents';
import { webDarkPaletteComponents } from './webDarkPaletteComponents';

const palettes = {
  dark: darkPalette,
  light: lightPalette,
};

const webPaletteComponents = {
  dark: webDarkPaletteComponents,
  light: webLightPaletteComponents,
};

export const getPalette = (mode: 'dark' | 'light') => ({
  ...palettes[mode],
  sw: colors,
  components: webPaletteComponents[mode],
});
