import React, { useEffect, useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

const metaThemeColor = document.querySelector('meta[name=theme-color]');

const Theme = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: { main: '#304ffe' },
          secondary: { main: '#ff3d00' },
          // Set app theme to light/dark based on system dark theme setting
          type: prefersDarkMode ? 'dark' : 'light',
        },
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
      {children}
    </ThemeProvider>
  );
};

export default Theme;
