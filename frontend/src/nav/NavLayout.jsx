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
            <Link className="top-nav-title" to="/posts">
              {" "}
              <FaHouse className="nav-icon-house" /> Accueil
            </Link>
            <ul className="nav-list">
              <li>
                <Link to={`/posts`} title="Posts">
                  <FaHouse className="nav-icon" />{" "}
                  <span className="nav-text">Posts</span>
                </Link>
              </li>
              <li>
                <Link to={`/profile/${userId}`} title="Mon profil">
                  {" "}
                  <FaCircleUser className="nav-icon" />
                  <span className="nav-text">Profil</span>
                </Link>
              </li>
              <li>
                <Link to={`/settings`} title="Paramètres">
                  <FaGear className="nav-icon" />
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
