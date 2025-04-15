import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // useNavigate to handle navigation
import "../style/Sidebar.css"; // Import your CSS file for styling

const ChefSidebar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);  // State to control popup visibility
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem("authToken");  // Remove the token from localStorage
    localStorage.removeItem("userId");     // Remove userId from localStorage
    setShowLogoutPopup(false); // Hide the popup
    navigate("/login");  // Redirect to login page
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the logout popup without logging out
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2>Chef Dashboard</h2>
      </div>

      {/* Sidebar Navigation Links */}
      <div className="sidebar-links">
        <Link to="/chef/edit-profile" className="sidebar-item">
          ✏️ Edit Profile
        </Link>

        <Link to="/chef/my-recipes" className="sidebar-item">
          🍕 My Recipes
        </Link>

        <Link to="/chef/my-blogs" className="sidebar-item">
          📝 My Blogs
        </Link>

        <Link to="/chef/add-recipe" className="sidebar-item">
          ➕ Add Recipe
        </Link>

        <Link to="/chef/add-blog" className="sidebar-item">
          🖊️ Add Blog
        </Link>

        <Link to="/help" className="sidebar-item">
          ❓ Help
        </Link>

        {/* Logout Link, triggers the popup */}
        <Link to="#" onClick={() => setShowLogoutPopup(true)} className="sidebar-item">
          🚪 Logout
        </Link>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <h3>Are you sure you want to log out?</h3>
            <div className="popup-buttons">
              <button onClick={handleLogout} className="confirm-btn">
                Yes, Log Out
              </button>
              <button onClick={handleCancelLogout} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefSidebar;
