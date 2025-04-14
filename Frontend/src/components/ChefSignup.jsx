import { useState } from "react";
import axios from "axios";
import "../style/signup.css"; // Ensure correct path for the CSS file
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const ChefSignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("FullName", fullName);
      formData.append("Email", email);
      formData.append("Password", password);
      formData.append("Bio", bio);
      formData.append("Speciality", speciality);
      if (picture) formData.append("Picture", picture);

      const response = await axios.post("http://localhost:7251/api/chef", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Signup successful!");
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Chef Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setPicture(e.target.files[0])}
        />

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

        <p className="login-link">
          Already have an account? <a href="/login">Log in here</a>
        </p>
      </form>
    </div>
  );
};

export default ChefSignupForm;
