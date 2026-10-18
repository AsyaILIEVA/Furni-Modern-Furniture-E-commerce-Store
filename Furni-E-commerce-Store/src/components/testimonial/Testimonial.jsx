
import { Link } from "react-router-dom";

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="section-title mb-4">
              Our Design Philosophy
            </h2>

            <blockquote className="mb-4">
              <p className="fs-5">
                A beautiful home is built around the moments that
                matter. We believe furniture should bring together
                comfort, simplicity, and thoughtful design to create
                spaces you'll enjoy every day.
              </p>
            </blockquote>

            <p className="mb-4">
              At Furni, our goal is to make discovering furniture
              simple and inspiring, whether you're refreshing one
              corner or reimagining an entire room.
            </p>

            <Link to="/shop" className="btn btn-primary">
              Discover Our Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}