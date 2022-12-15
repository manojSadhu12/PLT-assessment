import {SafeAreaView, StatusBar} from "react-native";
import MainNavigation from "./navigation/MainNavigation";
import {Provider as ReduxProvider} from "react-redux";
import configureStore from "./store/store";

export default function App() {
    return (
        <ReduxProvider store={configureStore()}>
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle={"dark-content"} backgroundColor={"white"}/>
                <MainNavigation/>
            </SafeAreaView>
        </ReduxProvider>
    );
}