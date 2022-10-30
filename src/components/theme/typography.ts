import type { TypographyOptions } from '@mui/material/styles/createTypography';

const fontWeight300 = 300;
const fontWeight400 = 400;

const fontFamily = ['Cinzel', 'Open Sans', 'sans-serif'].join(',');

export const typography: TypographyOptions = {
  fontFamily,
  h1: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 48,
    textAlign: 'center',
  },
  h2: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 36,
    textAlign: 'center',
  },
  h3: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 24,
    textAlign: 'center',
  },
  h4: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 20,
    textAlign: 'center',
  },
  h5: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 18,
    textAlign: 'center',
  },
  h6: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle1: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 14,
    textAlign: 'center',
  },
  subtitle2: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 14,
    textAlign: 'center',
  },
  body1: {
    fontFamily,
    fontSize: 14,
    fontWeight: fontWeight400,
  },
  body2: {
    fontFamily,
    fontSize: 12,
    fontWeight: fontWeight400,
  },
  button: {
    fontFamily,
    fontSize: 14,
    fontWeight: fontWeight400,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily,
    fontSize: 10,
    fontWeight: fontWeight400,
    textAlign: 'center',
  },
  overline: {
    fontFamily,
    fontSize: 10,
    fontWeight: fontWeight400,
  },
};
