import { useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { baseApi } from "../api/base"

export function Settings() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("userAuth")

    delete baseApi.defaults.headers.common["Authorization"]
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
