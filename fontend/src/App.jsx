

function App() {
  return (
    <div>
    <h1>Login</h1>
  <form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required/>
    <br/>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required/>
    <br/>
    <button type="submit">Login</button>
  </form>
    </div>
  )


}

export default App
