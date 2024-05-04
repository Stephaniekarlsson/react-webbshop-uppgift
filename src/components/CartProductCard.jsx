import React, { useState, useEffect } from "react";
import "../styles/cartProductCard.css";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useStore } from "../data/store.js";

function CartProductCard({ product }) {
  const cartItems = useStore((state) => state.cartItems);
  const updateCartItemQuantity = useStore(
    (state) => state.updateCartItemQuantity
  );
  const removeCartItem = useStore((state) => state.removeCartItem);

  const cartItem = cartItems.find((item) => item.key === product.key);
  const quantity = cartItem ? cartItem.quantity : 0;


  const handleIncrement = () => {
    updateCartItemQuantity(product.key, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateCartItemQuantity(product.key, quantity - 1);
    } else {
      removeCartItem(product.key);
    }
  };
  // const [quantity, setQuantity] = useState(useQuantityStore((state) => state.getQuantity(product.key)));
  // const removeFromCart = useCartStore(state => state.removeFromCart);

  // const handleIncrement = () => {
  //   const newQuantity = quantity + 1;
  //   setQuantity(newQuantity);
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     const newQuantity = quantity - 1;
  //     setQuantity(newQuantity);
  //   } else {
  //     removeFromCart(product);
  //   }
  // };

  return (
    <div className="cart-product-container">
      <img
        className="cart-product-img"
        src={product.image}
        alt={product.name}
      />
      <div className="cart-product-text">
        <p className="cart-product-name">{product.name}</p>
        <p className="cart-product-price">{product.price}kr</p>
        <div className="quantity">
          <CiSquareMinus className="quantity-btn" onClick={handleDecrement} />
          <p>{quantity}</p>
          <CiSquarePlus className="quantity-btn" onClick={handleIncrement} />
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
