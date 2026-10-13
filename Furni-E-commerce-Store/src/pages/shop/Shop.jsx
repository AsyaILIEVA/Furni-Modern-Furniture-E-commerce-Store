import { Link } from "react-router-dom";
import ProductList from "../../components/product-list/ProductList";

export default function Shop({ addToCart }) {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Furniture Catalog</h1>
                <p>Explore our collection of furniture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-5">
        <h2 className="mb-3">Shop by Category</h2>

        <Link
          to="/shop/category/Chair"
          className="btn btn-outline-secondary"
        >
          Chairs
        </Link>
      </div>

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            <ProductList addToCart={addToCart} />
          </div>
        </div>
      </div>
    </>
  );
}