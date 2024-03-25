import React from 'react';
import './PrivateRoute.css';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCredentials } from '../../slices/userAuthSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);
  

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;