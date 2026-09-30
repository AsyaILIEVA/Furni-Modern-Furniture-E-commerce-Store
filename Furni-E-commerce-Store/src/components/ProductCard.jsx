export default function ProductCard({
    image, 
    name, 
    price,
    onAddToCart
 }) {
    const product = { image, name, price };

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
      <a className="product-item" href="/cart">
        <img
          src={image}
          className="img-fluid product-thumbnail"
          alt={name}
        />

        <h3 className="product-title">{name}</h3>

        <strong className="product-price">
          ${price.toFixed(2)}
        </strong>

        <button
          className="btn btn-primary mt-3"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>

        <span className="icon-cross">
          <img
            src="/assets/images/cross.svg"
            className="img-fluid"
            alt=""
          />
        </span>
      </a>
    </div>
  );
}