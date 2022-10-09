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
import BottomSheetProvider from "./tmd/providers/BottomSheetProvider";
import { Host } from "react-native-portalize";
import PermissionProvider from "./tmd/providers/PermissionProvider";
import LocaleProvider from "./src/providers/LocaleProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./src/providers/AuthProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import ModalProvider from "./tmd/providers/ModalProvider";
import { RootSiblingParent } from "react-native-root-siblings";
// Create a client
const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={DefaultTheme}>
              <RootSiblingParent>
                <LocaleProvider>
                  <Host>
                      <BottomSheetProvider>
                        <ModalProvider>
                          <PermissionProvider>
                            <AuthProvider>
                              <AppNavigation />
                            </AuthProvider>
                          </PermissionProvider>
                        </ModalProvider>
                      </BottomSheetProvider>
                  </Host>
                </LocaleProvider>
              </RootSiblingParent>
            </ThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
