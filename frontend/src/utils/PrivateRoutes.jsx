import { Outlet, Navigate } from "react-router-dom"
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
