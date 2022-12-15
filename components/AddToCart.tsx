import React, {FC} from "react";
import {StyleSheet, Text} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Product} from "../store/products/productActionTypes";
import {useDispatch} from "react-redux";
import {addToCart, CartDispatch} from "../store/cart/cartActionTypes";
import TouchableFeedback from "./TouchableFeedback";

type Props = {
    product: Product,
    addedToCart: boolean
}

const AddToCart: FC<Props> = ({product, addedToCart}) => {
    const dispatch = useDispatch<CartDispatch>()

    const primaryColor = useTheme().colors.primary

    return (
        <TouchableFeedback
            onPress={() => {
                dispatch(addToCart(product))
            }}
            disabled={addedToCart}
            style={[styles.cartButton, {opacity: addedToCart ? 0.7 : 1}]}>
            <Text style={{color: primaryColor}}>
                {
                    addedToCart ? "✓ Added to cart" : "Add to Cart"
                }
            </Text>
        </TouchableFeedback>

    );
};

const styles = StyleSheet.create({
    cartButton: {
        padding: 5,
    }
})

export default AddToCart;
