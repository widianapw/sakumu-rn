/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, Stack } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { useAuth } from "../providers/AuthProvider";
import { useLocale } from "../providers/LocaleProvider";
import Page from "../../tmd/components/Page";
import { navigate } from "../navigations/RootNavigation";

const MainScreen = ({ navigation }: any) => {
  const { user, logout, isLoadingLogout } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const { momentLocale } = useLocale();


  return (
    <Page>
      <ScrollView style={{ flex: 1 }}>
        <Stack
          spacing={16}
          p={16}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Welcome, {user?.name}</Typography>
          <Typography>{momentLocale.format("DD MMMM YYYY")}</Typography>

          <Button
            onPress={() => {
              navigate("ButtonScreen");
            }}
          >
            Button
          </Button>

          <Button
            onPress={() => {
              navigate("TypographyScreen");
            }}
          >
            Typography
          </Button>

          <Button
            onPress={() => {
              navigate("TextFieldScreen");
            }}
          >
            TextField
          </Button>

          <Button
            onPress={() => {
              navigate("PickerScreen");
            }}
          >
            Picker
          </Button>

          <Button
            onPress={() => {
              navigate("BottomSheetScreen");
            }}
          >
            Bottom Sheet
          </Button>

          <Button onPress={() => {
            navigate("TagScreen");
      }}>
        Tag
      </Button>

      <Button
        onPress={() => {
          navigate("AlertScreen");
        }}
      >
        Alert
      </Button>

      <Button
        onPress={() => {
          navigate("SelectorScreen");
        }}
      >
        Selector
      </Button>

      <Button
        onPress={() => {
          navigate("APIScreen");
        }}
      >
        API Screen
      </Button>


          <Button onPress={() => {
            navigate("ChipScreen");
          }}>
            Chip Screen
          </Button>

          <Button onPress={() => {
            navigate("OTPScreen");
          }}>
            OTP INPUT
          </Button>

          <Button onPress={() => {
            navigate("ImagePickerScreen");
          }}>
            Image Picker
          </Button>

          <Button onPress={() => {
            navigate("LayoutScreen");
          }}>
            Layout Screen
          </Button>

          <Button onPress={() => {
            navigate("FormScreen");
          }}>
            Form Input
          </Button>


          <Button
            onPress={() => {
              navigate("LanguageScreen");
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
        </Stack>

      </ScrollView>
    </Page>
  )
};

export default MainScreen;
