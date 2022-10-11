import {
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    ADD_NEW_QUANTITY,
    DELETE_QUANTITY
  } from "./cartActionTypes";
  
  const intialState = {
    loading: true,
    data: [],
    error: "",
  };
  
  const cartReducer = (state = intialState, action) => {
    switch (action.type) {
      case ADD_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_ITEM_SUCCESS: {
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      }
      case ADD_ITEM_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      case INCREASE_QUANTITY: {
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      }

      case DELETE_QUANTITY: {
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      }

      case ADD_NEW_QUANTITY: {
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      }
  
      case DECREASE_QUANTITY: {
        return {
          loading: false,
          data: action.payload,
          error: "",
        };
      }
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  