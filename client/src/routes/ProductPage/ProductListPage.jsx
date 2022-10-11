import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/Product/productAction";
import { fetchCategories } from "../../redux/Category/categoryActions";
import Menu from "../../components/Menu/Menu";
import ProductList from "../../components/ProductList/ProductList";
import { addItemToCart, addNewQuantity } from "../../redux/Cart/cartAction";

import "./ProductListStyle.scss";

export default function ProductListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userAuthentication = sessionStorage.getItem("status");
  const itemAdded = useSelector((state) => state.cart.data);
  const productsItem = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const categories = useSelector((state) => state.categories.data);

  const filteredProducts =
    location.state && location.state.id && productsItem
      ? productsItem.filter((product) => product.category == location.state.id)
      : productsItem;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const addItemsToCart = (obj) => {
    let itemList = itemAdded.cartList ? itemAdded.cartList : [];
    let addedObj =
      itemList && itemList.length > 0
        ? itemList.find((item) => item.id == obj.id)
        : false;
    let cartObj = {};
    let totalCartObj = {};

    if (addedObj) {
      addedObj.quantity =
        addedObj.quantity < addedObj.stock
          ? addedObj.quantity + 1
          : addedObj.quantity;
      addedObj.totalItemPrice =
        addedObj.quantity < addedObj.stock
          ? addedObj.totalItemPrice + obj.price
          : addedObj.totalItemPrice;
      itemList.forEach((item, i) => {
        if (item.id == obj.id) {
          itemList[i] = addedObj;
        }
      });
    } else {
      cartObj.id = obj.id;
      cartObj.quantity = 1;
      cartObj.stock = obj.stock;
      cartObj.unitPrice = obj.price;
      cartObj.totalItemPrice = obj.price;
      cartObj.imageURL = obj.imageURL;
      cartObj.name = obj.name;
      itemList.push(cartObj);
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
        
        if(userAuthentication === "logged-in") {
          dispatch(addItemToCart(obj.id, totalCartObj));
        }else{
          dispatch(addNewQuantity(totalCartObj));
        }
  };

  return (
    <div className="product-page-container">
      {loading ? (
        <div className="no-content">Loading products...</div>
      ) : error ? (
        <div className="no-content">Some error occured!</div>
      ) : (
        <div className="product-container">
          <div className="menu-list-container">
            <Menu
              categoryList={categories}
              productId={location.state && location.state.id}
            />
          </div>
          <div className="product-list-container">
            <ProductList
              productsList={filteredProducts}
              addItemsToCart={addItemsToCart}
            />
          </div>
        </div>
      )}
    </div>
  );
}
