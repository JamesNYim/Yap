import React from "react";
import './Signup.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function Signup() {
    const navigate = useNavigate()
    const goToLoginPage = () => {
        navigate('/');
    }

    return (
        <div className={'wrapper'}>
            <div>
                <form action={""}>
                    <h1><p className={"small-line"}>Register Here.</p></h1>
                    <div className={"input-box"}>
                        <label htmlFor={"username"}><strong>Username</strong></label>
                        <input type={"username"} placeholder={'Enter Username'} required/>
                        <FaUser className="icon"/>
                    </div>

                    <div className={"input-box"}>
                        <label htmlFor={"email"}><strong>Email</strong></label>
                        <input type={"email"} placeholder={'Enter Email'} required/>
                        <FaUser className="icon"/>
                    </div>

                    <div className={"input-box"}>
                        <label htmlFor={"password"}><strong>Password</strong></label>
                        <input type={"password"} placeholder={'Enter Password'} required/>
                        <FaLock className="icon"/>
                    </div>

                    <div className={"input-box"}>
                        <label htmlFor={"re-password"}><strong>Re-enter Password</strong></label>
                        <input type={"re-password"} placeholder={'Re-enter Password'} required/>
                        <FaLock className="icon"/>
                    </div>

                    <div>
                        <button type={"submit"} onClick={() => goToLoginPage()}>Create Account</button>
                    </div>

                    <footer className={'copyright'}>&copy; 2024 Yap. All rights reserved.</footer>
                </form>
            </div>
        </div>
    )
}

export default Signup