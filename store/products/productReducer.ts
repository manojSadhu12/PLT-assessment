import {
    Product,
    ProductsAction,
    ProductsDispatch,
    productsFetched,
    productsFetchedFailed,
    productsFetchStarted
} from "./productActionTypes";
import produce from "immer";
import mainAxios from "../../network/axios";

export type ProductsState = {
    products: Product[],
    isLoading: boolean,
    error: string
}

const initialState: ProductsState = {
    products: [],
    isLoading: false,
    error: ""
}
const productReducer = (state = initialState, action: ProductsAction) => {
    switch (action.type) {
        case productsFetchStarted.type: {
            return produce(state, draftState => {
                draftState.isLoading = true;
            })
        }
        case productsFetched.type: {
            return produce(state, draftState => {
                draftState.products = action.payload
                draftState.isLoading = false;
                draftState.error = "";
            })
        }
        case productsFetchedFailed.type: {
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.error = action.payload;
            })
        }
        default:
            return state;
    }
}

export const fetchProducts = () => async (dispatch: ProductsDispatch) => {
    try {
        dispatch(productsFetchStarted())
        const products = (await mainAxios.get<Product[]>("products/products")).data
        dispatch(productsFetched(products))
    } catch (err) {
        dispatch(productsFetchedFailed(err.message))
    }
}

export default productReducer;