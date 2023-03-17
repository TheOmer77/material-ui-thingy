import { ReactNode, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

import COLORS from 'constants/colors';
import { getNeutralVariant } from 'utils/colorUtils';

const metaThemeColor = document.querySelector('meta[name=theme-color]');

const appTheme = (prefersDarkMode: boolean) =>
  createTheme({
    palette: {
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
        default: prefersDarkMode
          ? getNeutralVariant(COLORS.primary[5])
          : '#fff',
        paper: prefersDarkMode
          ? getNeutralVariant(COLORS.primary[10])
          : getNeutralVariant(COLORS.primary[95]),
      },
      // Set app theme to light/dark based on system dark theme setting
      mode: prefersDarkMode ? 'dark' : 'light',
    },
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

      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          colorTransparent: { boxShadow: 'none', transition: 'none' },
        },
      },
    },
  });

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
