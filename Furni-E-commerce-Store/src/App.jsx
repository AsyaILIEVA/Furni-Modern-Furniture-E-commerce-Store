// import { useState } from "react";
// import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";
// import Home from "./pages/home/Home";

// export default function App() {
//   const [cart, setCart] = useState([]);

//   function addToCart(product) {
//     setCart((previousCart) => [...previousCart, product]);
//   }

//   return (
//     <>
//       <Header cartCount={cart.length} />
//       <Home addToCart={addToCart} />
//       <Footer />
//     </>
//   );
// }

import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      console.log("Products:", data);
      console.log("Error:", error?.message);
    console.log("Error details:", error);
    }

    testSupabase();
  }, []);

  return <h1>Supabase Test</h1>;
}