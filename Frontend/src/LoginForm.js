import './App.css';
import React, { useState } from "react";

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username: ', username, 'Password: ', password);
        // Login logic here will add later
        if (username === 'Kotiger' && password === '1234') {
            onLoginSuccess();
        } else {
          alert('Invalid username or password')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
