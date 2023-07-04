/*import { Outlet, Navigate } from "react-router-dom"
import { getItem } from "./LocalStorage"

const PrivateRoutes = () => {
  const authToken = getItem("userAuth")

  if (!authToken) {
    // user non connecté
    return <Navigate to="/login" />
  }

  // accès ok , user identifié
  return <Outlet />
}

export default PrivateRoutes
*/

/*
import { useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import {getItem} from "./LocalStorage";
import { baseApi } from '../api/base'; // Update with your actual import

const PrivateRoutes = () => {
  const authToken = getItem("userAuth");

  useEffect(() => {
    if (authToken) {
      baseApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
  }, [authToken]);  // Dependencies array includes authToken, so it will run whenever authToken changes

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
import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "./LocalStorage";
import { baseApi } from '../api/base'; // Update with your actual import

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
