import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCartStore, useQuantityStore } from "../data/store";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const getQuantity = useQuantityStore((state) => state.getQuantity);
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const cartItems = useCartStore((state) => state.cartItems);
  const quantity = getQuantity(product.key);

  const handleAddToCart = () => {
    const isProductInCart = cartItems.find((item) => item.key === product.key);
  
    if (isProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.key === product.key) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
  
      setQuantity(product.key, quantity + 1);
      useCartStore.setState({ cartItems: updatedCartItems });
    } else {
      const newCartItems = [...cartItems, { ...product, quantity: 1 }];
      useCartStore.setState({ cartItems: newCartItems });
      setQuantity(product.key, 1);
    }
  };
  
  return (
    <div className="product-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <div className="product-text">
        <p className="product-name">{product.name}</p>
        <div className="price-cart-container">
          <p className="product-price">{product.price}kr</p>
          <button>
            <RiShoppingCartLine onClick={handleAddToCart} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
