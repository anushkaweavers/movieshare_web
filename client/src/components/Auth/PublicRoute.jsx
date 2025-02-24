import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector(state => state.user.user);

  console.log("Checking PublicRoute:", user); // Debugging state

  return user && user._id ? <Navigate to="/community" replace /> : <Outlet />;
};

export default PublicRoute;
