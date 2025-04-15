import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import "../style/blog.css"; // Assuming your styles are already correct

const Blogs = () => {
  const [blogsList, setBlogsList] = useState([]); // State to store blog data
  const [loading, setLoading] = useState(true);   // State to handle loading
  const [error, setError] = useState(null);       // State to handle errors
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    // Fetch data from the backend API
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7251/api/blog"); // Replace with your actual API URL

        // Log the entire response to the console for debugging
        console.log("API Response:", response);

        // Check if response.data is structured as expected
        if (response.data && response.data.chefBlogs) {
          console.log("Chef Blogs:", response.data.chefBlogs); // Log the chefBlogs data
          setBlogsList(response.data.chefBlogs); // Assuming the data comes in the "chefBlogs" key
        } else if (response.data) {
          console.log("Received data:", response.data); // Log the raw data structure if "chefBlogs" is not found
          setBlogsList(response.data); // Update with whatever data is returned
        } else {
          setError("No blogs found.");
          console.log("No blogs found in response.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error fetching blogs.");
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchBlogs();
  }, []);

  // If still loading, show loading state
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  // If there is an error, show the error message
  if (error) {
    return <p>{error}</p>;
  }

  // Handle click to navigate to BlogDetails page
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);  // Navigate to the blog detail page with the blog ID
  };

  return (
    <section className="blogs-section">
      <p className="blogs-subtitle">Blogs & News</p>
      <h2 className="blogs-title">Our Fruitsome Blog</h2>
      <p className="blogs-description">
        Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et.
      </p>

      <div className="blogs-grid">
        {blogsList.length > 0 ? (
          blogsList.map((blog, index) => {
            // Ensure tags are in array form, if not, fallback to an empty array or default tag
            const tags = Array.isArray(blog.tag) ? blog.tag : [blog.tag || "No Tag"];
            
            return (
              <div className="blogs-card" key={index} onClick={() => handleBlogClick(blog.id)}>
                {/* If the blog has an image, display it */}
                {blog.image && (
                  <img
                    src={`data:image/jpeg;base64,${blog.image}`} // Render image from base64 byte array
                    alt={blog.title}
                    className="blogs-image"
                  />
                )}
                <div className="blogs-content">
                  <div className="blogs-tags">
                    {tags.map((tag, index) => (
                      <span className="blogs-tag" key={index}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="blogs-heading">{blog.title}</h3>
                  <div className="blogs-meta">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>• {blog.comments || "0 Comments"}</span>
                    <span>• Share</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No blogs available.</p> // Fallback message if no blogs are present
        )}
      </div>
    </section>
  );
};

export default Blogs;
