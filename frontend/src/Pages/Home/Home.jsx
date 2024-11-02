import './Home.css';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import Feed from '../../Components/Feed/Feed'
import PlayerInfoList from '../../Components/PlayerInfoList/PlayerInfoList'

const Home = () => {
    document.body.setAttribute('class', 'home-page');
    return (
        <div class='homePage-wrapper'>
            <div class='navbar-component'>
                <Navbar />
            </div>
            <div class='content'>
                <h1 class='homeHeader'>Welcome to Yap</h1>
                <PlayerInfoList />
            </div>
        </div>
    );
}

export default Home;





