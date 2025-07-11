import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Outlet />
      <Toaster richColors />
    </LocalizationProvider>
  );
};

export default App;
