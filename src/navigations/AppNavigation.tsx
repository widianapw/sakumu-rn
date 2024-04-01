/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import {navigationRef} from './RootNavigation';
import AppNavigationType from './AppNavigationType';
import {useSelector} from 'react-redux';
import {rootReducer} from '../redux/stores/store';
import {useTheme} from '@tmd/providers/ThemeProvider.tsx';
import SplashScreen from '../modules/intro/ui/screens/SplashScreen.tsx';
import LoginScreen from '../modules/auth/ui/screens/LoginScreen.tsx';
import IntroScreen from '../modules/intro/ui/screens/IntroScreen.tsx';
import RegisterScreen from '../modules/auth/ui/screens/RegisterScreen.tsx';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const {isAuthenticated} = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.authReducer,
  );
  const {isLoading: isLoadingSplash, isNeedIntro} = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.splashReducer,
  );
  const {theme} = useTheme();
  const NavTheme = {
    ...theme,
    colors: {
      ...theme?.colors,
      background: theme?.colors.neutral.neutral_10,
    },
  };
  return (
    <NavigationContainer ref={navigationRef} theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoadingSplash ? (
          <>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
          </>
        ) : (
          <>
            {!isAuthenticated ? (
              <>
                {isNeedIntro ? (
                  <Stack.Screen name={'IntroScreen'} component={IntroScreen} />
                ) : (
                  <>
                    <Stack.Screen
                      name={'LoginScreen'}
                      component={LoginScreen}
                    />
                    <Stack.Screen
                      name={'RegisterScreen'}
                      component={RegisterScreen}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <Stack.Screen name={'MainScreen'} component={MainScreen} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
