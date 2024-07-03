import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa"; import { MdEmail } from "react-icons/md";

const BACKEND_URL = 'http://localhost:8888'
const USERDB_URL = BACKEND_URL + '/users'
function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [userAvailability, setUserAvailability] = useState('');
    const [emailAvailability, setEmailAvailability] = useState('');

    const checkUserAvailability = async () => {
        if (!username) {
            setStatusMessage("There was no username please enter one");
            return;
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
                    console.log('Successful user retival: ', data.message);
                    setStatusMessage(data.message);
                    setUserAvailability(data.exists);
                }
            )       
        }
        catch (e) {
            console.log("Error checking availability", e);
            setStatusMessage("There was an error checking username availability");
        }        
    };

    const checkEmailAvailability = async () => {
        if (!email) {
            setStatusMessage("There was no email please enter one");
            return;
        }
        try {
            const response = fetch(
                BACKEND_URL + '/check-email-exists',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );
            response.then(response => response.json())
            .then(data => {
                    console.log('Successful email retrieval:', data.message);
                    setStatusMessage(data.message);
                    setEmailAvailability(data.exists);
                }
            )
        }
        catch (e) {
            console.log("Error checking availability", e);
            setStatusMessage("There was an error checking email availability");
        }        
    };

    const handleSubmission = async (e) => {
        e.preventDefault(); 
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } 
        if (!userAvailability || !emailAvailability) {
            console.log("User or Email exists already");
            return;
        }
        // Creating the payload
        const payload = {
            username,
            email,
            password,
        };
       
        // Sending a post request to backend
        try {
            // Need to generalize backend url into a gloal thing
            const response = await fetch(
                    BACKEND_URL + '/users', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            ); 

            // Handle response
            const data = await response.json();
            console.log('Sucessfully created a new user', data);

        }
        catch (error) {
            console.error('Error creating a new user:', error);
        }
    }

    return (
        <div className = 'wrapper'> 
            <form onSubmit={handleSubmission}>
                <h1> Register </h1>

                <div className = "input-box">
                    <input 
                        type = 'text' 
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                        onBlur={checkEmailAvailability}
                        placeholder = 'email' 
                        required
                    />
                    <MdEmail className = "icon"/>
                </div>

                <div className = "input-box">
                    <input 
                        type = 'text' 
                        value = {username}
                        onChange={(e)=>setUsername(e.target.value)}
                        onBlur={checkUserAvailability}
                        placeholder = 'username' 
                        required
                    />
                    <FaUser className = "icon"/>
                </div>
                
                <div className = "input-box">
                    <input 
                        type = 'password' 
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder = 'password' 
                        required
                    />
                    <FaLock className = "icon"/>
                </div>
                
                <div className = "input-box">
                    <input 
                        type = 'password' 
                        value = {confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        placeholder = 'confrim password' 
                        require
                    />
                    <FaLock className = "icon"/>
                </div>

                <div>
                    <p>{statusMessage}</p>
                </div>
                <button type = "submit"> Sign Up </button>
                <div className = "login-link">
                    <p> Have an account already? <a href = { '/login' }> Login </a></p>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;
