import { useState, useEffect } from "react";
import AdminSidebar from "../admin-components/admin-sidebar";
import "../style/MyRecipes.css";
import axios from "axios";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:7251/api/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7251/api/recipe/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleBlock = (id) => {
    console.log(`Block recipe with ID: ${id}`);
    // Add your navigation/edit logic here
  };

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  return (
    <div className="my-recipes-container">
      <AdminSidebar isAdmin={true} />
      <div className="my-recipes-table">
        <h1>All Recipes</h1>
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
                  <td>{recipe.name}</td>
                  <td>{recipe.type}</td>
                  <td>
                    <button onClick={() => handleBlock(recipe.id)} className="edit-btn">
                      Block
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
