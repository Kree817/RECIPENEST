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


// PropTypes for validation
RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  reviews: PropTypes.number.isRequired,
};

export default RecipeCard;
