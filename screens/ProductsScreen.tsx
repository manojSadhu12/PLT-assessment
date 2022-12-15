import React, {FC, ReactNode, useEffect, useMemo} from "react";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ProductsDispatch} from "../store/products/productActionTypes";
import {State} from "../store/rootReducer";
import {fetchProducts, ProductsState} from "../store/products/productReducer";
import globalStyles from "../styles/globalStyles";
import ProductItem from "../components/ProductItem";
import {CartItem} from "../store/cart/cartActionTypes";

/**
 * Returns the appropriate component based on product state.
 * @param productsState
 * @param productsNode
 */
const pickProductsRenderItem = (productsState: ProductsState, productsNode: () => ReactNode): ReactNode => {
    if (productsState.products.length === 0 && productsState.isLoading) {
        return <View style={globalStyles.center}><ActivityIndicator/></View>
    } else if (productsState.error) {
        return <View style={globalStyles.center}><Text>Failed to load products</Text></View>
    } else if (productsState.products.length === 0) {
        return <View style={globalStyles.center}><Text>No products available right now</Text></View>
    } else {
        return productsNode()
    }
}

const ProductsScreen: FC = () => {
        const dispatch = useDispatch<ProductsDispatch>()

        const productsState = useSelector<State, ProductsState>(state => state.products)
        const cartItems = useSelector<State, CartItem[]>(state => state.cart.cartItems)

        const productsInCart = useMemo(() => {
            return cartItems.map(cartItem => cartItem.product.id);
        }, [cartItems]);


        useEffect(() => {
            dispatch(fetchProducts())
        }, [])

        return (
            <View style={{flex: 1}}>
                {
                    pickProductsRenderItem(productsState,
                        () => <FlatList
                            data={productsState.products}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) =>
                                <ProductItem product={item} addedToCart={productsInCart.includes(item.id)}/>}/>
                    )
                }
            </View>
        );
    }
;

export default ProductsScreen;
