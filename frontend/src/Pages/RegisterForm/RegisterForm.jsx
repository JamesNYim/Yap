import React from 'react';
import './RegisterForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegisterForm = () => {
    return (
        <div className = 'wrapper'> 
            <form action = "">
                <h1> Register </h1>
                <div className = "input-box">
                    <input type = 'text' placeholder = 'email' required/>
                    <MdEmail className = "icon"/>
                </div>
                <div className = "input-box">
                    <input type = 'text' placeholder = 'username' required/>
                    <FaUser className = "icon"/>
                </div>
                <div className = "input-box">
                    <input type = 'password' placeholder = 'password' require/>
                    <FaLock className = "icon"/>
                </div>
                <div className = "input-box">
                    <input type = 'password' placeholder = 'confrim password' require/>
                    <FaLock className = "icon"/>
                </div>
                <button type = "submit"> Sign Up </button>
                <div className = "login-link">
                    <p> Have an account already? <a href = { '/Login' }> Login </a></p>
                </div>
            </form>
        </div>
    );
};
export default RegisterForm;
