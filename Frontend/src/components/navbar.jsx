import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css'; 
import logo from '../assets/logo.png';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Recipenest Logo" className="logo" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Find a recipe or ingredient" />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/chefs" className={({ isActive }) => (isActive ? 'active' : '')}>
              Chefs
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>

      <NavLink to="/login" className="login">
        <FaUserCircle />
        <span>Login/ Signup</span>
      </NavLink>
    </header>
  );
};

export default Navbar;
