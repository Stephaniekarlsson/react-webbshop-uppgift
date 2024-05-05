import React, { useState } from "react";
import "../styles/productCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useStore } from "../data/store.js";
import { RiCheckLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

function ProductCard({ product, onRemove, onEdit}) {
  const addToCart = useStore((state) => state.addToCart);
  const [addedToCart, setAddedToCart] = useState(false);
  const { isLoggedIn } = useStore();


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

  const handleEditProduct = () => {
    onEdit(product); 
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
        {isLoggedIn && (
        <div className="edit-remove">
          <button onClick={handleEditProduct}>
            Edit
            {/* <MdEditNote /> */}
          </button>
          <button onClick={handleRemoveProduct}>
            Remove
            {/* <IoTrashOutline /> */}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
