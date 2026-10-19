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
    let active = true;

    async function getProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .maybeSingle();

        if (error) throw error;

        if (active) {
          if (!data) {
            setError("This product could not be found.");
          } else {
            setProduct(data);
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load this product.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    getProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  async function handleDelete() {
    if (!isOwner || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    setActionError("");

    try {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id)
        .eq("owner_id", user.id)
        .select("id");

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error("Product could not be deleted.");
      }

      navigate("/shop");
    } catch (err) {
      setActionError(err.message || "Could not delete this product.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading || authLoading) {
    return (
      <div className="container py-5" role="status">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <p role="alert">{error || "Product not found."}</p>

        <Link to="/shop" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isOwner = user && product.owner_id === user.id;

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid rounded-3"
            />
          </div>

          <div className="col-md-6">
            <h1 className="mb-3">{product.name}</h1>

            <p className="product-price fs-4 fw-bold">
              ${Number(product.price).toFixed(2)}
            </p>

            <p className="mb-3">
              <strong>Category:</strong>{" "}
              {product.category || "Uncategorized"}
            </p>

            <p className="mb-4">
              {product.description || "No description available."}
            </p>

            {actionError && (
              <p className="text-danger" role="alert">
                {actionError}
              </p>
            )}

            {isOwner && (
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="btn btn-primary"
                >
                  Edit Product
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete Product"}
                </button>
              </div>
            )}

            <Link to="/shop" className="btn btn-outline-secondary">
              Back to Catalog
            </Link>
          </div>
        </div>

        <ProductComments productId={product.id} />
      </div>
    </div>
  );
}