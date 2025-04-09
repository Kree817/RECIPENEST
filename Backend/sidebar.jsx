import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // You can customize the styles in this file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img 
          src="https://via.placeholder.com/150" // Replace with the user's profile image or your preferred source
          alt="Profile"
          className="profile-image"
        />
        <h3 className="username">Raju Rastogi</h3>
        <p className="status">Chef</p>
      </div>
      
      <div className="sidebar-links">
        <ul>
          <li>
            <Link to="/edit-profile" className="sidebar-link">
              <span>Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/favorite" className="sidebar-link">
              <span>Favorite</span>
            </Link>
          </li>
          <li>
            <Link to="/add-recipe" className="sidebar-link">
              <span>Add Recipe</span>
            </Link>
          </li>
          <li>
            <Link to="/help" className="sidebar-link">
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
