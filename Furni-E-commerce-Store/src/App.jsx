import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((previousCart) => [...previousCart, product]);
  }

  return (
    <>
      <Header cartCount={cart.length} />
      <Home addToCart={addToCart} />
      <Footer />
    </>
  );
}