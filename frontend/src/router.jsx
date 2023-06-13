import { AccountUser } from "./pages/AccountUser"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"

import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/:id", element: <Home /> },
  { path: "/accountUser", element: <AccountUser /> },
])
