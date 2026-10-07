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
            <h2>Shopping Cart</h2>
          </div>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="row">
              {cart.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card h-100">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.name}
                    />

                    <div className="card-body">
                      <h3 className="h5">{product.name}</h3>

                      <p>
                        ${Number(product.price).toFixed(2)}
                      </p>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </button>

                        <span>{product.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger mt-3"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-4">
              <div className="col-md-6 ms-auto">
                <div className="border p-4">
                  <h3 className="h5">Cart Total</h3>

                  <strong>
                    ${cartTotal.toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}