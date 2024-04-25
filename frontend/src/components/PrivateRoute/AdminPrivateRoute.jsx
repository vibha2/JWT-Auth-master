import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PrivateRoute.css';
import AdminPage from '../AdminPage/AdminPage';

const AdminPrivateRoute = () => {
  const { userAccountType } = useSelector((state) => state.auth);
  return userAccountType === "Admin" ? <AdminPage /> : <Navigate to='/login' replace />;
};
export default AdminPrivateRoute;
