import { tokenManager } from 'helpers/utils';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import paths from 'routes/path';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = tokenManager.getAccessToken();
  if (!token) {
    return <Navigate to={paths.login} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
