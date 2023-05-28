export function Login() {
  return (
    <form>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required placeholder="email" aria-required="true"
      />
      <p>Veuillez saisir une adresse email valide</p>
      <br />
      <label for="password">Mot de passe :</label>
      <input
        type="password" id="password" name="password"
        required placeholder="Mot de passe" aria-required="true"
        minlength={4} maxLength={50}
      />
      <p>
        
        Veuillez indiquer 4 caractères minimum dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spéciale
      </p>
      <br />
      <button type="submit">Se connecter</button>
      <p>Vous n'avez pas encore de compte ? </p>
      <button type="submit">Créer un compte</button>
    </form>
  )
}
