import React, {FC} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {
    CartDispatch,
    CartItem,
    decrementQuantityInCart,
    incrementQuantityInCart,
    removeFromCart
} from "../store/cart/cartActionTypes";
import globalStyles from "../styles/globalStyles";
import {useTheme} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import TouchableFeedback from "./TouchableFeedback";
import LoadingImage from "./LoadingImage";

type Props = {
    cartItem: CartItem
}

const CartItemComponent: FC<Props> = ({cartItem}) => {
    const primaryColor = useTheme().colors.primary
    const dispatch = useDispatch<CartDispatch>()

    return (
        <View style={styles.card}>
            <LoadingImage
                source={{uri: cartItem.product.img, width: 80}}
                style={{aspectRatio: 0.63}}
                componentDuringLoad={<ActivityIndicator/>}
                componentOnLoadFailed={<Text>PLT</Text>}
            />
            <View style={styles.content}>
                <Text>{cartItem.product.name}</Text>
                <Text style={[globalStyles.price, {marginVertical: 12}]}>£{cartItem.product.price}</Text>
                <View style={styles.controls}>
                    <TouchableFeedback
                        onPress={() => {
                            dispatch(decrementQuantityInCart(cartItem.product.id))
                        }}
                        disabled={cartItem.quantity == 1}
                    >
                        <Text
                            style={[styles.controlAction, {opacity: cartItem.quantity == 1 ? 0.4 : 1}]}
                        >
                            -
                        </Text>
                    </TouchableFeedback>

                    <Text style={{width: 50, textAlign: "center"}}>{cartItem.quantity}</Text>

                    <TouchableFeedback
                        onPress={() => {
                            dispatch(incrementQuantityInCart(cartItem.product.id))
                        }}
                    >
                        <Text
                            style={styles.controlAction}
                        >
                            +
                        </Text>
                    </TouchableFeedback>

                    <View style={{flex: 1}}/>
                    <TouchableFeedback onPress={() => dispatch(removeFromCart(cartItem.product.id))}>
                        <Text style={{color: primaryColor, padding: 5}}>Remove</Text>
                    </TouchableFeedback>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        marginBottom: 30,
        flexDirection: "row"
    },
    content: {
        flex: 1,
        marginHorizontal: 10,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
    },
    controlAction: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "black",
        includeFontPadding: false,
        width: 25,
        height: 25,
        borderRadius: 4
    }
})

export default React.memo(CartItemComponent);
