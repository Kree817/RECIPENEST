import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { useUser } from "../context/UserContext"; // Access user context
import Sidebar from "../components/chef-sidebar"; // Import Sidebar component
import "../style/ChefEditProfile.css"; // Ensure the correct CSS file is linked

const ChefEditProfile = () => {
  const { userId } = useUser(); // Access the logged-in user's ID from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    specialty: "",
    picture: null,
    password: "",
  });
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    // Fetch current user data when the component mounts
    if (userId) {
      axios.get(`http://localhost:7251/api/chef/${userId}`)
        .then(response => {
          const chef = response.data;
          setFormData({
            fullName: chef.fullName,
            email: chef.email,
            bio: chef.bio,
            specialty: chef.speciality,
            picture: chef.picture,
            password: "",
          });
        })
        .catch(error => {
          console.error("Error fetching chef data:", error);
        });
    } else {
      navigate("/login"); // Redirect to login if no userId
    }
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Add form fields to FormData
    formDataToSend.append("FullName", formData.fullName);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Bio", formData.bio);
    formDataToSend.append("Speciality", formData.speciality);
    formDataToSend.append("Password", formData.password);
    if (formData.picture) {
      formDataToSend.append("Picture", formData.picture);
    }

    axios.put(`http://localhost:7251/api/chef/${userId}`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        console.log("Profile updated successfully:", response.data);
        alert("Profile updated successfully");
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        alert("There was an error updating your profile.");
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="chef-edit-profile-container">
            <Sidebar isChef={true} /> {/* Sidebar component for navigation */}
      <form className="chef-profile-form" onSubmit={handleSubmit}>
        <div className="form-field">
        <h1>Edit Your Profile</h1>

          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field password-field">
          <label htmlFor="password">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <span onClick={togglePasswordVisibility}>
            {isPasswordVisible ? "Hide" : "Show"}
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.speciality}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="picture">Profile Picture</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="reset" className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ChefEditProfile;
