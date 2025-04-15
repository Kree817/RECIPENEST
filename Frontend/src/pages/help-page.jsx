import { useState } from "react";
import "../style/Help.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Help = () => {
  const [query, setQuery] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query submitted:", query);
    // Handle the query submission here
  };

  const toggleFAQ = (index) => {
    setActiveFAQ((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "How do I add a recipe?",
      answer:
        "To add a recipe, go to the 'Add Recipe' section in the dashboard. Fill in the required fields like recipe name, ingredients, steps, and upload an image. Hit 'Save Recipe' when done.",
    },
    {
      question: "How do I edit my profile?",
      answer:
        "You can edit your profile by going to the 'Edit Profile' section in your dashboard. Here, you can update your name, email, bio, specialty, and upload a new profile picture.",
    },
    {
      question: "How can I add my favorite recipes?",
      answer:
        "To add a favorite recipe, simply click on the 'Favorite' button on any recipe card, and it will be added to your favorites list.",
    },
    {
      question: "What can I do as a chef?",
      answer:
        "As a chef, you can add recipes, manage your profile, interact with users, and showcase your culinary expertise. You can also receive ratings and reviews on your recipes.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "If you need assistance, feel free to reach out to us using the contact form below, or you can email us directly at support@recipenest.com.",
    },
  ];

  return (
    <div className="help-container">
      <div className="help-content">
        <h1>How Can We Help?</h1>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-header"
                onClick={() => toggleFAQ(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question">
                  <span className="faq-icon">
                    {activeFAQ === index ? <FaMinus /> : <FaPlus />}
                  </span>
                  <h3>{faq.question}</h3>
                </div>
                <div className="faq-answer">
                  {activeFAQ === index && <p>{faq.answer}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="contact-form">
          <h2>Need More Help? Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Describe your issue or question"
              value={query}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit Query</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
