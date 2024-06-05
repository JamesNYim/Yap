import React, { useState } from 'react';
import './RegisterForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmission = async (e) => {
        e.preventDefault();

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
                'http://localhost:8888/users', 
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
                        placeholder = 'username' 
                        required
                    />
                    <FaUser className = "icon"/>
                </div>
                
                <div className = "input-box">
                    <input 
                        type = 'text' 
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder = 'password' 
                        required
                    />
                    <FaLock className = "icon"/>
                </div>
                
                <div className = "input-box">
                    <input type = 'password' placeholder = 'confrim password' require/>
                    <FaLock className = "icon"/>
                </div>

                <button type = "submit"> Sign Up </button>
                <div className = "login-link">
                    <p> Have an account already? <a href = { '#/login' }> Login </a></p>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;
