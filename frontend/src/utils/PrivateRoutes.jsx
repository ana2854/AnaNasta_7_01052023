import { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { getItem } from "./LocalStorage"

const PrivateRoutes = () => {
  const storedAuth = getItem("userAuth")

  useEffect(() => {
    if (storedAuth) {
      const { token } = storedAuth
      console.log("Token:", token)
    }
  }, [storedAuth])

  if (!storedAuth) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateRoutes
