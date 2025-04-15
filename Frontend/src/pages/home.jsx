import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style/Home.css";
import bgImage from "../assets/hero-bg.jpeg";
import Recipe from "../components/Recipe";
import Chefs from "../components/Chefs";
import Testimonial from "../components/testimonial";
import Blogs from "../components/Blogs";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
        }}
      >
        <div className="hero-content">
          <h1>
            <span>Healthy</span>
            <br />
            <span>Smoothie</span>
          </h1>
          <p>
            Consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>

          <button
            className="cta-button"
            onClick={() => navigate("/recipe-page")} // Correct the navigation function
          >
            <span role="img" aria-label="fruit">
              🍑
            </span>{" "}
            Find Recipe
          </button>
        </div>
      </section>

      <Recipe />
      <Chefs />
      <Testimonial />
      <Blogs />
      <ImageSlider />    </div>
  );
};

export default Home;
