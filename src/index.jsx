import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import ThemeProvider from './Theme';
import { GlobalStatesProvider } from './globalStates';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStatesProvider>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </GlobalStatesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
