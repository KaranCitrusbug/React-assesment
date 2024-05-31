import { combineReducers } from "redux";
import authReducer from "./AuthReducer/authReducer";
import cartReducer from "./cartReducer/cartReducer";

const rootReducer = combineReducers({
    cart :cartReducer,
    auth : authReducer
})



export default rootReducer