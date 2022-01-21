import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  // const location = useLocation();
  // to handle redirect location
  // let from = location.state?.from?.pathname || '/';
  const { authenticated } = useSelector(state => state.auth);
  return authenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
