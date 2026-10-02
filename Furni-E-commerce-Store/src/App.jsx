import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";

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
