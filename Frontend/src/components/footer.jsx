import React from "react";
import "../style/Footer.css";
import footerBg from "../assets/footerimg.jpeg";
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="footer-overlay">
        <div className="footer-container">
          {/* Contact Us */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Kandevtasthan, Kupondole,<br />Lalitpur, Nepal</p>
            <p>📧 <a href="mailto:recipenest@gmail.com">recipenest@gmail.com</a></p>
            <p>📞 <a href="tel:+9779876543210">(977) 9876543210</a></p>
          </div>

          {/* Useful Links */}
          <div className="footer-column">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/terms">Terms Of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-column">
            <h3>Follow Us Now</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
              <li><a href="https://dribbble.com" target="_blank" rel="noopener noreferrer"><FaDribbble /> Dribbble</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="footer-column">
            <h3>Subscribe</h3>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe Now</button>
          </div>
        </div>

        <p className="footer-bottom">© 2025 RecipeNest All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
