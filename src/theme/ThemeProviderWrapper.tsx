// ThemeProviderWrapper.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from 'theme/theme';
import { ReactNode, useMemo, useState } from 'react';

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
