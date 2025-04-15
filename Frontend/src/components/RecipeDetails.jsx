import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // For getting the recipe ID from the URL
import "../style/RecipeDetails.css"; 

const API_URL = "http://localhost:7251/api/recipe";

const RecipeDetails = () => {
  const { id } = useParams();  // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [otherRecipes, setOtherRecipes] = useState([]);

  useEffect(() => {
    // Fetch the current recipe details
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setRecipe(res.data);  // Set recipe details in the state
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    // Fetch other recipes (excluding the current recipe)
    const fetchOtherRecipes = async () => {
      try {
        const res = await axios.get(API_URL); 
        setOtherRecipes(res.data.filter((item) => item.id !== parseInt(id)));  // Exclude current recipe
      } catch (error) {
        console.error("Error fetching other recipes:", error);
      }
    };

    fetchRecipe();
    fetchOtherRecipes();
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <section className="recipe-details-page">
      <div className="recipe-left">
        <h1 className="recipe-title">{recipe.name}</h1>

        <div className="recipe-info-boxes">
          <div className="info-box">Type: {recipe.type}</div>
          <div className="info-box">Prep Time: {recipe.prepTime}</div>
          <div className="info-box">Cook Time: {recipe.cookingTime}</div>
        </div>

        <div className="main-image-wrapper">
          <img
            src={`data:image/jpeg;base64,${recipe.picture}`} 
            alt={recipe.name}
          />
        </div>

        <div className="description">
          <h3>Preparation Steps</h3>
          <p>{recipe.prepDescription}</p>
        </div>

        <div className="steps">
          <h3>Cooking Steps</h3>
          <p>{recipe.cookingdescription}</p>
        </div>
      </div>

      <div className="recipe-right">
        <h3 className="recent-title">Other Recipes</h3>
        {otherRecipes.map((item) => (
          <div className="recent-recipe-card" key={item.id}>
            <img
              src={`data:image/jpeg;base64,${item.picture}`} 
              alt={item.name}
              className="recent-recipe-image"
            />
            <div className="recent-info">
              <p className="recent-recipe-name">{item.name}</p>
              <p className="recent-recipe-type">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeDetails;
