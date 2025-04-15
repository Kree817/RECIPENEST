import { useState } from "react";
import "../style/ContactUs.css";
import { FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission (e.g., send an email or store the query)
  };

  return (
    <div>
    <div>
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>
            <span>Contact Us</span>
          </h1>
        </div>
      </section>
    </div>
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h1>Get In Touch</h1>
        <h2>Say Hi</h2>
        <p>
          We would love to hear from you! Whether you have a question, feedback, or just want to chat about food, drop us a message. We are here to help and ensure your experience is amazing.
        </p>
      </div>
      <div className="contact-us">

      <div className="contact-us-form">
        <h3>Drop us a line</h3>
        <p>Your email address will not be published. Required fields are marked *</p>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            <FaPaperPlane /> Send
          </button>
        </form>
      </div>

      <div className="contact-us-info">
        {/* Contact Information */}
        <div className="contact-info">
          <h3>Contact Info</h3>
          <p><strong>PCPS College</strong></p>
          <p>123 Main Road, Lalitpur, Nepal</p>
          <p>+977 9876543210</p>
          <p>contact@pcps.edu.np</p>

          {/* Opening Hours */}
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 09:00 - 18:00</p>
          <p>Saturday: 10:00 - 14:00</p>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
