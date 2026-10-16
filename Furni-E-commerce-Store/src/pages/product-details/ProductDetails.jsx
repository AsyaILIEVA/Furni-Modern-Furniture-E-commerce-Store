import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import ProductComments from "../../components/product-comments/ProductComments";

export default function ProductDetails() {
  const { productId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError("Product not found.");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError(err.message || "Could not load this product.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [productId]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setActionError("");

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id)
        .eq("owner_id", user.id);

      if (error) throw error;

      navigate("/shop");
    } catch (err) {
      setActionError(err.message || "Could not delete this product.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading || authLoading) {
    return <div className="container py-5">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <p>{error || "Product not found."}</p>
        <Link to="/shop" className="btn btn-primary">
          Back to catalog
        </Link>
      </div>
    );
  }

  const isOwner = user && product.owner_id === user.id;

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

            <p>{product.description || "No description available."}</p>

            {actionError && (
              <p className="text-danger" role="alert">
                {actionError}
              </p>
            )}

            {isOwner && (
              <div className="mb-3">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="btn btn-primary me-2"
                >
                  Edit Product
                </Link>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete Product"}
                </button>
              </div>
            )}

            <Link to="/shop" className="btn btn-outline-secondary">
              Back to catalog
            </Link>
          </div>
        </div>

        <ProductComments productId={product.id} />
      </div>
    </div>
  );
}

