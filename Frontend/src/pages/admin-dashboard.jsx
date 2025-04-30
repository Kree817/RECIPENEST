import { useState, useEffect } from "react";
import Sidebar from "../admin-components/admin-sidebar"; // Update to admin sidebar if different
import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";

const AdminDashboard = () => {
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    chefs: 0,
    recipes: 0,
    blogs: 0,
  });

  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    const storedAdminId = localStorage.getItem("adminUserId");

    if (!storedAdminId) {
      navigate("/admin-login");
    } else {
      setAdminId(storedAdminId);
    }
  }, [navigate, userId]);

  useEffect(() => {
    if (adminId) {
      const fetchStats = async () => {
        try {
          const [chefRes, recipeRes, blogRes] = await Promise.all([
            axios.get("http://localhost:7251/api/chef"),
            axios.get("http://localhost:7251/api/recipe"),
            axios.get("http://localhost:7251/api/blog"),
          ]);

          setStats({
            chefs: chefRes.data.length,
            recipes: recipeRes.data.length,
            blogs: blogRes.data.length,
          });

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [adminId]);

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2>Welcome Admin!</h2>
        <div className="dashboard-stats">
          <div className="stat-box chefs">
            <h3>Total Chefs</h3>
            <p>{stats.chefs}</p>
          </div>
          <div className="stat-box recipes">
            <h3>Total Recipes</h3>
            <p>{stats.recipes}</p>
          </div>
          <div className="stat-box blogs">
            <h3>Total Blogs</h3>
            <p>{stats.blogs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;