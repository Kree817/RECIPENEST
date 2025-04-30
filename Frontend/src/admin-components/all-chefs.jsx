import { useState, useEffect } from "react";
import AdminSidebar from "../admin-components/admin-sidebar";
import axios from "axios";
import "../style/MyRecipes.css"; // Reuse table styling

const AllChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllChefs = async () => {
      try {
        const response = await axios.get("http://localhost:7251/api/chef");
        setChefs(response.data);
      } catch (error) {
        console.error("Failed to fetch chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllChefs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7251/api/chef/${id}`);
      setChefs((prev) => prev.filter((chef) => chef.id !== id));
    } catch (error) {
      console.error("Failed to delete chef:", error);
    }
  };

  const handleBlock = (id) => {
    console.log(`Block chef with ID: ${id}`);
    // Implement edit logic or redirect
  };

  if (loading) {
    return <div>Loading chefs...</div>;
  }

  return (
    <div className="my-recipes-container">
      <AdminSidebar isAdmin={true} />
      <div className="my-recipes-table">
        <h1>All Chefs</h1>
        {chefs.length === 0 ? (
          <p>No chefs found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Speciality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chefs.map((chef) => (
                <tr key={chef.id}>
                  <td>{chef.fullName}</td>
                  <td>{chef.email}</td>
                  <td>{chef.speciality}</td>
                  <td>
                    <button onClick={() => handleBlock(chef.id)} className="edit-btn">
                      Block
                    </button>
                    <button
                      onClick={() => handleDelete(chef.id)}
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

export default AllChefs;
