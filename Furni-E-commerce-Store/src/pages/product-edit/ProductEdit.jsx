import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function ProductEdit() {
  const { productId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
          throw new Error("Product not found.");
        }

        if (data.owner_id !== user?.id) {
          throw new Error("You can only edit your own products.");
        }

        setName(data.name);
        setPrice(String(data.price));
        setImageUrl(data.imageUrl);
        setCategory(data.category || "");
        setDescription(data.description || "");
      } catch (err) {
        setError(err.message || "Could not load product.");
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      if (user) {
        getProduct();
      } else {
        setLoading(false);
      }
    }
  }, [productId, user, authLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !imageUrl.trim() ||
        !category.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    setSaving(true);

    try {
      const { data, error } = await supabase
        .from("products")
        .update({
          name: name.trim(),
          price: Number(price),
          imageUrl: imageUrl.trim(),
          category: category.trim(),
          description: description.trim(),
        })
        .eq("id", productId)
        .eq("owner_id", user.id)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error("Product could not be updated. Check that you own it.");
      }

      navigate(`/products/${productId}`);
    } catch (err) {
      setError(err.message || "Could not update product.");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return <div className="container py-5">Loading product...</div>;
  }

  if (error && !name && !price) {
    return (
      <div className="container py-5">
        <p className="text-danger" role="alert">{error}</p>
        <Link to="/shop" className="btn btn-primary">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h1 className="mb-4">Edit Product</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product name
                </label>
                <input
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="form-control"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL or asset path
                </label>
                <input
                  id="imageUrl"
                  className="form-control"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>

                <select
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                >
                    <option value="">Select a category</option>
                    <option value="Chair">Chairs</option>
                    <option value="Table">Tables</option>
                    <option value="Sofa">Sofas</option>
                </select>
                </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-danger" role="alert">{error}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                to={`/products/${productId}`}
                className="btn btn-outline-secondary"
              >
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
