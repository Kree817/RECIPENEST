import { useState } from "react";
import Sidebar from "../components/chef-sidebar"; // Reusable sidebar component
import "../style/MyRecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Veg Delight",
      tag: "Vegan",
    },
    {
      id: 2,
      title: "Cheese Pizza",
      tag: "Italian",
    },
    {
      id: 3,
      title: "Fruit Smoothie",
      tag: "Healthy",
    },
  ]);

  const handleDelete = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit recipe with ID: ${id}`);
    // Logic to navigate or open the edit page for the selected recipe
  };

  return (
    <div className="my-recipes-container">
      <Sidebar isChef={true} />
      <div className="my-recipes-table">
        <h1>My Recipes</h1>
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
      </div>
    </div>
  );
};

export default MyRecipes;
