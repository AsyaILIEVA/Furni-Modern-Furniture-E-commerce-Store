import ProductCard from "./ProductCard";

export default function ProductSection() {
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

          <ProductCard
            image="/assets/images/product-1.png"
            name="Nordic Chair"
            price={50}
          />

          <ProductCard
            image="/assets/images/product-2.png"
            name="Kruzo Aero Chair"
            price={78}
          />

          <ProductCard
            image="/assets/images/product-3.png"
            name="Ergonomic Chair"
            price={43}
          />

        </div>
      </div>
    </div>
  );
}