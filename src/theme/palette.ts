import { alpha, PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { blue, green, grey, magneta, orange, red } from './colors';

declare module '@mui/material/styles' {
  interface GradientOptions {
    [key: string]: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    gradients?: GradientOptions;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: PaletteGradients;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface PaletteGradients {
    blueGradient: string;
    whiteGradient: string;
    whiteCardGradient: string;
    bgGradient: string;
  }
}

const lightPalette: PaletteOptions = {
  action: {
    active: grey[500],
    hover: alpha(grey[600], 0.13),
    selected: grey[100],
    disabled: grey[400],
    disabledBackground: grey[200],
    focus: grey[300],
    hoverOpacity: 0.05,
  },
  background: { paper: grey[50] },
  neutral: {
    light: blue[100],
    main: grey[600],
    dark: grey[800],
    contrastText: '#ffffff',
  },
  primary: {
    lighter: blue[200],
    light: blue[300],
    main: blue[500],
    dark: blue[800],
    darker: blue[900],
    contrastText: '#ffffff',
  },
  secondary: {
    lighter: magneta[100],
    main: magneta[500],
    contrastText: magneta[50],
  },
  error: { main: red[500] },
  warning: {
    light: orange[100],
    main: orange[500],
    dark: orange[700],
    contrastText: '#ffffff',
  },
  success: {
    lighter: green[50],
    light: green[300],
    main: green[500],
    dark: green[700],
    darker: green[800],
  },

  grey,
  text: {
    primary: blue[900],
    secondary: blue[200],
    disabled: blue[50],
  },
  divider: grey[100],
  gradients: {
    blueGradient: `linear-gradient(to top right, ${blue[700]} 30%, ${blue[600]})`,
    whiteGradient: 'linear-gradient(to bottom, rgba(255, 255, 255, .1) 0%, transparent)',
    whiteCardGradient:
      'linear-gradient(to bottom right, rgba(255, 255, 255, 0.15) 0%, transparent)',
    bgGradient: 'linear-gradient(to right bottom, #f9fafb, #E6EFF5)',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  action: {
    active: grey[300],
    hover: alpha(grey[100], 0.1),
    selected: grey[800],
    disabled: grey[600],
    disabledBackground: grey[700],
    focus: grey[500],
    hoverOpacity: 0.08,
  },
  background: {
    paper: '#1e293b', // dark surface
    default: '#0f172a', // body background
  },
  neutral: {
    light: grey[600],
    main: grey[300],
    dark: grey[100],
    contrastText: '#ffffff',
  },
  primary: {
    lighter: blue[700],
    light: blue[600],
    main: blue[500],
    dark: blue[500],
    darker: blue[300],
    contrastText: '#ffffff',
  },
  secondary: {
    lighter: magneta[100],
    main: magneta[400],
    contrastText: magneta[50],
  },
  error: { main: red[500] },
  warning: {
    light: orange[200],
    main: orange[400],
    dark: orange[600],
    contrastText: '#ffffff',
  },
  success: {
    lighter: green[200],
    light: green[400],
    main: green[500],
    dark: green[700],
    darker: green[800],
  },
  grey,
  text: {
    primary: '#F1F5F9',
    secondary: grey[400],
    disabled: grey[600],
  },
  divider: grey[700],
  gradients: {
    blueGradient: `linear-gradient(to top right, ${blue[800]} 30%, ${blue[600]})`,
    whiteGradient: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent)',
    whiteCardGradient:
      'linear-gradient(to bottom right, rgba(255, 255, 255, 0.08) 0%, transparent)',
    bgGradient: 'linear-gradient(to right bottom, #1e293b, #0f172a)',
  },
};

export { lightPalette, darkPalette };
