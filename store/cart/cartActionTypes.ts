import {ThunkDispatch} from "redux-thunk";
import {State} from "../rootReducer";
import {createAction} from "../actionUtils";
import {Product} from "../products/productActionTypes";

export enum CartActionTypes {
    ADD_TO_CART = "cart/addToCart",
    INCREMENT_QUANTITY_IN_CART = "cart/incrementQuantity",
    DECREMENT_QUANTITY_IN_CART = "cart/decrementQuantity",
    REMOVE_FROM_CART = "cart/removeFromCart",
}

export type CartItem = {
    product: Product,
    quantity: number,
}

type AddToCart = {
    type: CartActionTypes.ADD_TO_CART,
    payload: Product
}
export const addToCart = createAction<AddToCart>(CartActionTypes.ADD_TO_CART)


type IncrementQuantityInCart = {
    type: CartActionTypes.INCREMENT_QUANTITY_IN_CART,
    payload: number
}
export const incrementQuantityInCart = createAction<IncrementQuantityInCart>(CartActionTypes.INCREMENT_QUANTITY_IN_CART)


type DecrementQuantityInCart = {
    type: CartActionTypes.DECREMENT_QUANTITY_IN_CART,
    payload: number
}
export const decrementQuantityInCart = createAction<DecrementQuantityInCart>(CartActionTypes.DECREMENT_QUANTITY_IN_CART)


type RemoveFromCart = {
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: number
}
export const removeFromCart = createAction<RemoveFromCart>(CartActionTypes.REMOVE_FROM_CART)


export type CartAction = AddToCart | IncrementQuantityInCart | DecrementQuantityInCart | RemoveFromCart
export type CartDispatch = ThunkDispatch<State, any, CartAction>