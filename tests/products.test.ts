import MockAdapter from "axios-mock-adapter";
import configureStore from "../store/store";
import {fetchProducts} from "../store/products/productReducer";
import mainAxios from "../network/axios";
import {State} from "../store/rootReducer";
import {productsFetchStarted} from "../store/products/productActionTypes";

describe("Products slice", () => {
    let fakeAxios
    let dispatch, getState

    const sampleProducts = [
        {
            "id": 1,
            "colour": "Black",
            "name": "Black Sheet Strappy Textured Glitter Bodycon Dress",
            "price": 10,
            "img": "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
        },
        {
            "id": 2,
            "colour": "Stone",
            "name": "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
            "price": 4,
            "img": "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024"
        },
        {
            "id": 3,
            "colour": "Black",
            "name": "Black Frill Tie Shoulder Bodycon Dress",
            "price": 7.99,
            "img": "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
        },
        {
            "id": 5,
            "colour": "Red",
            "name": "Red Pin Stripe Belt T Shirt Dress",
            "price": 17,
            "img": "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024"
        }
    ]

    beforeEach(() => {
        const store = configureStore()
        dispatch = store.dispatch
        getState = store.getState

        fakeAxios = new MockAdapter(mainAxios)
    })

    it("verify loading with productsFetchStarted", () => {
        dispatch(productsFetchStarted())
        const state = getState() as State

        expect(state.products.isLoading).toBe(true)
    })

    it("should have products on api success", async () => {
        fakeAxios.onGet("products/products").reply(200, sampleProducts)

        await dispatch(fetchProducts())
        const state = getState() as State

        expect(state.products.products).toHaveLength(4)
        expect(state.products.isLoading).toBe(false)
    })

    it("should not have products on api failure", async () => {
        fakeAxios.onGet("products/products").reply(500)

        await dispatch(fetchProducts())
        const state = getState() as State

        expect(state.products.products).toHaveLength(0)
        expect(state.products.error).not.toBe('')
        expect(state.products.isLoading).toBe(false)
    })
})