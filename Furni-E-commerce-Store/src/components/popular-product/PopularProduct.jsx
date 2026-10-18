import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        setError("Could not load popular products.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="popular-product">
      <div className="container">
        <h2 className="section-title mb-4">Discover More Furniture</h2>

        {loading && <p>Loading products...</p>}

        {error && (
          <p className="text-danger" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products available yet.</p>
        )}

        {!loading && !error && (
          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
              >
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </div>

                  <div className="pt-3">
                    <h3>{product.name}</h3>

                    <p>
                      {product.description ||
                        "Explore this furniture piece and discover its details."}
                    </p>

                    <p>
                      <Link to={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}