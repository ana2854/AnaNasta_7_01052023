import React from 'react'
import logo from '../src/image/groupomania-logoBW.svg'
import './styles.css'

export function Login() {
  return (
    <form>
      <img src={logo} className="logo-groupomania" ></img>
      
      <div className="form-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="email"
          required
          placeholder="Votre email"
          aria-required="true"
          autoFocus
        />
        <p className="error-email">Veuillez saisir une adresse email valide</p>

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          className="password"
          required
          placeholder="Mot de passe"
          aria-required="true"
          minlength={4}
          maxLength={50}
        />
        <p className="error-password">
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
