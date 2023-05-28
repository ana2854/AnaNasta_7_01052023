

function App() {
  return (
    <div>
    <h1>Se connecter</h1>
  <form>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required placeholder="email"/>
    <br/>
    <label for="password">Mot de passe :</label>
    <input type="password" id="password" name="password" required placeholder="Mot de passe"/>
    <br/>
    <button type="submit">Se connecter</button>
    <p>Vous n'avez pas encore de compte ? </p>
    <button type="submit">Créer un compte</button>
  </form>
    </div>
  )


}

export default App
