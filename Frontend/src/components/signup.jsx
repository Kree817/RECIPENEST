import { useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Fetch the default profile image from the correct path
      const imageResponse = await fetch("/public/assets/images/default-profile.png");
      const blob = await imageResponse.blob();
      const defaultImage = new File([blob], "default-profile.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("picture", defaultImage); // Using default image if no image is uploaded

      const response = await axios.post("https://localhost:7251/api/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Signup successful!");
        window.location.href = "/login";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create your Account</h2>

        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="signup-btn">SIGN UP</button>

        <div className="divider">Or</div>

        <div className="social-buttons">
          <button type="button" className="social-btn google">
            <FaGoogle /> Log in with Google
          </button>
          <button type="button" className="social-btn facebook">
            <FaFacebookF /> Log in with Facebook
          </button>
        </div>

        <p className="login-link">Already have an account? <a href="/login">Log in here</a></p>
      </form>
    </div>
  );
};

export default SignupForm;
