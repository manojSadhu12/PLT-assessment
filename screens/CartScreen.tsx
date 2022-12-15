import React, {FC, useMemo} from "react";
import {useSelector} from "react-redux";
import {State} from "../store/rootReducer";
import {CartState} from "../store/cart/cartReducer";
import {FlatList, StyleSheet, Text, View} from "react-native";
import globalStyles from "../styles/globalStyles";
import CartItemComponent from "../components/CartItemComponent";

const CartScreen: FC = () => {
    const cartState = useSelector<State, CartState>(state => state.cart)

    const totalPrize = useMemo(() => {
        return +cartState.cartItems.reduce((total, cartItem) => {
            return total + cartItem.product.price * cartItem.quantity;
        }, 0).toFixed(5);
    }, [cartState.cartItems]);

    return (
        <View style={{flex: 1}}>
            {
                cartState.cartItems.length === 0
                    ? <View style={globalStyles.center}><Text>Your cart is empty</Text></View>
                    : <>
                        <FlatList
                            data={cartState.cartItems}
                            keyExtractor={(item) => item.product.id.toString()}
                            renderItem={({item}) => <CartItemComponent cartItem={item}/>}/>

                        <View style={styles.checkoutPrize}>
                            <Text style={{fontSize: 18}}>Total Prize:</Text>
                            <Text style={[globalStyles.price, {marginLeft: 10, fontSize: 18}]}>£{totalPrize}</Text>
                        </View>
                    </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    checkoutPrize: {
        fontSize: 24,
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
    }
})

export default CartScreen;
