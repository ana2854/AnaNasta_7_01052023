import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import "../styles.css"

export function NavLayout({ userId }) {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <div className="wrapper-content">
        <header className="header-nav">
          <nav className="top-nav">
            <div className="nav-title">Groupomania</div>
            <ul className="nav-list">
              <li>
                <Link to={`/posts/${userId}`}>Posts</Link>
              </li>
              <li>
                <Link to={`/profile/${userId}`}>Profil</Link>
              </li>
              <li>
                <Link to={`/userAccount/${userId}`}>Paramètres</Link>
              </li>
            </ul>
          </nav>
        </header>
        <ScrollRestoration />
        {/*SPINNER */}
        {isLoading && (
          <div className="loading-spinner">
            <ClipLoader color="red" loading={true} />
          </div>
        )}

        {/*CONTAINER */}
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1>Welcome home</h1>
          <Outlet />
        </div>
      </div>
    </>
  )
}
