import {combineReducers} from "redux";
import productReducer from "./products/productReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer