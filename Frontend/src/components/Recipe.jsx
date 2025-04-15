import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../style/Recipe.css";
import { FaHeart } from "react-icons/fa";

const API_URL = "http://localhost:7251/api/recipe"; 

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  // Fetch data from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(API_URL);
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle click to navigate to RecipeDetails page
  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);  // Navigate to the recipe details page with the recipe ID
  };

  return (
    <section className="recipe-section">
      <h2 className="recipe-title">Top Recipes</h2>

      <div className="recipe-grid">
        {currentRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
            <div className="image-wrapper">
              {/* Display recipe picture if available */}
              {recipe.picture && (
                <img
                  src={`data:image/jpeg;base64,${recipe.picture}`}  // Correct base64 image rendering
                  alt={recipe.name}
                />
              )}
              <button className="fav-icon">
                <FaHeart />
              </button>
            </div>
            <p className="recipe-name">{recipe.name}</p>
            <p className="recipe-type">{recipe.type}</p>
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

      {/* View All Button */}
      <div className="view-btn-wrapper">
        <button className="view-all-btn" onClick={() => navigate("/recipe-page")}>🍽 View All Recipes</button>
      </div>
    </section>
  );
};

export default Recipe;
