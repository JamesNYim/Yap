import React, {useState} from "react";
import './App.css';
import LoginForm from './LoginForm';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
      setIsAuthenticated(true);
    };

    return (
      <div>
          {isAuthenticated ? (
              <div>Welcome! You are logged in.</div>
          ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess}/>
          )}
      </div>
    );
}

export default App;