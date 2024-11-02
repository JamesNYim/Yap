import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import LogoutButton from '../LogoutButton/LogoutButton';
export default function Navbar() {
    return (
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class = "nav-item">
                    <a href = "#" class="nav-link">
                        <span class="link-text">Search</span>
                        <FaSearch className="icon" />
                    </a>
                </li>
                <li class = "nav-item">
                    <a href = "#" class="nav-link">
                        <span class="link-text">Profile</span>
                        <FaUserCircle className="icon"/>
                    </a>
                </li>
                <li class = "nav-item">
                    <a href = "#" class="nav-link">
                        <span class="link-text">Friends</span>
                        <FaUsers className="icon"/>
                    </a>
                </li>
                <li class = "nav-item">
                   <LogoutButton /> 
                </li>
            </ul>
        </nav>
    );
}
