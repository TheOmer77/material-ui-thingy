import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ThemeProvider from './Theme';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
