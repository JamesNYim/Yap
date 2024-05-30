import React, {useState} from "react";
import './Signup.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from './passwordStrength'

function Signup() {
    // State function to travel to the main page after successful login
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate('/login');
    };

    // Keep track of the username, email, and password
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    // Keep track of the re-entered password
    const [rePassword, setRePassword] = useState('');

    // Get the username, email, and password
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prevState => ({ ...prevState, [name]: value}));
    };

    // Get the re-entered password
    const handleRePasswordInput = (event) => {
        setRePassword(event.target.value);
    };

    // Handle function when submit button is added
    const handleSubmit = async(event) => {
        event.preventDefault();
        // check to see if the re-entered password and password matches
        if (values.password !== rePassword) {
            alert('Passwords do not match!');
            return;
        }
        // fetch the post method from the server
        fetch("http://localhost:5001/signup", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                goToLoginPage();
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className={'wrapper'}>
            <form onSubmit={handleSubmit}>
                <h1><p className={"small-line"}>Register Here.</p></h1>
                <div className={"input-box"}>
                    <label htmlFor={"username"}><strong>Username</strong></label>
                    <input type={"username"} placeholder={'Enter Username'} name={'username'} onChange={handleInput} required/>
                    <FaUser className="icon"/>
                </div>

                <div className={"input-box"}>
                    <label htmlFor={"email"}><strong>Email</strong></label>
                    <input type={"email"} placeholder={'Enter Email'} name={'email'} onChange={handleInput} required/>
                    <FaUser className="icon"/>
                </div>

                <div className={"input-box"}>
                    <label htmlFor={"password"}><strong>Password</strong></label>
                    <input type={"password"} placeholder={'Enter Password'} name={'password'} onChange={handleInput} required/>
                    <div style={{margin: '10px auto', width: '100%'}}>
                        <PasswordStrengthMeter password={values.password}/>
                    </div>
                    <FaLock className="icon"/>
                </div>

                <div className={"input-box"}>
                    <label htmlFor={"re-password"} ><strong>Re-enter Password</strong></label>
                    <input type={"password"} placeholder={'Re-enter Password'} onChange={handleRePasswordInput} required/>
                    <FaLock className="icon"/>
                </div>

                <div>
                    <button type={"submit"}>Create Account</button>
                </div>

                <footer className={'copyright'}>&copy; 2024 Yap. All rights reserved.</footer>
            </form>
        </div>
    )
}

export default Signup