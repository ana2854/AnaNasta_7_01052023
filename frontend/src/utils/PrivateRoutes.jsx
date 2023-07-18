import { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { getItem } from "./LocalStorage"

const PrivateRoutes = () => {
  const storedAuth = getItem("userAuth")

  console.log("storedAuth:", storedAuth)

  useEffect(() => {
    if (storedAuth) {
      const { token } = storedAuth
      console.log("Token:", token)
    }
  }, [storedAuth]) // run effect whenever authToken changes

  console.log("Running effect...")

  if (!storedAuth) {
    console.log("No storedAuth, navigating to /login...")
    return <Navigate to="/login" />
  }

  console.log("Returning <Outlet />...")
  return <Outlet />
}

export default PrivateRoutes
