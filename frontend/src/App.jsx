//import { Login } from './pages/Login'
//import './styles.css'

import { AccountUser } from "./pages/AccountUser"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/home"

export default function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/login":
      component = <Login />
      break
    case "/register":
      component = <Register />
      break
    case "/accountUser":
      component = <AccountUser />
      break
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/accountUser">Account user</a>
          </li>
        </ul>
      </nav>
      {component}
    </>
  )
}
