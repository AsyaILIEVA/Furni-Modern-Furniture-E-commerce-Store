export default function ProductCard({ product, onAddToCart }) {
  
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
      <div className="product-item">
        <img
          src={product.imageUrl}
          className="img-fluid product-thumbnail"
          alt={product.name}
        />

        <h3 className="product-title">
          {product.name}
        </h3>

        <strong className="product-price">
          ${Number(product.price).toFixed(2)}
        </strong>

        <button
          type="button"
          className="icon-cross"
          onClick={onAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <img
            src="/assets/images/cross.svg"
            className="img-fluid"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}