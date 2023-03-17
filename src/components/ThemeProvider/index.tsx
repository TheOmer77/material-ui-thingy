import { ReactNode, useEffect, useMemo } from 'react';
import {
  createTheme,
  hexToRgb,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import COLORS from 'constants/colors';
import { getNeutralVariant } from 'utils/colorUtils';

const ELEVATION_VALUES = [
  0, 0.05, 0.07, 0.08, 0.09, 0.1, 0.11, 0.11, 0.12, 0.12, 0.13, 0.13, 0.14,
  0.14, 0.14, 0.14, 0.15, 0.15, 0.15, 0.15, 0.16, 0.16, 0.16, 0.16, 0.16,
];

const metaThemeColor = document.querySelector('meta[name=theme-color]');

const appTheme = (prefersDarkMode: boolean) => {
  const palette = {
    // Set colors to normal/lighter variants, based on system dark theme setting
    primary: { main: COLORS.primary[prefersDarkMode ? 80 : 45] },
    secondary: { main: COLORS.secondary[prefersDarkMode ? 80 : 55] },
    success: {
      main: COLORS.success[prefersDarkMode ? 90 : 60],
      contrastText: !prefersDarkMode ? 'white' : 'black',
    },
    warning: { main: COLORS.warning[prefersDarkMode ? 90 : 80] },
    error: { main: COLORS.error[prefersDarkMode ? 80 : 55] },
    info: { main: COLORS.info[prefersDarkMode ? 90 : 60] },
    background: {
      default: prefersDarkMode ? getNeutralVariant(COLORS.primary[5]) : '#fff',
      paper: prefersDarkMode ? getNeutralVariant(COLORS.primary[5]) : '#fff',
    },
    // Set app theme to light/dark based on system dark theme setting
    mode: prefersDarkMode ? 'dark' : 'light',
  } as const;

  return createTheme({
    palette,
    shape: { borderRadius: 16 },
    components: {
      // Make the ripple animation faster
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '& > .MuiTouchRipple-root > .MuiTouchRipple-rippleVisible': {
              animationDuration: '250ms',
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          ...([...Array(24).keys()] as const).reduce(
            (obj, key) => ({
              ...obj,
              [`elevation${key + 1}`]: {
                backgroundImage: `linear-gradient(rgba(${hexToRgb(
                  palette.primary.main
                ).replaceAll(/(rgb\(|\))/g, '')}, ${
                  ELEVATION_VALUES[key + 1]
                }), rgba(${hexToRgb(palette.primary.main).replaceAll(
                  /(rgb\(|\))/g,
                  ''
                )}, ${ELEVATION_VALUES[key + 1]}))`,
              },
            }),
            {}
          ),
        },
      },
      MuiCard: { styleOverrides: { root: { boxShadow: 'none' } } },
      MuiAppBar: {
        styleOverrides: {
          colorTransparent: {
            boxShadow: 'none',
            backgroundImage: 'none',
            transition: 'none',
          },
        },
      },
    },
  });
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => appTheme(prefersDarkMode), [prefersDarkMode]);

  useEffect(() => {
    metaThemeColor?.setAttribute(
      'content',
      prefersDarkMode ? theme.palette.grey[900] : theme.palette.primary.main
    );
  }, [prefersDarkMode, theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
