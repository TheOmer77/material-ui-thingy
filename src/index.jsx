import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ThemeProvider from './Theme';
import { GlobalStatesProvider } from './globalStates';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStatesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalStatesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
