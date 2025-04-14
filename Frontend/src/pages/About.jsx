// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../style/About.css';

const About = () => {
  return (
    <>
      <Navbar />
      <section className="about">
        <h1>About Us</h1>
        <p>
          Welcome to MyRecipeApp! We’re a community of food lovers who share and explore new recipes every day.
        </p>
        <p>
          Whether you're a beginner or a pro, there's always something delicious to discover.
        </p>
      </section>
    </>
  );
};

export default About;
