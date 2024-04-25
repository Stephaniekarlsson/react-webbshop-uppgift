import { useState, useEffect } from "react";
import { getProducts } from "../data/crud.js";
import { useStore } from "../data/store.js";
import ProductCard from "./ProductCard.jsx";
import { MdOutlineSort } from "react-icons/md";
import "../styles/products.css";
import Divider from "@mui/material/Divider";

const Products = () => {
  const { productList, setProducts } = useStore((state) => ({
    productList: state.productList,
    setProducts: state.setProducts,
  }));

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []); // Hämta produkterna en gång när komponenten monteras

  return (
    <div>
      <div className="sort-bar">
        <MdOutlineSort className="sort-icon" />
        <select className="sort-dropdown" defaultValue="">
          <option value="" disabled hidden className="sort-option">
            Sortering
          </option>
          <option className="sort-option">Namn A-Ö</option>
          <option className="sort-option">Namn Ö-A</option>
          <option className="sort-option">Pris fallande</option>
          <option className="sort-option">Pris stigande</option>
        </select>
      </div>
      <div className="product-container">
        {productList.map((product, index) => (
          <div>
            <ProductCard product={product} key={product.index} />
            {index !== productList.length - 1 && (
              <Divider variant="fullWidth" flexItem sx={{marginTop:'2em',}}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
