import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
  } from "./productActionTypes";
  import { PRODUCTS_URL } from "../../api_constants";
  import axios from 'axios';
  
  export const fetchProductsRequest = () => {
    return {
      type: FETCH_PRODUCTS_REQUEST,
    };
  };
  
  export const fetchProductsSuccess = (products) => {
    return {
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products,
    };
  };
  
  export const fetchProductsFailure = (error) => {
    return {
      type: FETCH_PRODUCTS_FAILURE,
      payload: error,
    };
  };
  
  export const fetchProducts = () => {
    return (dispatch) => {
      dispatch(fetchProductsRequest());
      axios(PRODUCTS_URL)
        .then((res) => {
          dispatch(fetchProductsSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchProductsFailure(err));
        });
    };
  };
  