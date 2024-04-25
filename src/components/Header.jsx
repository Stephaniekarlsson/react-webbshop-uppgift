import React from 'react'
import '../styles/header.css'
import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
        <IoSearchOutline className='header-icons'/>
        <NavLink to="/">
        <h1 className='header-text'>SUNBUDDY</h1>
        </NavLink>
        <NavLink to="/cart">
        <RiShoppingCartLine className='header-icons' />
        </NavLink>
    </div>
  )
}

export default Header
