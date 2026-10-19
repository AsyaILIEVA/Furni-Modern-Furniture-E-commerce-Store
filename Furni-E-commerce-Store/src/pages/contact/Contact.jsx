import { useState } from "react";
import HeroSection from "../../components/hero-section/HeroSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);

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
        title="Get in Touch"
        description="Have a question about Furni or our furniture collection? Use the form below to write your message."
      />

      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8">
              <h2 className="section-title">Send Us a Message</h2>
              <p>
                Complete the form below with your contact details
                and message.
              </p>
            </div>
          </div>

          {submitted && (
            <div className="alert alert-info" role="status">
              Your form was submitted in this session, but the message
              has not been sent or saved. Contact form delivery has
              not been connected yet.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="form-control"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
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
                  autoComplete="family-name"
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
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="message">How can we help?</label>
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
                  Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}