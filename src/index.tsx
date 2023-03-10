import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import ThemeProvider from './Theme';
import GlobalStateProvider from 'components/GlobalStateProvider';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/fonts.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStateProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalStateProvider>
  </StrictMode>
);
