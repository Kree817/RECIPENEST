import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../style/chef-page.css"; // Import Chef page styles


const API_URL = "http://localhost:7251/api/chef"; // Backend URL to fetch chefs data

const ChefPage = () => {
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 10;
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  // Fetch chefs data from the backend
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await axios.get(API_URL);
        setFilteredChefs(res.data); // Initially set filteredChefs to all chefs
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };
    fetchChefs();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(filteredChefs.length / chefsPerPage);
  const indexOfLast = currentPage * chefsPerPage;
  const indexOfFirst = indexOfLast - chefsPerPage;
  const currentChefs = filteredChefs.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle click to navigate to ChefDetails page
  const handleChefClick = (id) => {
    navigate(`/chef/${id}`);  // Navigate to the chef details page with the chef ID
  };

  return (
    <div>
      <section className="chef-hero">
        <div className="chef-hero-content">
          <h1>
            <span>Meet Our Top Chefs</span>
          </h1>
        </div>
      </section>

      <section className="chef-section">
        <div className="chef-grid">
          {currentChefs.map((chef) => (
            <div className="chef-card" key={chef.id} onClick={() => handleChefClick(chef.id)}>
              <div className="chef-img-wrapper">
                {/* Display chef's picture if available */}
                {chef.picture && (
                  <img
                    src={`data:image/jpeg;base64,${chef.picture}`}  // Correct base64 image rendering
                    alt={chef.fullName}
                  />
                )}
                
              </div>
              <p className="chef-name">{chef.fullName}</p>
              <p className="chef-speciality">{chef.speciality}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChefPage;
