import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { useStore } from "../data/store";
import { useNavigate, useLocation } from "react-router-dom";

const Root = () => {
  const {isLoggedIn} = useStore();
  const [showCartOverlay, setShowCartOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showCart = () => {
    setShowCartOverlay(true);
  };

  const closeCart = () => {
    setShowCartOverlay(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); 
    }
  }, [isLoggedIn, navigate]);

  const onSignInPage = location.pathname === "/signIn"

  return (
    <div className="app">
      {!onSignInPage && <Header showCart={showCart} />}
      {showCartOverlay && <Cart closeCart={closeCart} />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
