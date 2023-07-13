/*
import { useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "./LocalStorage";
import { baseApi } from '../api/base'; 

const PrivateRoutes = () => {
  const authToken = getItem("userAuth");

  useEffect(() => {
    const storedAuth = getItem("userAuth");

    if (storedAuth) {
      const { token } = storedAuth;
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);  // Empty dependencies array, so it runs only once on component mount

  if (!authToken) {
    // user not authenticated
    return <Navigate to="/login" />;
  }

  // Access ok, user authenticated
  return <Outlet />;
};

export default PrivateRoutes;
*/

import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getItem } from './LocalStorage';
import { baseApi } from '../api/base';

const PrivateRoutes = () => {
  console.log('PrivateRoutes component rendering...'); // Logging component rendering

  const authToken = getItem('userAuth');
  console.log('Auth token:', authToken); // Logging the authentication token

  useEffect(() => {
    console.log('useEffect callback private routes running...'); // Logging useEffect callback execution

    const storedAuth = getItem('userAuth');
    console.log('Stored authentication private routes:', storedAuth); // Logging the stored authentication object

    if (storedAuth) {
      const { token } = storedAuth;
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Private routes Authorization header set:', `Bearer ${token}`); // Logging the authorization header
    }
  }, []);

  if (!authToken) {
    console.log('private routes User not authenticated. Redirecting to login...'); // Logging unauthenticated user

    return <Navigate to="/login" />;
  }

  console.log('Private routes User authenticated. Rendering nested routes...'); // Logging authenticated user

  return <Outlet />;
};

export default PrivateRoutes;
