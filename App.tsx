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
import AppNavigation from "./src/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import BottomSheetProvider from "./tmd/providers/BottomSheetProvider";
import { Host } from "react-native-portalize";
import PermissionProvider from "./tmd/providers/PermissionProvider";
import LocaleProvider from "./src/providers/LocaleProvider";
import { QueryClient, QueryClientProvider } from "react-query";

GoogleSignin.configure({
  webClientId: "992506026123-uqeer92bafkp826i1s3c3786qcs8cpk3.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});
// Create a client
const queryClient = new QueryClient();
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={DefaultTheme}>
          <LocaleProvider>
            <Host>
              <BottomSheetProvider>
                <PermissionProvider>
                  <AppNavigation />
                </PermissionProvider>
              </BottomSheetProvider>
            </Host>
          </LocaleProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};


export default App;
