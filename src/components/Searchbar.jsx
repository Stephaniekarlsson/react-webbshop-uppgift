import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../styles/searchbar.css";
import { productsList } from "../data/crud";
import SearchedProductCard from "./SearchedProductCard";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const productList = Object.values(productsList);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filterList = (input) => {
    return productList.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const filteredList = filterList(searchInput);

return (
  <>
    <div className='input-wrapper'>
        <IoSearchOutline className="search-icon" />
        <input type="text" placeholder='Sök produkter...' value={searchInput} onChange={handleInputChange} />
    </div>
    {searchInput && filteredList.length > 0 && ( 
        <div className='results-container'>
            <div className='results-list'>
                {filteredList.map((product, key) => {
                    return <SearchedProductCard key={key} product={product} />;
                })}
            </div>
        </div>
    )}
  </>
);
}

export default Searchbar;
