import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/BlogDetail.css"; // CSS for styling the Blog Detail page
import Blogs from "./Blogs"; // Importing the Blogs component

const API_URL = "http://localhost:7251/api/blog"; // Backend URL to fetch a single blog

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to store the blog details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


  // Fetch blog data based on the ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`); // Fetch the blog by ID
        setBlog(response.data); // Set the blog data to state
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found!"); // Handle errors
      } finally {
        setLoading(false); // Stop loading once the request is done
      }
    };

    if (id) {
      fetchBlog(); // Fetch the blog if the ID exists
    } else {
      setError("Invalid blog ID");
      setLoading(false);
    }
  }, [id]); // Run this effect when the blog ID changes

  // Show loading or error message while fetching the data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there's an issue
  }

  // Ensure the `tag` field is always an array
  const tags = Array.isArray(blog.tag) ? blog.tag : [blog.tag]; // Convert to array if it's not

  // Render blog details if the data is available
  return (
    <div>
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <div className="blog-tags">
        {tags.map((tag, index) => (
          <span key={index} className="blog-tag">{tag}</span> // Display tags
        ))}
      </div>
      <div className="blog-image">
        <img src={`data:image/jpeg;base64,${blog.image}`} alt={blog.title} />
      </div>
      <div className="blog-content">
        <p>{blog.content}</p> {/* Display blog content */}
      </div>
</div>

      <div>
      <Blogs/>
      </div>

    </div>
    
  );
};

export default BlogDetail;
