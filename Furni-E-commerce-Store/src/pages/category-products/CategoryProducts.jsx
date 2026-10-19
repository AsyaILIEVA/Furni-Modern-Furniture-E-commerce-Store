import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/product-card/ProductCard";

export default function CategoryProducts( { addToCart } ) {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("category", category)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setProducts(data || []);
      } catch (err) {
        setError(err.message || "Could not load products.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [category]);

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <h1>{category} Collection</h1>
            <p>Explore our products in this category.</p>
          </div>
        </div>

        {loading && <p>Loading products...</p>}

        {error && (
          <p className="text-danger" role="alert">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products found in this category.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="row">
            {products.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)}
                />
            ))}
          </div>
        )}

        <Link to="/shop" className="btn btn-outline-secondary mt-3">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}

