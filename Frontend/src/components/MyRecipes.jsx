import { useState, useEffect } from "react";
import Sidebar from "../admin-components/admin-sidebar";
import "../style/MyRecipes.css";
import axios from "axios";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const chefId = localStorage.getItem("chefId"); // assuming chefId is stored on login

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:7251/api/recipe/chef/${chefId}`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (chefId) {
      fetchRecipes();
    }
  }, [chefId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7251/api/recipe/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleEdit = (id) => {
    // Navigate to edit page or open modal (optional)
    console.log(`Edit recipe with ID: ${id}`);
  };

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  return (
    <div className="my-recipes-container">
      <Sidebar isChef={true} />
      <div className="my-recipes-table">
        <h1>My Recipes</h1>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.title}</td>
                  <td>{recipe.tag}</td>
                  <td>
                    <button onClick={() => handleEdit(recipe.id)} className="edit-btn">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
