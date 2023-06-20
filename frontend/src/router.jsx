import { Navigate, createBrowserRouter } from "react-router-dom"
import { useRouteError } from "react-router-dom"

//import {Routes, route } from "react-router-dom"
//import { NavLayout } from "./Nav/NavLayout"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { PostList } from "./pages/PostList"
//import PrivateRoutes from "./utils/PrivateRoutes";
import { Post } from './pages/Post';
import { UserAccount } from "./pages/UserAccount"
import { NavLayout } from "./Nav/NavLayout"
// import { UserProfil } from './pages/UserProfil';

/*
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
  
])*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                element: <PostList />,
              },
              {path :  ":postId", 
               element : <Post/>,
              },
            ],
          },

          {
            path: "accountUser",
            element: <UserAccount />,
          },
        ],
      },
    ],
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

function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}
