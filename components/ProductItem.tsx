import React, {FC} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Product} from "../store/products/productActionTypes";
import globalStyles from "../styles/globalStyles";
import AddToCart from "./AddToCart";
import LoadingImage from "./LoadingImage";

type Props = {
    product: Product,
    addedToCart: boolean
}

const ProductItem: FC<Props> = ({product, addedToCart}) => {
    return (
        <View style={styles.card}>
            <LoadingImage
                source={{uri: product.img}}
                style={{aspectRatio: 0.63}}
                componentDuringLoad={<ActivityIndicator/>}
                componentOnLoadFailed={<Text>PLT</Text>}
            />
            <View style={styles.priceAlign}>
                <Text style={[globalStyles.price]}>£{product.price}</Text>
                <AddToCart product={product} addedToCart={addedToCart}/>
            </View>
            <Text style={[globalStyles.centerText, {marginTop: 4}]}>{product.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1 / 2,
        margin: 10,
        marginBottom: 30
    },
    priceAlign: {
        marginTop: 4,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default React.memo(ProductItem);
