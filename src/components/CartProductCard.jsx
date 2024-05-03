import React, { useState } from "react";
import "../styles/cartProductCard.css";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useQuantityStore, useCartStore } from "../data/store";

function CartProductCard({ product }) {
  const [quantity, setQuantity] = useState(useQuantityStore((state) => state.getQuantity(product.key)));
  const removeFromCart = useCartStore(state => state.removeFromCart);


  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); 
    useQuantityStore((state) => state.setQuantity(product.key, newQuantity)); 
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Uppdaterar den lokala kvantiteten
      useQuantityStore((state) => state.setQuantity(product.key, newQuantity)); // Uppdaterar kvantiteten i store
    } else {
      removeFromCart(product)
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
          <CiSquareMinus className="quantity-btn"onClick={handleDecrement}/>
          <p>{quantity}</p>
          <CiSquarePlus className="quantity-btn" onClick={handleIncrement}/>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
