import './Home.css';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import Feed from '../../Components/Feed/Feed'
const Home = () => {
    document.body.setAttribute('class', 'home-page');
    return (
        <div class='homePage'>
            <div class='navbar-component'>
                <Navbar />
            </div>
            <div class='content'>
                <h1>Welcome to Yap</h1>
                <Feed />
            </div>
        </div>
    );
}

export default Home;
