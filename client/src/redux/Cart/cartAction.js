import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    ADD_NEW_QUANTITY,
    DELETE_QUANTITY
  } from "./cartActionTypes";
  import { CART_URL, HEADER} from "../../api_constants";
  import axios from 'axios';
  
 
  export const addItemToCartRequest = () => {
    return {
      type: ADD_ITEM_REQUEST,
    };
  };
  
  export const addItemToCartSuccess = (banners) => {
    return {
      type: ADD_ITEM_SUCCESS,
      payload: banners,
    };
  };
  
  export const addItemToCartFailure = (error) => {
    return {
      type: ADD_ITEM_FAILURE,
      payload: error,
    };
  };

  export const addNewQuantity = (prodId) => {
    return {
      type: ADD_NEW_QUANTITY,
      payload: prodId,
    };
  };

  
  export const increaseQuantity = (prodId) => {
    return {
      type: INCREASE_QUANTITY,
      payload: prodId,
    };
  };
  
  export const decreaseQuantity = (prodId) => {
    return {
      type: DECREASE_QUANTITY,
      payload: prodId,
    };
  };

  export const deleteQuantity = (prodId) => {
    return {
      type: DELETE_QUANTITY,
      payload: prodId,
    };
  };

  export const addItemToCart = (id, data) => {
    return (dispatch) => {
      dispatch(addItemToCartRequest());
      axios.post(CART_URL, id, HEADER)
        .then((res) => {
          dispatch(addItemToCartSuccess(data));
          dispatch(addNewQuantity(data))
        })
        .catch((err) => {
          dispatch(addItemToCartFailure(err));
        });
    };
  };
  