import { createBrowserRouter } from "react-router-dom"
import { NavLayout } from "./Nav/NavLayout"

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PostList } from "./pages/PostList"
import PrivateRoutes from "./utils/PrivateRoutes";
//import { Post } from './pages/Post';
// import { UserAccount } from './pages/UserAccount';
// import { UserProfil } from './pages/UserProfil';

export const router = createBrowserRouter([
  
    {
      path: "/",
      children: [
        {
        
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
           
            {
              path: "posts:userId",
              element: <NavLayout />, 
              children: [
                { path: "posts:userId", element: <PrivateRoutes component={PostList} /> },
              ],
            },
          ],
        },
      ],
    },
  
])

