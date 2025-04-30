import { useState, useEffect } from "react";
import AdminSidebar from "../admin-components/admin-sidebar";
import "../style/MyRecipes.css"; // Reuse if you have a common table style
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7251/api/blog");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7251/api/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Block blog with ID: ${id}`);
    // Add navigation or editing logic
  };

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <div className="my-recipes-container">
      <AdminSidebar isadmin={true} />
      <div className="my-recipes-table">
        <h1>All Blogs</h1>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
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
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.tag}</td>
                  <td>
                    <button onClick={() => handleEdit(blog.id)} className="edit-btn">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
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

export default AllBlogs;
