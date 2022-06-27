/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { VStack } from "react-native-flex-layout";

const MainScreen = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState({});
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(
        JSON.stringify(userInfo, null, 2),
      );
      // console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo({});
    } catch (error) {
      console.error(error);
    }
  };

  return <ScrollView>
    <VStack
      spacing={16}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <GoogleSigninButton
          style={{}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            signIn();
          }}
        />
        <Typography style={{ color: "black" }}>{userInfo?.user?.name}</Typography>

        <Button color={"red"} onPress={signOut}>Logout Google</Button>
      </View>

      <Button
        onPress={() => {
          navigation.navigate("ButtonScreen");
        }}
      >
        Button
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("TypographyScreen");
        }}
      >
        Typography
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("TextFieldScreen");
        }}
      >
        TextField
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("PickerScreen");
        }}
      >
        Picker
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("BottomSheetScreen");
        }}
      >
        Bottom Sheet
      </Button>

      <Button onPress={() => {
        navigation.navigate("TagScreen");
      }}>
        Tag
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("AlertScreen");
        }}
      >
        Alert
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("SelectorScreen");
        }}
      >
        Selector
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("APIScreen");
        }}
      >
        API Screen
      </Button>


      <Button onPress={() => {
        navigation.navigate("ChipScreen");
      }}>
        Chip Screen
      </Button>


      <Button
        onPress={() => {
          navigation.navigate("LanguageScreen");
        }}>
        Language Screen
      </Button>

    </VStack>

  </ScrollView>;
};

export default MainScreen;
