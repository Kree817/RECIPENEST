import { useEffect, useState } from "react";
import Sidebar from "../components/chef-sidebar"; // Import Sidebar
import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom"; // For redirecting the user to the login page

const UserDashboard = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Retrieve user ID from localStorage
    const storedUserId = localStorage.getItem("userId");
    
    if (!storedUserId) {
      // If no user is logged in, redirect to login page
      navigate("/login");
    } else {
      setUserId(storedUserId); // Set the user ID from localStorage
    }
  }, [navigate]);

  if (!userId) {
    // Optionally return null while waiting for the userId to be loaded
    return null;
  }

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar for options */}
      <div className="main-content">
        <h1>Welcome to Your Dashboard!</h1>
        <p>Here, you can manage your recipes, profile, and more!</p>
        {userId && <p>Your User ID: {userId}</p>} {/* Display the user ID */}
      </div>
    </div>
  );
};

export default UserDashboard;
