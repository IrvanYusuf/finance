import { CssBaseline } from '@mui/material';
import BreakpointsProvider from 'providers/useBreakpoints';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router';
import './index.css';
import ThemeProviderWrapper from 'theme/ThemeProviderWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <BreakpointsProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </BreakpointsProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>,
);
