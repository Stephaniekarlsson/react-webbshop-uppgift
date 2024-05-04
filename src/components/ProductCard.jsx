import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useStore } from "../data/store.js";
import { RiCheckLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { removeProduct } from "../data/crud.js";

function ProductCard({ product, onRemove}) {
  const addToCart = useStore((state) => state.addToCart);
  const [addedToCart, setAddedToCart] = useState(false);
  const removeCartItem = useStore((state) => state.removeCartItem);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleRemoveProduct = async () => {
    onRemove()
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
        <div className="edit-remove">
          <button>
            <MdEditNote />
          </button>
          <button>
            <IoTrashOutline onClick={handleRemoveProduct}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
