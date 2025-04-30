import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../style/login.css";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:7251/api/AdminAuth/adminlogin", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, adminUserId } = response.data;

        console.log("Login Response:", response.data);

        localStorage.setItem("authToken", token);
        localStorage.setItem("adminUserId", adminUserId);

        console.log("Token saved:", token);
        console.log("Admin ID saved:", adminUserId);

        setUser(adminUserId);

        console.log("Logged in admin ID:", adminUserId);

        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">LOG IN</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
