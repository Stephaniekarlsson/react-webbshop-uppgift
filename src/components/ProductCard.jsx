import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCartStore, useQuantityStore} from "../data/store";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const getQuantity = useQuantityStore((state) => state.getQuantity);
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const cartItems = useCartStore((state) => state.cartItems);


  const handleAddToCart = () => {
    const existingProduct = cartItems.findIndex(item => item.id === product.id);
    const quantity = getQuantity(product.key)
    // const newQuantity = quantity +1
    if (existingProduct !== -1
     ) {
    setQuantity(product.key, quantity +1);
    console.log(existingProduct, 'finns');
    } else
    addToCart(product);
    setQuantity(product.key, quantity +1);
  };

  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <div className="product-text">
        <p className="product-name">{product.name}</p>
        <div className="price-cart-container">
          <p className="product-price">{product.price}kr</p>
          <button onClick={handleAddToCart}>
            <RiShoppingCartLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
