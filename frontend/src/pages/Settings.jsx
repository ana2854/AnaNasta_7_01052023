import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export function Settings() {
  const navigate = useNavigate();
  
  // se déconnecter
  function handleLogout() {
    //effacer données local storage
    localStorage.removeItem('userAuth');

    axios.defaults.headers.common["Authorization"] = null;

    // rediriger vers la page login
    navigate('/login');
  }

  return (
    <main>
      <div className="wrapper-settings">
      <h1>Paramètres</h1>
      <h2>Déconnexion</h2>
      
      <button className="btn-logout" onClick={handleLogout}> <FaArrowRightFromBracket/>Me déconnecter</button>
      </div>
    </main>
  );
}

 
