import React, {FC, useState} from "react";
import {Image, ImageProps, StyleSheet, View} from "react-native";
import globalStyles from "../styles/globalStyles";

type Props = ImageProps & {
    componentDuringLoad: React.ReactNode,
    componentOnLoadFailed: React.ReactNode,
}

/**
 * This is Component handles loading and failed state and renders the corresponding fallback component
 * @param props
 * @constructor
 */
const LoadingImage: FC<Props> = (props) => {
    const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "failed">()
    return (
        <View>
            <Image
                {...props}
                onLoadStart={() => setImageStatus("loading")}
                onLoadEnd={() => setImageStatus("loaded")}
                onError={() => setImageStatus("failed")}
            />
            {
                imageStatus === "loading"
                    ? <View style={styles.fallbackComponent}>{props.componentDuringLoad}</View>
                    : imageStatus === "failed"
                        ? <View style={styles.fallbackComponent}>{props.componentOnLoadFailed}</View>
                        : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    fallbackComponent: {
        position: "absolute",
        width: "100%",
        height: "100%",
        ...globalStyles.center
    }
})

export default LoadingImage;
