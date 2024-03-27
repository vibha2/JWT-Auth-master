import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PrivateRoute.css';
import UserProfilePage from '../UserProfilePage/UserProfilePage';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <UserProfilePage /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
