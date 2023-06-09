import React from "react"
import { useState } from "react"
import logo from "../src/image/groupomania-logoBW.svg"
import "./styles.css"
import { checkEmail, checkPassword } from "./validation"

export function Login() {
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
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <img src={logo} className="logo-groupomania"></img>

      {/*condition : si erreur alors activé classe "erreur" */}

      <div
        className={`form-container ${emailErrors.length > 0 ? "error" : ""}`}
      >
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input"
          //required
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
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          className="input"
          required
          placeholder="Mot de passe"
          aria-required="true"
          //minLength={4}
          //maxLength={50}
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

      
      
      <span><a href="">Créer mon compte </a></span>

    </form>
  )
}
