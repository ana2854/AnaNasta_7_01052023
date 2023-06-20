import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "./LocalStorage";
import { useParams } from "react-router-dom";


const PrivateRoutes = () => {
  const authToken = getItem("userAuth");
  const userIdUrl = useParams();

  if (!authToken && !userIdUrl) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // Access the protected content
  return <Outlet />;
};

export default PrivateRoutes;
