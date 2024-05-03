import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cart from "../components/Cart";

const Root = () => {

  const [showCartOverlay, setShowCartOverlay] = useState(false);

  const showCart = () => {
    setShowCartOverlay(true);
  };

  const closeCart = () => {
    setShowCartOverlay(false);
  };

  return (
    <div className="app">
      <Header showCart={showCart} />
      {showCartOverlay && <Cart closeCart={closeCart} />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
