import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


const BACKEND_URL = 'http://localhost:8888'


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [userStatusMsg, setUserStatusMsg] = useState('');
    const navigate = useNavigate();
    const userExistsCheck = async () => {
        if (!username) {
            setUserStatusMsg("Please enter a username");
            return;
        }
        else {
            setUserStatusMsg("");
        }

        try {
            const response = fetch(
                BACKEND_URL + '/check-user-exists',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                }
            );
            response.then(response => response.json())
            .then(data => {
                    console.log("Successful username check: ", data.message);
                }
            )

        }
        catch (e) {
            console.log("Error checking if username exists");
        }
    };

    const loginVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                BACKEND_URL + '/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            const data = await response.json();
            console.log('Successful Login Check: ', data.success);
            if (data.success) {
                console.log("Signing in");
                navigate('/register');
            }
            else if (!data.success) {
                setStatusMessage("Incorrect Username or Password");
            }
        }
        catch (e) {
            console.log("Error checking availability", e);
            setStatusMessage("There was an error checking logging in");
        }        
    };


    return (
        <div className = 'wrapper'>
            <form onSubmit={loginVerification}>
                <h1> Login </h1>
                
                <div className = "input-box">
                    <input 
                        type = 'text' 
                        placeholder = 'Username' 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        onBlur={userExistsCheck} 
                        required/>
                    <FaUser className="icon"/>
                    <p> {userStatusMsg} </p>
                </div>

                <div className = "input-box">
                    <input 
                        type = 'password' 
                        placeholder = 'Password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                    <FaLock className="icon"/>
                    
                    <p> {statusMessage} </p> 
                </div>
                <div className = "remember-forgot">
                    <label><input type = "checkbox" />Remember Me</label>  
                    <a href ='#'> Forgot Password? </a>
                </div>

                <button 
                    type = "submit"> Login
                </button>
                <div className="register-link"> 
                    <p>Don't have an account? <a href="/register"> Register </a></p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;

