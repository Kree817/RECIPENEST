import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Chefs.css";  // Assuming this file contains the necessary styling
import chefImage from "../assets/chef1.jpeg"; // Default image if not available in DB
import { useNavigate} from "react-router-dom";

const API_URL = "http://localhost:7251/api/chef"; // Your backend API URL to fetch chefs

const Chefs = () => {
  const navigate = useNavigate(); // Initialize navigate from useNavigate hook
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);  // Add a loading state
  const [error, setError] = useState(null);      // Add an error state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [chefsPerPage] = useState(5); // Number of chefs to display per page

  useEffect(() => {
    // Fetch chefs data from the API
    const fetchChefs = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Fetched Chefs Data:", response.data); // Log the full response data to check structure
        setChefs(response.data);  // Set chefs data to state
        setLoading(false);         // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching chefs data:", error);
        setError("Failed to load chef data"); // Set error state if API call fails
        setLoading(false);  // Stop loading when error occurs
      }
    };

    fetchChefs();  // Call the function to fetch data
  }, []);

  // Pagination Logic
  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);  // Slice chefs for current page

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage * chefsPerPage < chefs.length) {
      setCurrentPage(currentPage + 1);  // Go to next page if more chefs are available
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);  // Go to previous page
    }
  };

  // Check for loading state
  if (loading) {
    return <p>Loading chefs...</p>; // Display loading message while data is being fetched
  }

  // Check for error state
  if (error) {
    return <p>{error}</p>; // Display error message if something went wrong
  }

  return (
    <section className="chefs-section">
      <h2 className="chef-title">Top Chefs</h2>
      <div className="chefs-grid">
        {/* Loop through the chefs array and display each chef */}
        {currentChefs.map((chef) => (
          <div className="chef-card" key={chef.id}>
            <div className="chef-img-wrapper">
              {/* Display chef's picture if available */}
              <img
                src={chef.picture ? `data:image/jpeg;base64,${chef.picture}` : chefImage} // Use base64 image if available, else use default
                alt={chef.fullName}
                className="chef-image"
              />
            </div>

            {/* Ensure the chef's name is rendered properly */}
            <p className="chef-name">
              {chef.fullName ? chef.fullName : "No name available"}  {/* Update field name */}
            </p>
            <p className="chef-speciality">{chef.speciality}</p>
            {/* <p className="chef-bio">{chef.bio}</p> */}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {Math.ceil(chefs.length / chefsPerPage)} {/* Total pages */}
        </span>
        <button onClick={handleNextPage} disabled={currentPage * chefsPerPage >= chefs.length}>
          Next ➡
        </button>
      </div>

      {/* Button to view all chefs */}
      <div className="chefs-btn-wrapper">
        <button className="chefs-btn" onClick={() => navigate("/chef-page")}>🍳 View All CHEFS</button>
      </div>
    </section>
  );
};

export default Chefs;
