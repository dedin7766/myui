// src/theme/theme.ts

import { lightColors, darkColors } from './colors';

export const theme = {
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  fontFamily: {
    thin: 'Lexend-Thin',
    extraLight: 'Lexend-ExtraLight',
    light: 'Lexend-Light',
    regular: 'Lexend-Regular',
    medium: 'Lexend-Medium',
    semiBold: 'Lexend-SemiBold',
    bold: 'Lexend-Bold',
    extraBold: 'Lexend-ExtraBold',
    black: 'Lexend-Black',
  },
  textVariants: {
    header: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
  },
};

export const lightTheme = {
  ...theme,
  colors: lightColors,
};

export const darkTheme = {
  ...theme,
  colors: darkColors,
};