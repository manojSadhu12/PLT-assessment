import {ThunkDispatch} from "redux-thunk";
import {State} from "../rootReducer";
import {createAction} from "../actionUtils";

export enum ProductsActionTypes {
    PRODUCTS_FETCH_STARTED = "products/fetchStarted",
    PRODUCTS_FETCHED = "products/fetched",
    PRODUCTS_FETCH_FAILED = "products/fetchFailed",
}

export type Product = {
    id: number,
    colour: string,
    name: string,
    price: number,
    img: string
}

type ProductsFetchStarted = {
    type: ProductsActionTypes.PRODUCTS_FETCH_STARTED
}
export const productsFetchStarted = createAction<ProductsFetchStarted>(ProductsActionTypes.PRODUCTS_FETCH_STARTED)


type ProductsFetched = {
    type: ProductsActionTypes.PRODUCTS_FETCHED,
    payload: Product[]
}
export const productsFetched = createAction<ProductsFetched>(ProductsActionTypes.PRODUCTS_FETCHED)


type ProductsFetchedFailed = {
    type: ProductsActionTypes.PRODUCTS_FETCH_FAILED,
    payload: string
}
export const productsFetchedFailed = createAction<ProductsFetchedFailed>(ProductsActionTypes.PRODUCTS_FETCH_FAILED)


export type ProductsAction = ProductsFetchStarted | ProductsFetched | ProductsFetchedFailed
export type ProductsDispatch = ThunkDispatch<State, any, ProductsAction>