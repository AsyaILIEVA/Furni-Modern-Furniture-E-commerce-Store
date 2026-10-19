import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function ProductCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create a product.");
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

    setLoading(true);

    try {
      const { error } = await supabase.from("products").insert({
        name: name.trim(),
        price: Number(price),
        imageUrl: imageUrl.trim(),
        category: category.trim(),
        description: description.trim(),
        owner_id: user.id,
      });

      if (error) throw error;

      navigate("/shop");
    } catch (err) {
      setError(err.message || "Could not create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="mb-4">
              <h1 className="section-title mb-2">Add New Furniture</h1>
              <p>
                Share a furniture piece with the Furni collection.
                Complete the details below to create your listing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="border rounded-3 p-4 bg-white">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Modern Lounge Chair"
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
                  placeholder="e.g. 79.99"
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
                  placeholder="/assets/images/product-1.png"
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
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="5"
                  placeholder="Describe the design, features, and style of your furniture..."
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
                  disabled={loading}
                >
                  {loading ? "Creating Product..." : "Create Product"}
                </button>

                <Link to="/shop" className="btn btn-outline-secondary">
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