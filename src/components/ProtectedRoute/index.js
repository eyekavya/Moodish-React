import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader2 className="w-5 h-5 animate-spin" />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
