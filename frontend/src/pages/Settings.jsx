import { useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { baseApi } from "../api/base"

export function Settings() {
  const navigate = useNavigate()

  // se déconnecter
  function handleLogout() {
    //effacer données local storage
    localStorage.removeItem("userAuth")

    baseApi.defaults.headers.common["Authorization"] = null

    // rediriger vers la page login
    navigate("/login")
  }

  return (
    <main>
      <div className="wrapper-settings">
        <h1>Paramètres</h1>
        
        <div className="content-settings">
          <button className="btn-logout" onClick={handleLogout}>
            {" "}
            <FaArrowRightFromBracket /> <span>Me déconnecter</span> 
          </button>
        </div>
      </div>
    </main>
  )
}
