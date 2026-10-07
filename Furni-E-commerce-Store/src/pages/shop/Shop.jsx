import ProductSection from "../../components/product-section/ProductSection";

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

      <ProductSection addToCart={addToCart} />
    </>
  );
}