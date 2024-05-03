import React from "react";
import '../styles/searchedProductCard.css'

function SearchedProductCard({product}) {
  return (
      <div className="searched-product-card">
        <img className="searched-product-img" src={product.image} alt={product.name} />
        <div className="searched-product-text">
            <p className="searched-product-name">{product.name}</p>
            <p className="searched-product-price">{product.price}kr</p>
        </div>
    </div>
  );
}

export default SearchedProductCard;
