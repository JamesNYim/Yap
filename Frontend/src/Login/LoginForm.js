import React, {useState} from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import validation from './LoginValidation';

const LoginForm = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/');
    };

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValidUser = validation(values)
        if (isValidUser) {
            goToHomePage()
        }
    }

    return (
        <div className={'wrapper'}>
            <div>
                <form action={""} onSubmit={handleSubmit}>
                    <h1><p className={"small-line"}>Yap About It.</p></h1>
                    <h2> Login </h2>
                    <div className={"input-box"}>
                        <label htmlFor={"username"}><strong>Username or Email</strong></label>
                        <input type={"username"} placeholder={'Enter Username or Email'} name={'username'} onChange={handleInput} required/>
                        <FaUser className="icon"/>
                    </div>

                    <div className={"input-box"}>
                        <label htmlFor={"password"}><strong>Password</strong></label>
                        <input type={"password"} placeholder={'Enter Password'} name={'password'} onChange={handleInput} required/>
                        <FaLock className="icon"/>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember Me</label>
                        <a href='#'> Forgot Password? </a>
                    </div>

                    <div>
                        <button type={"submit"}>Log In</button>
                    </div>

                    <div className="register-link">
                        <p>Don't have an account? <Link to={'/signup'}>Create Account</Link> </p>
                    </div>

                    <footer className={'copyright'}>&copy; 2024 Yap. All rights reserved.</footer>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;