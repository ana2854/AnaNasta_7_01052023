import { createBrowserRouter, Navigate } from "react-router-dom"

//import {Routes, route } from "react-router-dom"
//import { NavLayout } from "./Nav/NavLayout"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
//import { PostList } from "./pages/PostList"
//import PrivateRoutes from "./utils/PrivateRoutes";
//import { Post } from './pages/Post';
// import { UserAccount } from './pages/UserAccount';
// import { UserProfil } from './pages/UserProfil';

export const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/login" replace={true} />, 
  },
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])
