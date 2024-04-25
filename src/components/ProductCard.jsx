import React from "react";
import hopprep from "../assets/hopprep.png";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";


function ProductCard({product}) {
  return (
      <div className="product-card">
        <img className="product-img" src={product.image} alt={product.name} />
        <div className="product-text">
            <p className="product-name">{product.name}</p>
            <div className="price-cart-container">
                <p className="product-price">{product.price}</p>
                <RiShoppingCartLine />
            </div>
        </div>
    </div>
  );
}

export default ProductCard;
