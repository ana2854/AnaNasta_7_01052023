import { Link, Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "../styles.css"

export function NavLayout({userId}) {

  const {state} = useNavigation()
  const isLoading = state === "loading"



  return (
    <>
    <header className="header-nav">
      <nav className="top-nav">
        <div className="nav-title">Groupomania</div>
        <ul className="nav-list">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/profile/:userId">Mon profil</Link>
          </li>
          <li>
            <Link to={`/userAccount/${userId}`}>Mon compte</Link>
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
    <div className={`container ${isLoading ? 'loading' : ''}`}>
      <h1>inside tsfksmlfksmdkfmslkf div</h1>
        <Outlet />
      </div>
    </>
  );
}


