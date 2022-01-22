import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useSelector(state => state.auth);
  const location = useLocation();
  // Redirect them to the /login page, but save the current location
  return authenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
export default PrivateRoute;
