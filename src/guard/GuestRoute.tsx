import { tokenManager } from 'helpers/utils';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import paths from 'routes/path';

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const token = tokenManager.getAccessToken();
  if (token) {
    return <Navigate to={paths.default} />;
  }
  return <>{children}</>;
};

export default GuestRoute;
