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
                <p>Own a musket for home defense, since that's what the founding fathers intended. Four ruffians break into my house. "What the devil?" As I grab my powdered wig and Kentucky rifle. Blow a golf ball sized hole through the first man, he's dead on the spot. Draw my pistol on the second man, miss him entirely because it's smoothbore and nails the neighbors dog. I have to resort to the cannon mounted at the top of the stairs loaded with grape shot, "Tally ho lads" the grape shot shreds two men in the blast, the sound and extra shrapnel set off car alarms. Fix bayonet and charge the last terrified rapscallion. He Bleeds out waiting on the police to arrive since triangular bayonet wounds are impossible to stitch up. Just as the founding fathers intended.</p>
                <Feed />
            </div>
        </div>
    );
}

export default Home;
