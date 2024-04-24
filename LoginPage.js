import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [remember, setRemember] = useState(false);
  
    const handleRememberChange = () => {
      setRemember(!remember);
    };

    const rememberMeStyle = {
      textAlign: 'center',
      marginTop: '10px', // Add some space between the checkbox and the text
    };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" style={{ fontSize: '16px' }}>Login Now!</button>
        <div style={rememberMeStyle}>
          <input type="checkbox" checked={remember} onChange={handleRememberChange} />
          <label htmlFor="remember">Remember me</label>
        </div>
      </form>
      <div className="signup-text">
        <p>Don't have an Account?&nbsp;</p>
        <Link to="/register" className="signup-link">Register Here!</Link>
      </div>
      <footer>&copy; 2024 Yap. All rights reserved.</footer>
    </div>
  );
}

export default LoginPage;
