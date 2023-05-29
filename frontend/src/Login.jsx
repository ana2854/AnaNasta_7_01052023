export function Login() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" className="email" required placeholder="email" aria-required="true" autoFocus
      />
      <p>Veuillez saisir une adresse email valide</p>
      <br />
      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password" id="password" className="password"
        required placeholder="Mot de passe" aria-required="true"
        minlength={4} maxLength={50}
      />
      <p>
        
        Veuillez indiquer 4 caractères minimum dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spéciale
      </p>
      <br />
      <button type="submit">Se connecter</button>
      <p>Vous n'avez pas encore de compte ? </p>
      <a href="">Créer un compte</a>
    </form>
  )
}
