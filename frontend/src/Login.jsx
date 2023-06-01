import React from 'react'
import { useState } from 'react'
import logo from '../src/image/groupomania-logoBW.svg'
import './styles.css'

export function Login() {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")



  return (
    <form method="post">
    
      <img src={logo} className="logo-groupomania" ></img>
      
      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          required
          placeholder="Votre email"
          aria-required="true"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <p className="error-email" aria-hidden="true">Veuillez saisir une adresse email valide</p>

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Mot de passe"
          aria-required="true"
          minLength={4}
          maxLength={50}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="error-password" aria-hidden="true">
          Veuillez indiquer 4 caractères minimum dont au moins une lettre
          minuscule, une lettre majuscule, un chiffre et un caractère spéciale
        </p>
      </div>
      <button type="submit">Connexion</button>
      <p>Vous n'avez pas encore de compte ? </p>
      <a href="">Créer un compte</a>
    </form>
  )
}
