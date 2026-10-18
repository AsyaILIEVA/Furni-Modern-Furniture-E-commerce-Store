import { Link } from "react-router-dom";

export default function WeHelpSection() {
  return (
    <div className="we-help-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img
                  src="/assets/images/img-grid-1.jpg"
                  alt="Comfortable, modern living room"
                />
              </div>

              <div className="grid grid-2">
                <img
                  src="/assets/images/img-grid-2.jpg"
                  alt="Furniture arranged in a contemporary interior"
                />
              </div>

              <div className="grid grid-3">
                <img
                  src="/assets/images/img-grid-3.jpg"
                  alt="Stylish details in a modern home"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5 ps-lg-5">
            <h2 className="section-title mb-4">
              Create a Space That Feels Like You
            </h2>

            <p>
              The right furniture can transform the way a room looks
              and feels. At Furni, you can explore pieces that balance
              contemporary style with the comfort and practicality
              you need for everyday living.
            </p>

            <ul className="list-unstyled custom-list my-4">
              <li>Explore furniture for different spaces and needs</li>
              <li>Compare product details and prices</li>
              <li>Discover designs that complement your interior</li>
              <li>Save time by browsing the collection online</li>
            </ul>

            <p>
              <Link to="/shop" className="btn">
                Explore the Collection
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}