import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import shoppingCartReducer from "./shoppingReducer";

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  login: loginReducer,
});

export default rootReducer;