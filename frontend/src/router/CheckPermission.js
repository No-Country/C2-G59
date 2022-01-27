import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckPermission = ({ permission = null, children }) => {
  const {
    user: { role },
  } = useSelector(state => state.auth);

  // sino requiere permiso dejar pasar 😅
  if (!permission) return children;

  // comprobamos permiso
  let hasPermission = false;

  permission.forEach(item => {
    if (role !== item) {
      console.log('AUTORIZADO -> tiene permiso para entrar aca');
      return <Navigate to="/" />;
    } else {
      console.log('NO -> No tiene permiso para entrar aca');
      return children;
    }
  });

  return hasPermission ? children : <Navigate to="/" />;
};

export default CheckPermission;
