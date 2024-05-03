// import React, { useState } from "react";
import "../styles/cart.css";
import CartProductCard from "./CartProductCard.jsx";
import { useCartStore } from "../data/store.js"
import Divider from "@mui/material/Divider";
import { SlClose } from "react-icons/sl";

function Cart({ closeCart }) {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="cart-container">
      <div className="cart-header-container">
        <div className="space"></div>
        <h1>VARUKORGEN</h1>
        <SlClose className="close-icon" onClick={closeCart} />
      </div>
      {cartItems.map((product, index) => (
        <div key={product.key} className="cart-products">
          <CartProductCard product={product} />
          {index !== cartItems.length - 1 && (
            <Divider variant="fullWidth" flexItem sx={{ marginTop: "1em"}} />
          )}
        </div>
      ))}
      <div className="cart-price">
        <div className="price-info">
          <p>Summa</p>
          <p>xkr</p>
        </div>
        <div className="shipping-info">
          <p>Frakt</p>
          <p>xkr</p>
        </div>
        <Divider variant="fullWidth" flexItem sx={{ marginTop: "1em" }} />
        <div className="total-info">
          <p>Totalt</p>
          <p>xkr</p>
        </div>
        <button>Till kassan</button>
      </div>
    </div>
  );
}

export default Cart;
