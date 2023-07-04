import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <h1>Mon compte</h1>
      
      <button className="btn-logout" onClick={handleLogout}>Me déconnecter</button>
      </div>
    </main>
  );
}

 
