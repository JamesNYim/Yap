import React from 'react';
import { useNavigate } from 'react-router-dom';
import {deleteCookie} from '../../Utilities/cookies';

export default function LogoutButton () {
    const navigate = useNavigate();

    const handleLogout = () => {
        deleteCookie('username');
        navigate('/login');

    }
    return (
        <div>
            <button onClick = {handleLogout}>
                Log Out
            </button>
        </div>
    );
}
