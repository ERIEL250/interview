import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ role, children }) {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
