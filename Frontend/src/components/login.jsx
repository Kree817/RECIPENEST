import { useState } from "react";
import axios from "axios";
import "../style/login.css"; // Ensure correct path for the CSS file
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Use React Router's navigate hook

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Used for programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Make login request (make sure the correct API URL is used)
      const response = await axios.post("http://localhost:7251/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Store JWT token in localStorage (or sessionStorage) for session management
        localStorage.setItem("authToken", response.data.token);

        alert("Login successful!");
        // Redirect user to dashboard or relevant page
        navigate("/chef-dashboard"); 
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Log In to your Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">CONTINUE</button>

        <div className="divider">Or</div>

        <div className="social-buttons">
          <button type="button" className="social-btn google">
            <FaGoogle /> Log in with Google
          </button>
          <button type="button" className="social-btn facebook">
            <FaFacebookF /> Log in with Facebook
          </button>
        </div>

        <p className="signup-link">
          New User? <a href="/chef-signup">SIGN UP HERE</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
