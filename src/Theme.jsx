import React, { useEffect, useMemo } from 'react';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

const BetterRipple = withStyles((theme) => ({
  '@global': {
    '.MuiTouchRipple-rippleVisible': {
      animation: `MuiTouchRipple-keyframes-enter ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeOut}`,
    },
  },
}))(() => null);

const metaThemeColor = document.querySelector('meta[name=theme-color]');

const Theme = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          // Set colors to normal/lighter variants, based on system dark theme setting
          primary: { main: prefersDarkMode ? '#a4abff' : '#304ffe' },
          secondary: { main: prefersDarkMode ? '#ffa689' : '#ff4205' },
          // Set app theme to light/dark based on system dark theme setting
          type: prefersDarkMode ? 'dark' : 'light',
        },
        shape: { borderRadius: 16 },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    metaThemeColor.setAttribute(
      'content',
      prefersDarkMode ? theme.palette.grey[900] : theme.palette.primary.main
    );
  }, [prefersDarkMode, theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BetterRipple />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
