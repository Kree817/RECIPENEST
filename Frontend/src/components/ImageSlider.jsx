import { useState } from "react";
import "../style/ImageSlider.css";
import food1 from "../assets/food1.jpeg";
import blog1 from "../assets/blog1.jpeg";

const images = [food1, blog1, food1, blog1, food1, blog1, food1, blog1];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 5; // laptops/desktops
    if (width >= 768) return 3;  // tablets
    return 1;                    // mobile
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % images.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  const getVisibleImages = () => {
    const count = visibleCount();
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(images[(currentIndex + i) % images.length]);
    }
    return result;
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="slider-wrapper">
      <button className="nav-btn left" onClick={prevSlide}>
        &#8592;
      </button>

      <div className="slider-container">
        <div className="slider-track">
          {visibleImages.map((img, index) => (
            <div className="slide" key={index}>
              <img src={img} alt={`slide-${index}`} />
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn right" onClick={nextSlide}>
        &#8594;
      </button>
    </div>
  );
};

export default ImageSlider;
