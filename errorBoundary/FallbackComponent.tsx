import React, {FC} from "react";
import {Text, View} from "react-native";
import globalStyles from "../styles/globalStyles";

export type FallbackComponentProps = {
    error: String
}

/**
 * Fallback component for error boundary
 * @param props
 * @constructor
 */
const FallbackComponent: FC<FallbackComponentProps> = (props) => {
    return (
        <View style={globalStyles.center}>
            <Text>{props.error}</Text>
        </View>
    );
};

export default FallbackComponent;
