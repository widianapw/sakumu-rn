/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { VStack } from "react-native-flex-layout";
import { useAuth } from "../providers/AuthProvider";
import { useLocale } from "../providers/LocaleProvider";
import Page from "../../tmd/components/Page";

const MainScreen = ({ navigation }: any) => {
  const { user, logout, isLoadingLogout } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const { momentLocale } = useLocale();


  return (
    <Page>

      <ScrollView>
        <VStack
          spacing={16}
          p={16}
          center
        >
          <Typography>Welcome, {user?.name}</Typography>
          <Typography>{momentLocale.format("DD MMMM YYYY")}</Typography>

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

      <Button onPress={() => {
        navigation.navigate("OTPScreen");
      }}>
        OTP INPUT
      </Button>

      <Button onPress={() => {
        navigation.navigate("FormScreen");
      }}>
        Form Input
      </Button>


      <Button
        onPress={() => {
          navigation.navigate("LanguageScreen");
        }}>
        Language Screen
      </Button>

          <Button
            color={"red"}
            loading={isLoadingLogout}
            onPress={logout}
          >
            Logout
          </Button>
        </VStack>

      </ScrollView>
    </Page>
  )
};

export default MainScreen;
