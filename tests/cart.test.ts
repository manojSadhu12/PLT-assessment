import configureStore from "../store/store";
import {
    addToCart,
    decrementQuantityInCart,
    incrementQuantityInCart,
    removeFromCart
} from "../store/cart/cartActionTypes";
import {Product} from "../store/products/productActionTypes";
import {State} from "../store/rootReducer";

describe("Cart slice", () => {
    let dispatch, getState

    const sampleProduct: Product = {
        "id": 1,
        "colour": "Black",
        "name": "Black Sheet Strappy Textured Glitter Bodycon Dress",
        "price": 10,
        "img": "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
    }

    beforeEach(() => {
        const store = configureStore()
        dispatch = store.dispatch
        getState = store.getState
    })

    it("should add product to store", () => {
        dispatch(addToCart(sampleProduct))
        const state = getState() as State

        expect(state.cart.cartItems).toEqual([{product: sampleProduct, quantity: 1}])
    })

    it("should not add duplicate product to store", () => {
        dispatch(addToCart(sampleProduct))
        dispatch(addToCart(sampleProduct))
        const state = getState() as State

        expect(state.cart.cartItems).toEqual([{product: sampleProduct, quantity: 1}])
    })

    it("should increment product quantity", () => {
        dispatch(addToCart(sampleProduct))
        dispatch(incrementQuantityInCart(sampleProduct.id))
        const state = getState() as State

        expect(state.cart.cartItems[0].quantity).toBe(2)
    })

    it("should not increment product quantity if the product is not added", () => {
        const stateBeforeIncrement = getState() as State
        dispatch(incrementQuantityInCart(sampleProduct.id))
        const stateAfterIncrement = getState() as State

        expect(stateBeforeIncrement).toBe(stateAfterIncrement)
    })

    it("should decrement product quantity", () => {
        dispatch(addToCart(sampleProduct))
        dispatch(incrementQuantityInCart(sampleProduct.id))
        dispatch(decrementQuantityInCart(sampleProduct.id))

        const state = getState() as State

        expect(state.cart.cartItems[0].quantity).toBe(1)
    })

    it("should not make quantity 0 or less than 0", () => {
        dispatch(addToCart(sampleProduct))
        dispatch(decrementQuantityInCart(sampleProduct.id))
        dispatch(decrementQuantityInCart(sampleProduct.id))

        const state = getState() as State

        expect(state.cart.cartItems[0].quantity).toBeGreaterThan(0)
    })

    it("should remove product", () => {
        dispatch(addToCart(sampleProduct))
        dispatch(removeFromCart(sampleProduct.id))

        const state = getState() as State

        expect(state.cart.cartItems).toHaveLength(0)
    })
})