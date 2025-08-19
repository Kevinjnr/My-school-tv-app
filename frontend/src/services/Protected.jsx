import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return <>{children}</>;
}
