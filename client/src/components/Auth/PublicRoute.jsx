import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const user = useSelector(state => state.user.user); 

  return user && user._id ? <Navigate to="/list" replace /> : <Outlet />;
};

export default PublicRoute;
