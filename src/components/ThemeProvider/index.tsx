import { ReactNode, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

const metaThemeColor = document.querySelector('meta[name=theme-color]');

const appTheme = (prefersDarkMode: boolean) =>
  createTheme({
    palette: {
      // Set colors to normal/lighter variants, based on system dark theme setting
      primary: { main: prefersDarkMode ? '#a4abff' : '#304ffe' },
      secondary: { main: prefersDarkMode ? '#ffa689' : '#ff4205' },
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
