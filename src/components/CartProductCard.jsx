import React from "react";
import "../styles/cartProductCard.css";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { useCartStore, useQuantityStore } from "../data/store";

function CartProductCard({ product }) {
  const getQuantity = useQuantityStore((state) => state.getQuantity);
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const quantity = getQuantity(product.id);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartItems = useCartStore((state) => state.cartItems);


  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(product.id, newQuantity);
    addToCart(product);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(product.id, newQuantity);
      if (newQuantity === 0) {
        removeFromCart(product.id);
      }
    }
  };

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
          <CiSquareMinus className="quantity-btn" onClick={decreaseQuantity} />
          <p>{quantity}</p>
          <CiSquarePlus className="quantity-btn" onClick={increaseQuantity} />
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
