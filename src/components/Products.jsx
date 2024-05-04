import { useState, useEffect } from "react";
import { getProducts } from "../data/crud.js";
import { useStore } from "../data/store.js";
import ProductCard from "./ProductCard.jsx";
import { MdOutlineSort } from "react-icons/md";
import "../styles/products.css";
import Divider from "@mui/material/Divider";
import { sortNameAsc, sortNameDesc, sortPriceAsc, sortPriceDesc } from "../data/sort.js";
import { removeProduct } from "../data/crud.js";

const Products = ({ selectedCategory }) => {
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
  }, []); 

  const filteredProducts = productList.filter(product => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });


  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
  
    if (selectedOption === "asc") {
      const sortAscProducts = sortNameAsc();
      setProducts(sortAscProducts);
    } else if (selectedOption === "desc") {
      const sortDescProducts = sortNameDesc();
      setProducts(sortDescProducts);
    } else if (selectedOption === "price-asc") {
      const sortPriceAscProducts = sortPriceAsc();
      setProducts(sortPriceAscProducts);
    } else if (selectedOption === "price-desc") {
      const sortPriceDescProducts = sortPriceDesc();
      setProducts(sortPriceDescProducts);
    }
  };

  const handleRemoveProduct = async (productKey) => {
    try {
      await removeProduct(productKey, setProducts);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  

  return (
    <div>
      <div className="sort-bar">
        <MdOutlineSort className="sort-icon" />
        <select className="sort-dropdown" defaultValue="" onChange={handleSortChange}>
          <option value="" disabled hidden className="sort-option">
            Sortering
          </option>
          <option value="asc" className="sort-option">Namn A-Ö</option>
          <option value="desc" className="sort-option">Namn Ö-A</option>
          <option value="price-desc" className="sort-option">Pris fallande</option>
          <option value="price-asc" className="sort-option">Pris stigande</option>
        </select>
      </div>
      <div className="product-container">
        {filteredProducts.map((product, index) => (
          <div key={product.key}>
            <ProductCard product={product} onRemove={() => handleRemoveProduct(product.key)} />
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
