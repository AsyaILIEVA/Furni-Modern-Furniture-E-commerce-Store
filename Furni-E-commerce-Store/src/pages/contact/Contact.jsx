
import { useState } from "react";
import HeroSection from "../../components/hero-section/HeroSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert(`Thank you, ${formData.firstName}! Your message has been entered.`);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  }

  return (
    <>
      <HeroSection
        title="Contact Us"
        description="Have a question? We'd love to hear from you."
      />

      <div className="untree_co-section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-control"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12">
                <button className="btn btn-primary" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}