import { Navigate, createBrowserRouter } from "react-router-dom"
// import { useRouteError } from "react-router-dom"

//import {Routes, route } from "react-router-dom"
//import { NavLayout } from "./Nav/NavLayout"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
// import { postListRoute } from "./pages/PostList"
//import PrivateRoutes from "./utils/PrivateRoutes";
//import { Post } from "./pages/Post"
//import { Settings} from "./pages/Settings"
// import { NavLayout } from "./Nav/NavLayout"
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


/*
export const router = createBrowserRouter([

  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "navLayout",
        element: <navLayout />,
      },
      {
        path: "about",
        element: <About />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />
  },
];

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
*/