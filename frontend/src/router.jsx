import { Navigate, createBrowserRouter } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import PrivateRoutes from "./utils/PrivateRoutes"
import { NavLayout } from "./nav/NavLayout"
import { postListRoute } from "./pages/PostList"
import { postRoute } from "./pages/Post"
import { userProfileRoute } from "./pages/Profile"

import ErrorPage from "./utils/ErrorPage"

import { Settings} from "./pages/Settings"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
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
                    ...postListRoute,
                  },
                  { path: ":postId", ...postRoute },
                ],
              },
              {
                path: "profile/:userId",
                children: [{ index: true, ...userProfileRoute }],
              },

              {
                path: "settings",
                children: [{ index: true, element: <Settings/> }],
              },
               

              { path: "*", element: <h1>404 - Page Not Found</h1> },
            ],
          },
        ],
      },
    ],
  },
])
