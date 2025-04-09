import PropTypes from "prop-types"; // PropTypes for validation
import { useState } from 'react';

const RecipeCard = ({ image, title, reviews }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`recipe-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img className="recipe-image" src={image} alt={title} />
        <button className="favorite-btn">
          <i className="fa fa-heart"></i>
        </button>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-reviews">{reviews} reviews</p>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
};

const RecipeSection = () => {
  const recipes = [
    { id: 1, image: "/assets/images/login-bg.jpg", title: "Sauteed Veggies", reviews: 500 },
    { id: 2, image: "/assets/images/login-bg.jpg", title: "Pancake", reviews: 250 },
    { id: 3, image: "/assets/images/login-bg.jpg", title: "Boba Drinks", reviews: 300 },
    { id: 4, image: "/assets/images/login-bg.jpg", title: "Healthy Bowl", reviews: 150 },
    { id: 5, image: "/assets/images/login-bg.jpg", title: "Tacos", reviews: 400 },
    { id: 6, image: "/assets/images/login-bg.jpg", title: "Ice Cream", reviews: 350 },
  ];

  return (
    <div className="recipe-section-container">
      <div className="recipe-section">
        <h2 className="section-title">Top Recipes</h2>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
              reviews={recipe.reviews}
            />
          ))}
        </div>
        <div className="view-all-recipes">
          <a href="/recipes" className="view-all-btn">View All Recipes</a>
        </div>
      </div>
    </div>
  );
};

export default RecipeSection;
