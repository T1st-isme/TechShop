import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productDetailReducer,
  productListReducer,
} from "./Reducers/ProductReducer";
import cartReducer from "./Reducers/CartReducer";
import { authReducer } from "./Reducers/userReducer";
import {
  categoryReducer,
  delCategoryReducer,
  newCategoryReducer,
} from "./Reducers/CategoryReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  newCategory: newCategoryReducer,
  category: categoryReducer,
  delCategory: delCategoryReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
