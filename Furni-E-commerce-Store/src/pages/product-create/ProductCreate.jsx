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

    if (!name.trim() || !imageUrl.trim() || !category.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      setError("Price must be greater than zero.");
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
          <div className="col-md-8 col-lg-6">
            <h1 className="mb-4">Add a Product</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Product name</label>
                <input
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
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
                <label htmlFor="imageUrl" className="form-label">Image URL or asset path</label>
                <input
                  id="imageUrl"
                  className="form-control"
                  placeholder="/assets/images/product-1.png"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              {error && <p className="text-danger" role="alert">{error}</p>}

              <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </button>

              <Link to="/shop" className="btn btn-outline-secondary">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}