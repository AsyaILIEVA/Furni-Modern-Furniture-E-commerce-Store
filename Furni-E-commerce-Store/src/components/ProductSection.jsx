import ProductCard from "./ProductCard";
import products from "../data/products";

export default function ProductSection({ addToCart }) {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">
              Crafted with excellent material.
            </h2>

            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
            </p>

            <p>
              <a href="/shop" className="btn">
                Explore
              </a>
            </p>
          </div>

          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              onAddToCart={() => addToCart(product)}            />
          ))}
        </div>
      </div>
    </div>
  );
}