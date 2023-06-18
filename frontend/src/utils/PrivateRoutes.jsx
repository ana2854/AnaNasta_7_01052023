import { Outlet, Navigate } from "react-router-dom";
import { getItem } from "./LocalStorage";

const PrivateRoutes = () => {
  const user = getItem("userIds");

  if (!user || !user.userId || !user.token) {
    //si ids pas présent alors retour login
    return <Navigate to="/login" />;
  }

  //acces au contenu protégé
  return <Outlet />;
};

export default PrivateRoutes;
