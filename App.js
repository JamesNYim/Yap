import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="logo">
        {/* Logo can be inserted here */}
      </div>
      <h1>Welcome</h1>
      <p className="small-line">Yap About It.</p>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login Now!</button>
      </form>
      <div className="signup-text">
        <p>Don't have an Account?&nbsp;</p>
        <a href="#" className="signup-link">Register Here!</a>
      </div>
    </div>
  );
}

export default App;