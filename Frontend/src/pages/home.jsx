import { useNavigate } from "react-router-dom"; 
import "../style/Home.css";
import bgImage from "../assets/hero-bg.jpeg";
import Recipe from "../components/Recipe";
import Chefs from "../components/Chefs";
import Testimonial from "../components/testimonial";
import Blogs from "../components/Blogs";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const navigate = useNavigate(); 

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
            <span>Welcome to the</span>
            <br />
            <span>World of Recipes</span>
          </h1>
          <p>
          Your ultimate source for amazing recipes and cooking inspiration from top chefs. Discover, learn, and cook with ease.
          </p>

          <button
            className="cta-button"
            onClick={() => navigate("/recipe-page")}
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
