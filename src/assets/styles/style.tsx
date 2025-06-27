// root/assets/styles/style.js
import { Platform } from 'react-native';

export const commonColors = {
  primary: '#00a0a0',
  lightText: '#ffffff',
  darkText: '#333333',
  inactive: 'gray',
};

export const lightTheme = {
  backgroundColor: '#FFFFFF',
  headerBackground: commonColors.primary,
  headerText: commonColors.lightText,
  tabBar: {
    backgroundColor: '#FFFFFF',
    activeTint: commonColors.primary,
    inactiveTint: commonColors.inactive,
  },
  qiblaScreen: {
    background: '#E0F7FA',
    titleColor: '#00796B',
    descriptionColor: '#4CAF50',
  },
};

export const darkTheme = {
  backgroundColor: '#000000',
  headerBackground: '#111111',
  headerText: commonColors.lightText,
  textColor: '#FFFFFF',
  tabBar: {
    backgroundColor: '#1e1e1e',
    activeTint: '#00d0d0',
    inactiveTint: '#888888',
  },
  qiblaScreen: {
    background: '#000000',
    titleColor: '#00e0d0',
    descriptionColor: '#b2dfdb',
  },
};

export const headerStyleBase = {
  ...Platform.select({
    ios: {
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    android: {
      elevation: 0,
    },
  }),
};
