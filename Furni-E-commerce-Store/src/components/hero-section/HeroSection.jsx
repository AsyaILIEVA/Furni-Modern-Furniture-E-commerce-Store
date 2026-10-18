
import { Link } from "react-router-dom";

export default function HeroSection({
  title = "Beautiful Furniture for Everyday Living",
  description = "Discover Furni's collection of thoughtfully designed furniture. Bring comfort, style, and personality into every corner of your home.",
}) {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>{title}</h1>

              <p className="mb-4">{description}</p>

              <p>
                <Link to="/shop" className="btn btn-secondary me-2">
                  Shop Now
                </Link>

                <Link to="/about" className="btn btn-white-outline">
                  Our Story
                </Link>
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img
                src="/assets/images/couch.png"
                className="img-fluid"
                alt="Modern sofa"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}