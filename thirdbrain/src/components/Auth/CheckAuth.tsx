
import { Navigate, useLocation } from "react-router-dom";

interface CheckAuthProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}
const CheckAuth:React.FC<CheckAuthProps> = ({ isAuthenticated, children }) => {
  const location = useLocation();

  // Redirect authenticated users away from signin/signup pages
  if (isAuthenticated && (location.pathname === "/auth/signin" || location.pathname === "/auth/signup")) {
    return <Navigate to="/" replace />;
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && location.pathname !== "/auth/signin" && location.pathname !== "/auth/signup") {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the children components if conditions are met
  return children;
};

export default CheckAuth;
