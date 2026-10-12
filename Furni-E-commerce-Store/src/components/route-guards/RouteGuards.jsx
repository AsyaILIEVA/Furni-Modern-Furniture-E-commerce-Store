import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Only logged-in users can access these pages
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Only guests can access Login and Register
export function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}