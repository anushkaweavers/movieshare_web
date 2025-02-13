import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector(state => state.user.user);

  console.log("Checking ProtectedRoute:", user); // Debugging state

  // Ensure user state updates correctly after logout
  if (!user || !user._id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
