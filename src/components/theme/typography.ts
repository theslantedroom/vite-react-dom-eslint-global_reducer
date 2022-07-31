import type { TypographyOptions } from '@mui/material/styles/createTypography';

const fontWeight300 = 300;
const fontWeight400 = 400;

const fontFamily = ['Open Sans', 'sans-serif'].join(',');

export const typography: TypographyOptions = {
  fontFamily,
  h1: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 82,
  },
  h2: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 59,
  },
  h3: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 47,
  },
  h4: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 33,
  },
  h5: {
    fontFamily,
    fontWeight: fontWeight300,
    fontSize: 24,
  },
  h6: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 20,
  },
  subtitle1: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 14,
  },
  subtitle2: {
    fontFamily,
    fontWeight: fontWeight400,
    fontSize: 14,
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
    fontSize: 12,
    fontWeight: fontWeight400,
  },
  overline: {
    fontFamily,
    fontSize: 10,
    fontWeight: fontWeight400,
  },
};
