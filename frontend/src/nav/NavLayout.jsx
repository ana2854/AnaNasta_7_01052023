import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"

import "../styles.css"
import { getItem } from "../utils/LocalStorage"

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
                <Link to={`/posts`}>Posts</Link>
              </li>
              <li>
                <Link to={`/profile/${userId}`}>Profil</Link>
              </li>
              <li>
                <Link to={`/settings`}>Paramètres</Link>
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
