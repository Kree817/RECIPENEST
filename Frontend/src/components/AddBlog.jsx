import { useState } from "react";
import Sidebar from "./chef-sidebar"; // Reusable sidebar component
import "../style/AddBlog.css";
import axios from "axios";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    image: null,
    content: "",
  });

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file changes (image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Blog submitted:", formData); // Log the data before submission

    // Create FormData to submit blog data to the backend
    const blogData = new FormData();
    blogData.append("Title", formData.title);
    blogData.append("Tag", formData.tag);
    blogData.append("Content", formData.content);
    blogData.append("Image", formData.image);

    try {
      const response = await axios.post("http://localhost:7251/api/blog", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the success response
      console.log("Blog added successfully:", response);
      alert("Blog added successfully!");
      // Optionally redirect to another page
    } catch (err) {
      console.error("Error submitting blog:", err.response?.data || err);
      alert("Failed to add blog.");
    }
  };

  return (
    <div className="add-blog-container">
      <Sidebar isChef={true} /> {/* Sidebar component for navigation */}
      <div className="add-blog-form">
        <h1>Add New Blog</h1>
        <form onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="form-field">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Blog Tag */}
          <div className="form-field">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Blog Image */}
          <div className="form-field">
            <label htmlFor="image">Blog Image</label>
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

          {/* Blog Content */}
          <div className="form-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save Blog
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

export default AddBlog;
