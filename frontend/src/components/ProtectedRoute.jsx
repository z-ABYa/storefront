import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user?.is_staff) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
