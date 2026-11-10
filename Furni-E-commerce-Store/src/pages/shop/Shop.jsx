import { Link } from "react-router-dom";
import ProductList from "../../components/product-list/ProductList";

export default function Shop({ addToCart }) {
  const categories = [
{ name: "Chairs", path: "Chair" },
{ name: "Sofas", path: "Sofa" },
{ name: "Tables", path: "Table" },
];
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

        <div className="d-flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={`/shop/category/${category.path}`}
                className="btn btn-outline-secondary"
              >
                {category.name}
              </Link>
            ))}
        </div>
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