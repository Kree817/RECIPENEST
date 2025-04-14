import { useState } from "react";
import { FaPen, FaEye, FaEyeSlash } from "react-icons/fa";
import Sidebar from "../components/chef-sidebar";
import "../style/ChefEditProfile.css";

const ChefEditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "John Cena",
    email: "john12@gmail.com",
    password: "",
    bio: "A passionate chef with a love for innovative cooking.",
    specialty: "Italian Cuisine",
    picture: null,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    // Logic for submitting the form
    console.log("Form submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="chef-edit-profile-container">
      <Sidebar isChef={true} />
      <div className="chef-profile-form">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile-picture">
            <img
              src={formData.picture ? URL.createObjectURL(formData.picture) : "/default-profile.png"}
              alt="Profile"
              className="profile-img"
            />
            <label htmlFor="picture" className="change-img-icon">
              <FaPen />
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-details">
            <div className="form-field">
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
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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
                value={formData.specialty}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button type="reset" className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChefEditProfile;
