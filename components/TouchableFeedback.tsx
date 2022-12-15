import React, {FC} from "react";
import {
    Platform,
    StyleProp,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";


type Props = TouchableNativeFeedbackProps & TouchableOpacityProps & {
    style?: StyleProp<ViewStyle> | undefined;
    children: React.ReactNode
}

/**
 * This ia a wrapper for TouchableNativeFeedback and TouchableOpacity to have platform specific click styling.
 * @param props
 * @constructor
 */
const TouchableFeedback: FC<Props> = (props) => {
    return (
        Platform.OS == "android" ?
            <TouchableNativeFeedback {...props}>
                <View style={props.style}>
                    {props.children}
                </View>
            </TouchableNativeFeedback>
            : <TouchableOpacity {...props}>
                <View style={props.style}>
                    {props.children}
                </View>
            </TouchableOpacity>

    );
};

export default TouchableFeedback;
