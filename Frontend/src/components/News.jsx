import React from "react";
import "../style/News.css";
import blogImage from "../assets/blog1.jpeg";

const newsList = [
    {
      title: "Broad bean and goats’ cheese bruschetta",
      date: "May 21, 2021",
      comments: "2 Comments",
      image: blogImage,
    },
    {
      title: "Broad bean and goats’ cheese bruschetta",
      date: "May 21, 2021",
      comments: "2 Comments",
      image: blogImage,
    },
    {
      title: "Broad bean and goats’ cheese bruschetta",
      date: "May 21, 2021",
      comments: "2 Comments",
      image: blogImage,
    },
  ];

const News = () => {
  return (
    <section className="news-section">
      <p className="news-subtitle">News & Blogs</p>
      <h2 className="news-title">Our Fruitsome Blog</h2>
      <p className="news-description">
        Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et.
      </p>

      <div className="news-grid">
        {newsList.map((news, index) => (
          <div className="news-card" key={index}>
            <img src={news.image} alt={news.title} className="news-image" />
            <div className="news-content">
              <span className="news-tag">SMOOTHIE</span>
              <h3 className="news-heading">{news.title}</h3>
              <div className="news-meta">
                <span>{news.date}</span>
                <span>• {news.comments}</span>
                <span>• Share</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
