import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container relative">

        <div className="sofa-img">
          <img
            src="/assets/images/sofa.png"
            alt="Modern sofa"
            className="img-fluid"
          />
        </div>

        <div className="row g-5 mb-5">

          <div className="col-lg-5">
            <div className="mb-4 footer-logo-wrap">
              <Link to="/" className="footer-logo">
                Furni<span>.</span>
              </Link>
            </div>

            <p className="mb-4">
              Discover modern furniture designed to bring
              comfort, elegance and style into your home.
              Explore our collection and find your perfect piece.
            </p>
          </div>

          <div className="col-lg-7">
            <div className="row links-wrap">

              <div className="col-6 col-sm-6">
                <h5>Explore</h5>
                <ul className="list-unstyled">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6">
                <h5>Information</h5>
                <ul className="list-unstyled">
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/cart">Shopping Cart</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-12 text-center">
              <p>
                Furni — Modern Furniture E-commerce Store.
                <br />
                Template designed by{" "}
                <a href="https://untree.co">Untree.co</a>
                {" "}and distributed by{" "}
                <a href="https://themewagon.com">
                  ThemeWagon
                </a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
