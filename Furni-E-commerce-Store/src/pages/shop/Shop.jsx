import ProductList from "../../components/product-list/ProductList";

export default function Shop({ addToCart }) {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shop</h1>
              </div>
            </div>
          </div>
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