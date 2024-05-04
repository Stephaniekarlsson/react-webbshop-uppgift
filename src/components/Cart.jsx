import React from "react";
import "../styles/cart.css";
import CartProductCard from "./CartProductCard.jsx";
import Divider from "@mui/material/Divider";
import { SlClose } from "react-icons/sl";
import { useStore } from "../data/store.js";

function Cart({ closeCart }) {
  const cartItems = useStore((state) => state.cartItems);

  const groupedCartItems = cartItems.reduce((acc, currentItem) => {
    const existingItem = acc.find(item => item.product.key === currentItem.key);
    if (existingItem) {
      existingItem.quantity += currentItem.quantity;
    } else {
      acc.push({ product: currentItem, quantity: currentItem.quantity });
    }
    return acc;
  }, []);

  const totalPrice = groupedCartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const shippingCost = totalPrice < 500 ? 89 : 0;

  const totalCost = totalPrice + shippingCost;
  
  return (
    <div className="cart-container">
      <div className="cart-header-container">
        <div className="space"></div>
        <h1>VARUKORGEN</h1>
        <SlClose className="close-icon" onClick={closeCart} />
      </div>
      {groupedCartItems.map((item) => (
        <div key={item.product.key} className="cart-products">
          <CartProductCard product={item.product} quantity={item.quantity} />
          <Divider variant="fullWidth" flexItem sx={{ marginTop: "1em"}} />
        </div>
      ))}
      <div className="cart-price">
        <div className="price-info">
          <p>Summa:</p>
          <p>{totalPrice}kr</p>
        </div>
        <div className="shipping-info">
          <p>Frakt:</p>
          <p>{shippingCost}kr</p>
        </div>
        <Divider variant="fullWidth" flexItem sx={{ marginTop: "1em" }} />
        <div className="total-info">
          <p>Totalt:</p>
          <p>{totalCost}kr</p>
        </div>
        <button>Till kassan</button>
      </div>
    </div>
  );
}

export default Cart;
