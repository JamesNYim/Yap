import React, { useState } from 'react';
import * as cookies from '../../Utilities/cookies';
//import './PlayerInfoList.css';

const backendUrl = process.env.BACKEND_URL;
const username = cookies.getCookie('username');
function PlayerInfoList() {
    const [playerName, setPlayerName] = useState('');
    const [balance, setBalance] = useState('');
    const [hasLoggedIn, setHasLoggedIn] = useState('');
    
    const getPlayerInfo = async () => {
        try {
            const response = fetch (
                'http://localhost:8888' + '/getPlayerInfo/' + username,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            response.then(response => response.json())
            .then(data => {
                console.log(data.info);
                setBalance(data.info[0].balance);
            });
        }
        catch(e) {
            console.log("There was an error getting player info");
        }
    }
    return (
        <div className = 'playerInfoList'>
            <h1> { username } </h1>
            <button className="loadPlayerInfo" onClick={getPlayerInfo}> Load Player Info</button> 
            <h1> { balance } </h1>
        </div>
    );
}

export default PlayerInfoList;
