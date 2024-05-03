import React, { useState } from "react";
import "../styles/cartProductCard.css";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useQuantityStore } from "../data/store";

function CartProductCard({ product }) {
  const [quantity, setQuantity] = useState(useQuantityStore((state) => state.getQuantity(product.key)));

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); 
    useQuantityStore((state) => state.setQuantity(product.key, newQuantity)); 
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
          <CiSquareMinus className="quantity-btn"/>
          <p>{quantity}</p>
          <CiSquarePlus className="quantity-btn" onClick={handleIncrement}/>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
