import {
    addToCart,
    CartAction,
    CartItem,
    decrementQuantityInCart,
    incrementQuantityInCart,
    removeFromCart
} from "./cartActionTypes";
import produce from "immer";

export type CartState = {
    cartItems: CartItem[]
}

const initialState: CartState = {
    cartItems: [],
}

const cartReducer = (state = initialState, action: CartAction) => {
    switch (action.type) {
        case addToCart.type: {
            const inCart = state.cartItems.findIndex(cartItem => cartItem.product.id == action.payload.id) != -1
            if (inCart) {
                return state
            } else {
                return produce(state, draftState => {
                    draftState.cartItems.push({product: action.payload, quantity: 1})
                })
            }
        }
        case incrementQuantityInCart.type: {
            const cartItemIndex = state.cartItems.findIndex(cartItem => cartItem.product.id == action.payload)
            if (cartItemIndex == -1) {
                return state;
            } else {
                return produce(state, draftState => {
                    draftState.cartItems[cartItemIndex].quantity++
                })
            }
        }
        case decrementQuantityInCart.type: {
            const cartItemIndex = state.cartItems.findIndex(cartItem => cartItem.product.id == action.payload)
            if (cartItemIndex == -1 || state.cartItems[cartItemIndex].quantity == 1) {
                return state;
            } else {
                return produce(state, draftState => {
                    draftState.cartItems[cartItemIndex].quantity--
                })
            }
        }
        case removeFromCart.type: {
            return produce(state, draftState => {
                draftState.cartItems = state.cartItems.filter(cartItem => cartItem.product.id != action.payload)
            })
        }
        default:
            return state;
    }
}

export default cartReducer;