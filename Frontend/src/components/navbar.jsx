import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../style/Navbar.css";
import logo from "../assets/logo.png";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios"; // Import axios for making API requests

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [chefName, setChefName] = useState(""); // Store chef's name
  const [chefImage, setChefImage] = useState(""); // Store chef's image
  const navigate = useNavigate(); // For programmatic navigation

  // Get logged-in user's data (userId) from UserContext
  const { userId } = useUser(); // Access user context for userId

  // Toggle the menu open or close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch user data (name and image) from backend when userId is available
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:7251/api/chef/${userId}`);
          setChefName(response.data.fullName); // Set the chef's name
          setChefImage(response.data.picture); // Set the chef's image
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(); // Fetch user data
    }
  }, [userId]); // Fetch data whenever userId changes

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/search?query=${searchQuery}`);
  };

  // If user is logged in, display their name and image, otherwise show Login/Signup
  const renderUserProfile = () => {
    if (userId && chefName) {
      return (
        <div className="user-profile">
          {chefImage ? (
          <img src={`data:image/jpeg;base64,${chefImage}`} className="user-image" alt="User Profile"/>
          ) 
          : 
          (
            <FaUserCircle className="user-image" />
          )} {"  "}
          <span>
            <Link to= "/chef-dashboard" className="username">{chefName}</Link></span> {/* Display chef's name */}
        </div>
      );
    } else {
      return (
        <NavLink to="/login" className="login">
          <FaUserCircle />
          <span>Login/ Signup</span>
        </NavLink>
      );
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Recipenest Logo" className="logo" />
        </NavLink>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Find a recipe or ingredient"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>
          <FaSearch />
        </button>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipe-page" end className={({ isActive }) => (isActive ? "active" : "")}>
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/chef-page" className={({ isActive }) => (isActive ? "active" : "")}>
              Chefs
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Display user profile or login/signup */}
      {renderUserProfile()}
    </header>
  );
};

export default Navbar;
