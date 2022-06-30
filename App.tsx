/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

/**
 * USE YARN.
 * NPM IS SUCKS
 */

import React from "react";
import { DefaultTheme, Provider as ThemeProvider } from "./tmd";
import AppNavigation from "./src/navigations/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import BottomSheetProvider from "./tmd/providers/BottomSheetProvider";
import { Host } from "react-native-portalize";
import PermissionProvider from "./tmd/providers/PermissionProvider";
import LocaleProvider from "./src/providers/LocaleProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./src/providers/AuthProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import Typography from "./tmd/components/Typography/Typography";

GoogleSignin.configure({
  webClientId: "992506026123-uqeer92bafkp826i1s3c3786qcs8cpk3.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});
// Create a client
const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={
        <Typography>
          Loading Redux Persistor...
        </Typography>
      }>
        <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={DefaultTheme}>
              <LocaleProvider>
                <Host>
                  <AuthProvider>
                    <BottomSheetProvider>
                      <PermissionProvider>
                        <AppNavigation />
                      </PermissionProvider>
                    </BottomSheetProvider>
                  </AuthProvider>
                </Host>
              </LocaleProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};


export default App;
