
import { Link } from "react-router-dom";

export default function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const cartTotal = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0
  );

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <h1 className="section-title">Your Shopping Cart</h1>
            <p>Review your selected furniture before continuing.</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="h4 mb-3">Your cart is waiting for you</h2>
            <p className="mb-4">
              Explore the Furni collection and add something you love.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Browse Furniture
            </Link>
          </div>
        ) : (
          <>
            <div className="row">
              {cart.map((product) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.name}
                    />

                    <div className="card-body d-flex flex-column">
                      <h2 className="h5">{product.name}</h2>

                      <p className="fw-semibold mb-3">
                        ${Number(product.price).toFixed(2)}
                      </p>

                      <div
                        className="d-flex align-items-center gap-3"
                        aria-label={`Quantity for ${product.name}`}
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQuantity(product.id)}
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          −
                        </button>

                        <span aria-live="polite">{product.quantity}</span>

                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQuantity(product.id)}
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-danger mt-3 align-self-start"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-4">
              <div className="col-md-6 col-lg-5 ms-auto">
                <div className="border rounded-3 p-4">
                  <h2 className="h5 mb-3">Order Summary</h2>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>Items ({cart.reduce((count, product) => count + product.quantity, 0)})</span>
                    <strong>${cartTotal.toFixed(2)}</strong>
                  </div>

                  <p className="small text-muted">
                    This is a shopping cart total, not a completed order.
                  </p>

                  <Link to="/shop" className="btn btn-primary w-100">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}