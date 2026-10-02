import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../product-card/ProductCard";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      setProducts(data);
    }

    getProducts();
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
}