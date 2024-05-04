import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useStore } from "../data/store.js"; 
import { RiCheckLine } from "react-icons/ri";

function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <div className="product-text">
        <p className="product-name">{product.name}</p>
        <div className="price-cart-container">
          <p className="product-price">{product.price}kr</p>
          <button onClick={handleAddToCart}>
          {addedToCart ? <RiCheckLine /> : <RiShoppingCartLine />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
