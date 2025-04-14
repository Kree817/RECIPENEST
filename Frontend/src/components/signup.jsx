import { useState } from "react";
import axios from "axios";
import "../style/signup.css";
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
      // Fetch default image and convert to Base64
      const imageResponse = await fetch("/assets/images/default-profile.png");
      const blob = await imageResponse.blob();

      const base64Image = await convertBlobToBase64(blob);

      const data = {
        fullName,
        email,
        password,
        picture: base64Image, 
      };

      const response = await axios.post("http://localhost:7251/api/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Signup successful!");
        window.location.href = "/login"; 
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  // Convert Blob to Base64
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
