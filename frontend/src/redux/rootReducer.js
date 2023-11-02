import { combineReducers } from "redux";
import pizzaReducer from "./pizza/Reducer";
import cartReducer from "./cart/Reducer";
import UserReducer from "./user/Reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  pizza: pizzaReducer,
  cart: cartReducer,
});

export default rootReducer;
