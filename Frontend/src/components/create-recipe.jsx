import axios from "axios";
import { useState } from "react";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before making the request

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
    };

    try {
      const response = await axios.post("http://localhost:5188/api/recipes", recipeData);
      
      // Redirect to the recipe list or success page after the recipe is created
      if (response.status === 200) {
        history.push("/recipes"); // Redirect to your recipe list page
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Failed to create recipe. Please try again.");
    }
  };

  return (
    <div className="create-recipe-container">
      <form className="create-recipe-form" onSubmit={handleCreateRecipe}>
        <h2>Create Recipe</h2>

        <div className="input-group">
          <label>Recipe Title</label>
          <input
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            placeholder="Enter recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Ingredients</label>
          <textarea
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Instructions</label>
          <textarea
            placeholder="Enter instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Image URL</label>
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="create-recipe-btn" disabled={loading}>
          {loading ? "Creating Recipe..." : "Create Recipe"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateRecipe;
