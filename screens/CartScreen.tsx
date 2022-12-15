import React, {FC} from "react";
import {useSelector} from "react-redux";
import {State} from "../store/rootReducer";
import {CartState} from "../store/cart/cartReducer";
import {FlatList, Text, View} from "react-native";
import globalStyles from "../styles/globalStyles";
import CartItemComponent from "../components/CartItemComponent";

const CartScreen: FC = () => {
    const cartState = useSelector<State, CartState>(state => state.cart)

    return (
        <View style={{flex: 1}}>
            {
                cartState.cartItems.length === 0
                    ? <View style={globalStyles.center}><Text>Your cart is empty</Text></View>
                    : <FlatList
                        data={cartState.cartItems}
                        keyExtractor={(item) => item.product.id.toString()}
                        renderItem={({item}) => <CartItemComponent cartItem={item}/>}/>
            }
        </View>
    );
};

export default CartScreen;
