import { useState } from "react";
import Sidebar from "./chef-sidebar"; // Reusable sidebar component
import "../style/AddRecipe.css";
import axios from "axios";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    dishName: "",
    image: null,
    ingredients: "",  // Added ingredients field
    type: "",
    prepTime: "",
    cookTime: "",
    prepDescription: "",
    cookingDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data to submit:", formData); // Log the form data before sending

    // Check for missing required fields
    if (!formData.dishName || !formData.image || !formData.type || !formData.prepTime || !formData.cookTime || !formData.ingredients) {
      alert("All fields are required!");
      return;
    }

    const recipeData = new FormData();
    recipeData.append("Name", formData.dishName);
    recipeData.append("Type", formData.type);
    recipeData.append("PrepTime", formData.prepTime);
    recipeData.append("CookingTime", formData.cookTime);
    recipeData.append("PrepDescription", formData.prepDescription);
    recipeData.append("CookingDescription", formData.cookingDescription);
    recipeData.append("ChefId", localStorage.getItem("userId")); // Pass logged-in chef ID
    recipeData.append("Ingredients", formData.ingredients);  // Add ingredients field
    recipeData.append("Picture", formData.image);

    try {
      const response = await axios.post("http://localhost:7251/api/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Recipe added response:", response); // Log the response from the server
      if (response.status === 201) {
        alert("Recipe added successfully!");
      }
    } catch (err) {
      console.error("Error submitting recipe:", err.response?.data || err);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="add-recipe-container">
      <Sidebar isChef={true} />
      <div className="add-recipe-form">
        <h1>Add New Recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="dishName">Dish Name</label>
            <input
              type="text"
              id="dishName"
              name="dishName"
              value={formData.dishName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="image">Recipe Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
            />
            {formData.image && (
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="preview-img"
                />
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="prepTime">Preparation Time</label>
            <input
              type="text"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="cookTime">Cooking Time</label>
            <input
              type="text"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="prepDescription">Preparation Description</label>
            <textarea
              id="prepDescription"
              name="prepDescription"
              value={formData.prepDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="cookingDescription">Cooking Description</label>
            <textarea
              id="cookingDescription"
              name="cookingDescription"
              value={formData.cookingDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save Recipe
            </button>
            <button type="reset" className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
