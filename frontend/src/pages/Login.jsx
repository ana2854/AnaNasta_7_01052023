import { useState } from "react"
import logo from "../image/groupomania-logoBW.svg"
import "../styles.css"
import { checkEmail, checkPassword } from "../validation"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Login() {
  const navigate = useNavigate()
  //variables email&password qui vont changer d'état
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  //fonction onSubmit de react pour gérer l'envoi des datas
  function onSubmit(e) {
    e.preventDefault()

    const emailResults = checkEmail(email)
    const passwordResults = checkPassword(password)

    setEmailErrors(emailResults)
    setPasswordErrors(passwordResults)

    if (emailResults.length === 0 && passwordResults.length === 0) {
      const storedToken = localStorage.getItem("userAuth")

      axios
        .post(
          "http://localhost:3000/api/auth/login",
          {
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer${storedToken}`,
            },
          }
        )
        .then((res) => {
          console.log("Connection au compte!", res.data)
          console.log(res.data);
          const { userId, token } = res.data
          console.log(token)
          console.log(userId)

          localStorage.setItem("userAuth", JSON.stringify({ userId, token }))

          navigate(`/userAccount/${userId}`)
        })
        .catch((error) => {
          console.error("Echec connection compte", error)
        })
    }
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <img src={logo} className="logo-groupomania"></img>

      {/*condition : si erreur alors activé classe "erreur" */}

      <div
        className={`form-container ${emailErrors.length > 0 ? "error" : ""}`}
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
        className={`form-container ${passwordErrors.length > 0 ? "error" : ""}`}
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

      <button className="btn" type="submit">
        S'identifier
      </button>

      <span>
        <Link to="/register">Créer mon compte </Link>
      </span>
    </form>
  )
}
