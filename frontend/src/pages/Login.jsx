import { useState } from "react"
import logo from "../image/groupomania-logoBW.svg"
import "../styles.css"
import { checkEmail, checkPassword } from "../validation"
import { baseApi } from "../api/base"
import { Link } from "react-router-dom"
import { setItem } from "../utils/LocalStorage"
import { useNavigate } from "react-router-dom"


export function Login() {
  const navigate = useNavigate()
  //variables email&password qui vont changer d'é<tabgfb></tabgfb>t
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [authUserError, setAuthUserError] = useState("")

  //fonction onSubmit de react pour gérer l'envoi des datas
  function onSubmit(e) {
    e.preventDefault()

    const emailResults = checkEmail(email)
    const passwordResults = checkPassword(password)

    console.log("Email Results:", emailResults);
    console.log("Password Results:", passwordResults);

    setEmailErrors(emailResults)
    setPasswordErrors(passwordResults)

    if (emailResults.length === 0 && passwordResults.length === 0) {
      console.log("sending login request");
      baseApi
        .post("/api/auth/login", {
          email,
          password,
        }) 
        .then((res) => {
          console.log("Login response:", res);
          const { userId, token, role } = res.data
          console.log("User ID:", userId);
          console.log("Token:", token);
          console.log("Role:", role);
          if (userId) {
            setItem("userAuth", {userId, token, role})

           baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
            navigate(`/posts`)
            console.log("connexion au compte ok ")
          }
        })
        .catch((error) => {
          console.error("Failed to connect to the account", error);
  console.log("Error response data:", error.response.data);
  console.log("Error response status:", error.response.status);
  console.log("Error response headers:", error.response.headers);
          setAuthUserError("Utilisateur inconnu")
          console.error("Echec connection au compte", error)
        })
    }
  }

  return (
    <>
      <main className="main-form">
        <h1 className="title-form">S identifier </h1>
        <form onSubmit={onSubmit} className="form">
          <img src={logo} className="logo-groupomania"></img>

          {/*condition : si erreur alors activé classe "erreur" */}

          <div
            className={`form-container ${
              emailErrors.length > 0 ? "error" : ""
            }`}
          >
            <label className="label" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              className="input"
              required
              placeholder="ex: user@groupomania.com"
              aria-required="true"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {emailErrors.length > 0 && (
              <div className="error-message">{emailErrors.join(",")} </div>
            )}
          </div>

          {/*condition : si erreur alors activer classe "erreur" */}
          <div
            className={`form-container ${
              passwordErrors.length > 0 ? "error" : ""
            }`}
          >
            <label className="label" htmlFor="password">
              Mot de passe*
            </label>
            <input
              type="password"
              id="password"
              className="input"
              required
              placeholder="Mot de passe"
              aria-required="true"
              maxLength={50}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {passwordErrors.length > 0 && (
              <div className="error-message">{passwordErrors.join(", ")}</div>
            )}
          </div>

          {authUserError && (
            <div className="error-message">{authUserError}</div>
          )}

          <button className="btn" type="submit">
            S identifier
          </button>

          <span>
            <Link to="/register">CREE MON COMPTE </Link>
          </span>
        </form>
      </main>
    </>
  )
}
