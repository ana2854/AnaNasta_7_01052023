import React from "react"
import { useState, useEffect } from "react"
import logo from "../src/image/groupomania-logoBW.svg"
import "./styles.css"

export function Login() {
  //variables email&password qui vont changer d'état
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //fonction onSubmit de react pour gérer l'envoi des datas
  function onSubmit(e) {
    e.preventDefault()
  }

  useEffect(()=> {
    console.log("render")
  })

  return (
    <form onSubmit={onSubmit} class="form">
      <img src={logo} className="logo-groupomania"></img>

 
      <div className="form-container error">

        <label class="label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          class="input"
          required
          placeholder="Votre email"
          aria-required="true"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          
        <div class="error-message">erreur email </div>
          
    
      
        <label className="label" htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          class="input"
          required
          placeholder="Mot de passe"
          aria-required="true"
          minLength={4}
          maxLength={50}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div class="error-message">erreur mot de passe</div>
        
      </div>

      <button class="btn" type="submit">Connexion</button>

      <p>Vous n'avez pas encore de compte ? </p>
      <a href="">Créer un compte !</a>

      
      
    </form>
  )
}
