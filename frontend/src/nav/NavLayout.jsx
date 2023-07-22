import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"

import "../styles.css"
import { getItem } from "../utils/LocalStorage"
import { FaCircleUser } from "react-icons/fa6"
import { FaHouse } from "react-icons/fa6"
import { FaGear } from "react-icons/fa6"
import logo from "../logo/groupomania-logoBW.svg"

export function NavLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  const authToken = getItem("userAuth")
  const { userId } = authToken

  return (
    <>
      <div className="wrapper-content">
        <header className="header-nav">
          <nav className="top-nav">

         
            <Link className="top-nav-logo" to="/posts">
              {" "}
              <img src={logo} className="nav-logo-layout" alt="logo de l'entreprise Groupomania" />
            </Link>
            

            <ul className="nav-list">
              <li>
                <Link to={`/posts`} aria-label="Accéder aux posts">
                  <FaHouse className="nav-icon" aria-hidden="true"/>{" "}
                  <span className="nav-text">Posts</span>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${userId}`} aria-label="Accéder à mon profil">
                  {" "}
                  <FaCircleUser className="nav-icon" aria-hidden="true"/>
                  <span className="nav-text">Profil</span>
                </Link>
              </li>
              <li>
                <Link to={`/settings`} aria-label="Accéder aux paramètres">
                  <FaGear className="nav-icon" aria-hidden="true"/>
                  <span className="nav-text">Paramètres</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <ScrollRestoration />
        {isLoading && <div className="loading-spinner"></div>}
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
