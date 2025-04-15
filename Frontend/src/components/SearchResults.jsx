import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // For accessing query params
import axios from "axios";
import "../style/Recipe.css";  // Use Recipe.css for recipe-related styles
import "../style/Chefs.css";    // Use Chef.css for chef-related styles
import { FaHeart } from "react-icons/fa";  // Using the same icons

const API_URL_RECIPES = "http://localhost:7251/api/recipe";
const API_URL_CHEFS = "http://localhost:7251/api/chef";

const SearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");  // Get search query from URL

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Fetch recipes matching the query
        const recipeRes = await axios.get(`${API_URL_RECIPES}?search=${query}`);
        console.log("Recipes:", recipeRes.data); // Debugging log for recipes
        setRecipes(recipeRes.data);

        // Fetch chefs matching the query
        const chefRes = await axios.get(`${API_URL_CHEFS}?search=${query}`);
        console.log("Chefs:", chefRes.data); // Debugging log for chefs
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to load search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;  // Display loading state while fetching data
  }

  if (error) {
    return <p>{error}</p>;  // Display error message if something went wrong
  }

  return (
    <section className="search-results">
      <h2>Search Results for {query}</h2>

      {/* Display Recipes Section */}
      <div className="results-section">
        <h3>Recipes</h3>
        {recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="image-wrapper">
                  {/* Display recipe's picture if available */}
                  <img
                    src={`data:image/jpeg;base64,${recipe.picture}`}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <button className="fav-icon">
                    <FaHeart />
                  </button>
                </div>
                <p className="recipe-name">{recipe.name}</p>
                <p className="recipe-type">{recipe.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

    </section>
  );
};

export default SearchResults;
