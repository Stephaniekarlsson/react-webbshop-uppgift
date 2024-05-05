import React from "react";
import "../styles/header.css";
import { RiShoppingCartLine, RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useStore } from "../data/store.js";
import { TbLogout2 } from "react-icons/tb";


function Header({ showCart }) {
  const cartItems = useStore((state) => state.cartItems);
  const { setShowProductForm } = useStore();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout()
    setShowProductForm(false)

  };

  return (
    <div className="header-container">
      <div className="header">
        {isLoggedIn ? (
          <div onClick={handleLogout}>
            <TbLogout2 className="header-icons" />
          </div>
        ) : (
          <NavLink to="/signIn">
            <RiAdminLine className="header-icons" />
          </NavLink>
        )}
        <NavLink to="/">
          <h1 className="header-text">SUNBUDDY</h1>
        </NavLink>
        <div className="cart-icon-header" onClick={showCart}>
          <RiShoppingCartLine className="header-icons" />
          {cartItems.length > 0 && (
            <div className="cart-circle">{totalCartItems}</div>
          )}
        </div>
      </div>
      <Searchbar />
    </div>
  );
}

export default Header;
