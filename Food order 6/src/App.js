import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [openCart, setOpenCart] = useState(false);
  function showCartHandler() {
    setOpenCart(true);
  }
  function hideCartHandler() {
    setOpenCart(false);
  }
  return (
    <CartProvider>
      {openCart ? <Cart onClose={hideCartHandler} /> : ""}
      <Header onOpen={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
