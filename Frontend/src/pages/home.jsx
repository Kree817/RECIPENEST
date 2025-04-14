import "../style/Home.css";
import bgImage from "../assets/hero-bg.jpeg";
import Recipe from "../components/Recipe";
import Chefs from "../components/Chefs";
import Testimonial from "../components/testimonial";
import News from "../components/News";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";

const Home = () => {
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
          <span>Heathly</span>
          <br />
          <span>Smoothie</span>
        </h1>
        <p>
          Consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        </p>
        <button className="cta-button">
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
    <News />
  <ImageSlider />
  <Footer />
  </div>

  
  );
};

export default Home;
