import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useStore } from "../data/store.js"; 
function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <div className="product-text">
        <p className="product-name">{product.name}</p>
        <div className="price-cart-container">
          <p className="product-price">{product.price}kr</p>
          <button>
            <RiShoppingCartLine onClick={handleAddToCart}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
