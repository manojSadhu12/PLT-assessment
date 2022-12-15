import React, {FC, useMemo} from "react";
import {Text} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {State} from "../store/rootReducer";
import {CartItem} from "../store/cart/cartActionTypes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParam} from "../navigation/MainNavigation";


const CartCount: FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    const primaryColor = useTheme().colors.primary
    const cartItems = useSelector<State, CartItem[]>(state => state.cart.cartItems)

    const totalCartItems = useMemo(() => {
        return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }, [cartItems]);

    return (
        <Text
            onPress={() => navigation.navigate("Cart")}
            style={{color: primaryColor}}>
            Cart({totalCartItems})
        </Text>
    );
};

export default CartCount;
