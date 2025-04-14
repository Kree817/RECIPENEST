import { useState } from "react";
import "../style/Testimonial.css";
import profileImage from "../assets/testimonial-img1.jpeg";
import profileImage2 from "../assets/chef1.jpeg";
import profileImage3 from "../assets/food1.jpeg";

const testimonials = [
    {
      name: "Meredith Grant",
      role: "Host Mother",
      text: "Lorem ipsum dolor sit amet...",
      image: profileImage, // 👈 Add image path here
    },
    {
      name: "Daniel King",
      role: "Food Blogger",
      text: "Ut enim ad minim veniam...",
      image: profileImage2, // Replace with another image if you have
    },
    {
      name: "Sophia Lee",
      role: "Chef's Assistant",
      text: "Duis aute irure dolor...",
      image: profileImage3, // Replace with another image if needed
    },
  ];
  
const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="testimonial-section">
      <p className="testimonial-sub">Testimonial</p>
      <h2 className="testimonial-title">What People Say</h2>

      <div className="testimonial-content">
      <img src={current.image} alt={current.name} className="testimonial-img" />
      <p className="testimonial-text">“{current.text}”</p>
        <p className="testimonial-author">
          <span className="highlight">{current.name}</span> – {current.role}
        </p>
      </div>

      <div className="testimonial-controls">
        <button onClick={prevSlide}>⬅</button>
        <button onClick={nextSlide}>➡</button>
      </div>
    </section>
  );
};

export default Testimonial;
