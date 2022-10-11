import { combineReducers } from "redux";
import productReducer from "./Product/productReducer";
import cartReducer from "./Cart/cartReducer";
import categoryReducer from "./Category/categoryReducer";
import bannerReducer from "./Banner/bannerReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  banners: bannerReducer,
  cart: cartReducer,
});

export default rootReducer;