import React, {FC} from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProductsScreen from "../screens/ProductsScreen";
import {withErrorBoundary} from "../errorBoundary/ErrorBoundary";
import produce from "immer";
import CartCount from "../components/CartCount";
import CartScreen from "../screens/CartScreen";


export type RootStackParam = {
    Products;
    Cart;
};

const Stack = createNativeStackNavigator<RootStackParam>()

const Theme = produce(DefaultTheme, draftTheme => {
    draftTheme.colors.primary = "hotpink";
    draftTheme.colors.background = "white";
})

/**
 * Handles main stack navigation of the app.
 * Error boundary is handled per screen.
 */
const MainNavigation: FC = () => {
    return (
        <NavigationContainer theme={Theme}>
            <Stack.Navigator>
                <Stack.Screen name="Products"
                              options={{
                                  headerRight: CartCount
                              }}
                              component={
                                  withErrorBoundary(ProductsScreen, "Failed to load Products")
                              }/>
                <Stack.Screen name="Cart" component={withErrorBoundary(CartScreen, "Failed to load Cart")}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;
