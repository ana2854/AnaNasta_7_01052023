import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"

import "../styles.css"
import { getItem } from "../utils/LocalStorage"

import { FaCircleUser} from "react-icons/fa6";
import { FaHouse} from "react-icons/fa6";
import { FaGear} from "react-icons/fa6";

export function NavLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  
  const authToken = getItem("userAuth")
  const {userId} = authToken
  

  return (
    <>
      <div className="wrapper-content">
        <header className="header-nav">
          <nav className="top-nav">
            <div className="nav-title">Groupomania</div>
            <ul className="nav-list">
              <li>
                <Link to={`/posts`} title="Posts"><FaHouse className="nav-icon"/>Posts</Link>
              </li>
              <li>
                <Link to={`/profile/${userId}`} title="Mon profil"> <FaCircleUser className="nav-icon"/>Profil</Link>
              </li>
              <li>
                <Link to={`/settings`} title="Paramètres"><FaGear className="nav-icon"/>Paramètres</Link>
              </li>
            </ul>
          </nav>
        </header>
        <ScrollRestoration />
        {/*SPINNER */}
        {isLoading && (
          <div className="loading-spinner">
            
          </div>
        )}

        {/*CONTAINER */}
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1></h1>
          <Outlet />
        </div>
      </div>
    </>
  )
}
