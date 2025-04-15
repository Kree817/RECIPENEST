import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import { useUser } from "../context/UserContext"; // Import useUser hook for global user state
import "../style/login.css"; // Ensure correct path for the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Track the email input
  const [password, setPassword] = useState(""); // Track the password input
  const [error, setError] = useState(""); // Store any error messages
  const navigate = useNavigate(); // For programmatic navigation
  const { setUser } = useUser(); // Access the setUser function from context to set logged-in user

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error message on every submit

    try {
      // Send login request to the backend API
      const response = await axios.post("http://localhost:7251/api/auth/login", {
        email,
        password,
      });

      // Check if the login was successful
      if (response.status === 200) {
        // Assuming the response contains the token and chef ID
        const { token, chefId } = response.data;

        // Log the response to check the structure
        console.log("Login Response:", response.data);

        // Store the JWT token in localStorage for future requests
        localStorage.setItem("authToken", token);
        localStorage.setItem("chefId", chefId);  // Store chefId in localStorage for further use

        // Log token and chefId for debugging
        console.log("Token saved:", token);
        console.log("Chef ID saved:", chefId);

        // Set the global user state with chef ID
        setUser(chefId);

        // Print the user ID in the console
        console.log("Logged in chef ID:", chefId);

        // Redirect to the chef's dashboard
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
        <h2>Log In to your Chef Account</h2>
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
            Google
          </button>
          <button type="button" className="social-btn facebook">
            Facebook
          </button>
        </div>

        <p className="signup-link">
          New Chef? <a href="/chef-signup">SIGN UP HERE</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
