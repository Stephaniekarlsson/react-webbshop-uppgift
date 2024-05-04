import React, { useState, useRef, useEffect } from "react";
import "../styles/header.css";
// import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingCartLine, RiAdminLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";

function Header({showCart}) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="header-container">
      <div className="header">
        <RiAdminLine className="header-icons"/>
        <NavLink to="/">
          <h1 className="header-text">SUNBUDDY</h1>
        </NavLink>
        <div className="cart-icon-header" onClick={showCart}> 
          <RiShoppingCartLine className="header-icons" />
          <div className="cart-circle">0</div>
        </div>
      </div>
      <Searchbar />
    </div>
  );
}

export default Header;
