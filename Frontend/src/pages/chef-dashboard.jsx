import { useState, useEffect } from "react";
import Sidebar from "../components/chef-sidebar"; // Import Sidebar
import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom"; // For redirection
import { useUser } from "../context/UserContext"; // Access user context
import axios from "axios"; // For making API requests
import DashboardLogo from "../assets/logo-dark.png"; // Import logo

const ChefDashboard = () => {
  const [chefId, setChefId] = useState(null);
  const [chefName, setChefName] = useState(""); // State to store chef's name
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate(); // For redirection
  const { userId } = useUser(); // Get user ID from context

  useEffect(() => {
    const storedChefId = localStorage.getItem("userId");
    
    if (!storedChefId) {
      navigate("/login"); // Redirect to login if no chef is logged in
    } else {
      setChefId(storedChefId); // Set the user ID from localStorage or context
    }
  }, [navigate, userId]);  // Listen for changes in userId

  useEffect(() => {
    // Fetch chef's name when chefId is available
    if (chefId) {
      const fetchChefData = async () => {
        try {
          const response = await axios.get(`http://localhost:7251/api/chef/${chefId}`);
          setChefName(response.data.fullName); // Set the chef's name
          setLoading(false); // Stop loading
        } catch (error) {
          console.error("Error fetching chef data:", error);
          setLoading(false); // Stop loading if there's an error
        }
      };
      
      fetchChefData(); // Call the function to fetch chef's data
    }
  }, [chefId]); // Fetch data only when chefId is set

  if (loading) {
    return <p>Loading...</p>; // Show loading message until chef data is fetched
  }

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar for options */}
      <div className="main-content">
      <p>Hi, Chef {chefName}!</p> {/* Display the chef's name */}
        <h1>Welcome to Your Chef Portal!</h1>
        <p>Here, you can manage your recipes, profile, and more!</p>
        <img src={DashboardLogo} alt="Chef Dashboard" className="dashboard-image" /> {/* Placeholder image */}
      </div>
    </div>
  );
};

export default ChefDashboard;
