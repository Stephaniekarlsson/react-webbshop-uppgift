import React, { useState, useRef, useEffect } from "react";
import "../styles/header.css";
import { RiShoppingCartLine, RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useStore } from "../data/store.js";

function Header({ showCart }) {
  const cartItems = useStore((state) => state.cartItems);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <div className="header-container">
      <div className="header">
        <RiAdminLine className="header-icons" />
        <NavLink to="/">
          <h1 className="header-text">SUNBUDDY</h1>
        </NavLink>
        <div className="cart-icon-header" onClick={showCart}>
          <RiShoppingCartLine className="header-icons" />
          {cartItems.length > 0 && <div className="cart-circle">{totalCartItems}</div>}
        </div>
      </div>
      <Searchbar />
    </div>
  );
}

export default Header;
