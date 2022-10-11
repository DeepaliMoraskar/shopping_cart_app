import React, { useState } from "react";
import "./NavbarStyle.scss";
import logo2 from "../../static/images/logo.png";
import cartIcon from "../../static/images/cart.svg";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  deleteQuantity,
} from "../../redux/Cart/cartAction";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthentication = sessionStorage.getItem("status");
  const [isLoggedIn, setIsLoggedIn] = useState(userAuthentication)
  const itemAdded = useSelector((state) => state.cart.data);
  const [open, setOpen] = useState(false);

  const handleDecrement = (product, i) => {
    let itemList = itemAdded.cartList;
    let addedObj = product;
    let totalCartObj = {};

    if (addedObj.quantity > 1) {
      addedObj.quantity = addedObj.quantity - 1;
      addedObj.totalItemPrice = addedObj.totalItemPrice - product.unitPrice;
      itemList[i] = addedObj;
    } else {
      itemList.splice(i, 1);
    }
    totalCartObj.cartList = itemList;
    totalCartObj.totalQuantity =
      itemList.length == 1 && addedObj
        ? addedObj.quantity
        : itemList.reduce((acc, curr) => acc + curr.quantity, 0);
    totalCartObj.totalPrice =
      itemList.length == 1 && addedObj
        ? addedObj.totalItemPrice
        : itemList.reduce((acc, curr) => acc + curr.totalItemPrice, 0);
    dispatch(decreaseQuantity(totalCartObj));
  };

  const handleIncrement = (product, i) => {
    let itemList = itemAdded.cartList;
    let addedObj = product;
    let totalCartObj = {};

    addedObj.quantity =
      addedObj.quantity < addedObj.stock
        ? addedObj.quantity + 1
        : addedObj.quantity;
    addedObj.totalItemPrice =
      addedObj.quantity < addedObj.stock
        ? addedObj.totalItemPrice + product.unitPrice
        : addedObj.totalItemPrice;
    itemList[i] = addedObj;

    totalCartObj.cartList = itemList;
    totalCartObj.totalQuantity =
      itemList.length == 1 && addedObj
        ? addedObj.quantity
        : itemList.reduce((acc, curr) => acc + curr.quantity, 0);
    totalCartObj.totalPrice =
      itemList.length == 1 && addedObj
        ? addedObj.totalItemPrice
        : itemList.reduce((acc, curr) => acc + curr.totalItemPrice, 0);
    dispatch(increaseQuantity(totalCartObj));
  };

  const handleCheckout = () => {
    let totalCartObj = {};
      totalCartObj.cartList = [];
      totalCartObj.totalPrice = 0;
      dispatch(deleteQuantity(totalCartObj));
      if(userAuthentication === "logged-in"){
        navigate("/products") 
      }else {
        setOpen(false)  
        navigate("/login")
      }
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(value);
  };

  const onLogoutClick = () => {
    sessionStorage.setItem("status", "");
    setIsLoggedIn(false);
  }

  return (
    <nav className="Nav-Style">
      <div className="container">
        <div className="img-content">
            <Link to="/">
              <img src={logo2} className="img-style" alt="logo" />
            </Link>
        </div>
        <div className="nav-item-container">
          <ul className="nav-items">
            <li className="home-section">
              <Link to="/">Home</Link>
            </li>
            <li className="product-section">
              <Link to="/products">Products</Link>
            </li>
          </ul>
          <div className="cart-container">
            <div>
              {userAuthentication === "logged-in" ?
              <ul className="cart-nav-items">
              <li className="logout-section" onClick={onLogoutClick}>
                <a href="">Logout</a>
              </li>
            </ul>
              :
              <ul className="cart-nav-items">
                <li className="signIn-section">
                  <Link to="/login">SignIn</Link>
                </li>
                <li className="register-section">
                  <Link to="/register">Register</Link>
                </li>
              </ul>
              }
            </div>
            <div className="cart-items" onClick={handleClickOpen}>
              <img
                src={cartIcon}
                width={35}
                height={35}
                alt="logo"
                className="iconStyle"
                fill="#3F6078"
              />
              {itemAdded && itemAdded.totalQuantity
                ? itemAdded.totalQuantity
                : 0}{" "}
              Items
            </div>
          </div>
        </div>
      </div>

      <Cart
        openDialog={open}
        closeDialog={handleClose}
        decreamentClick={handleDecrement}
        incrementClick={handleIncrement}
        cartItemList={itemAdded.cartList}
        totalPrice={itemAdded.totalPrice}
        proceedToCheckout={handleCheckout}
      />
    </nav>
  );
}
