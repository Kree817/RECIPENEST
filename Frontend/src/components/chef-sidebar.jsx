import { Link } from "react-router-dom";
import "../style/Sidebar.css"; // Import your CSS file for styling

const ChefSidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/chef/edit-profile" className="sidebar-item">✏️ Edit Profile</Link>
      <Link to="/chef/add-recipe" className="sidebar-item">➕ Add Recipe</Link>
        <Link to="/chef/add-blog" className="sidebar-item">📝 Add Blog</Link>
      {/* <Link to="/favorite" className="sidebar-item">❤️ Favorite</Link> */}
      <Link to="/help" className="sidebar-item">❓ Help</Link>
    </div>
  );
};

export default ChefSidebar;
