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
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function getProduct() {
      setLoading(true);
      setLoadError("");
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

        if (data.owner_id !== user.id) {
          throw new Error("You can only edit your own products.");
        }

        if (active) {
          setName(data.name);
          setPrice(String(data.price));
          setImageUrl(data.imageUrl);
          setCategory(data.category || "");
          setDescription(data.description || "");
        }
      } catch (err) {
        if (active) {
          setLoadError(err.message || "Could not load product.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (!authLoading && user) {
      getProduct();
    }

    return () => {
      active = false;
    };
  }, [productId, user, authLoading]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to edit a product.");
      return;
    }

    if (
      !name.trim() ||
      !imageUrl.trim() ||
      !category.trim() ||
      !description.trim()
    ) {
      setError("Please complete all fields before continuing.");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError("Please enter a valid price greater than zero.");
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
    return (
      <div className="container py-5" role="status">
        Loading product...
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="container py-5">
        <p className="text-danger" role="alert">
          {loadError}
        </p>

        <Link to="/shop" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="mb-4">
              <h1 className="section-title mb-2">Edit Furniture Details</h1>
              <p>
                Update your product information below. Your changes
                will appear in the Furni collection after saving.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border rounded-3 p-4 bg-white"
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={100}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label fw-semibold">
                  Price ($)
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
                <label htmlFor="imageUrl" className="form-label fw-semibold">
                  Product Image
                </label>
                <input
                  id="imageUrl"
                  type="text"
                  className="form-control"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  required
                />
                <small className="text-muted">
                  Enter an image URL or an existing asset path.
                </small>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-semibold">
                  Category
                </label>
                <select
                  id="category"
                  className="form-select"
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

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="form-label fw-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="5"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>

                <Link
                  to={`/products/${productId}`}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}