
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (error) {
        setError("Could not load this product.");
      } else if (!data) {
        setError("Product not found.");
      } else {
        setProduct(data);
      }

      setLoading(false);
    }

    getProduct();
  }, [productId]);

  if (loading) {
    return <div className="container py-5">Loading product...</div>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <p>{error}</p>
        <Link to="/shop" className="btn btn-primary">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid"
            />
          </div>

          <div className="col-md-6">
            <h1>{product.name}</h1>

            <p className="product-price">
              ${Number(product.price).toFixed(2)}
            </p>

            <p>Category: {product.category || "Uncategorized"}</p>

            <p>
              {product.description || "No description available."}
            </p>

            <Link to="/shop" className="btn btn-primary">
              Back to catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}