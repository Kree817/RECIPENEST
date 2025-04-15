import { useState } from "react";
import Sidebar from "../components/chef-sidebar"; // Reusable sidebar component
import "../style/ManageBlogs.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "How to Make the Perfect Pizza",
      tag: "Italian Cuisine",
    },
    {
      id: 2,
      title: "Mastering the Art of Sushi",
      tag: "Japanese Cuisine",
    },
    {
      id: 3,
      title: "The Secret to Delicious Pasta",
      tag: "Italian Cuisine",
    },
  ]);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit blog with ID: ${id}`);
    // Logic to navigate or open the edit page can go here
  };

  return (
    <div className="manage-blogs-container">
      <Sidebar isChef={true} />
      <div className="manage-blogs-table">
        <h1>Manage Blogs</h1>
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
      </div>
    </div>
  );
};

export default ManageBlogs;
