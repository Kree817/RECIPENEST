import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../style/blog-page.css"; // Import Blog page styles

const API_URL = "http://localhost:7251/api/blog"; // Backend URL to fetch blogs data

const BlogPage = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  // Fetch blogs data from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setFilteredBlogs(res.data); // Initially set filteredBlogs to all blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle click to navigate to BlogDetails page
  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);  // Navigate to the blog details page with the blog ID
  };

  return (
    <div>
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>
            <span>Our Latest Blogs</span>
          </h1>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-grid">
          {currentBlogs.map((blog) => (
            <div className="blog-card" key={blog.id} onClick={() => handleBlogClick(blog.id)}>
              <div className="blog-img-wrapper">
                {/* Display blog's image if available */}
                {blog.image && (
                  <img
                    src={`data:image/jpeg;base64,${blog.image}`}  // Correct base64 image rendering
                    alt={blog.title}
                  />
                )}
              </div>
              <p className="blog-title">{blog.title}</p>
              <p className="blog-tag">{blog.tag}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
