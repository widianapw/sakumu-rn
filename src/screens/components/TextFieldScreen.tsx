/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { TextInput, useTheme } from "../../../tmd";
import TextField from "../../../tmd/components/TextInput/TextField";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";

const TextFieldScreen = () => {
  const theme = useTheme();
  return (
    <Page>
      <KeyboardAvoidingView>
        <ScrollView
          style={{
            backgroundColor: theme.colors.neutral.neutral_10,
          }}
        >
          <Stack
            spacing={16}
            style={{
              padding: 16,
              flexDirection: "column",
            }}>


            <TextField
              helperText={"Helper Text"}
              requiredLabel
              mode={"flat"}
              label="Search"
              placeholder={"Search"}
              search
            />

            <TextField
              requiredLabel
              mode={"flat"}
              password
              label="Password"
              placeholder={"password"}
            />

            <TextField
              mode={"flat"}
              label="Counter"
              counter
              multiline
              numberOfLines={3}
              maxLength={300}
              placeholder={"Counter"}
            />


            <TextField
              maxLength={8}
              counter
              label="Counter"
              keyboardType={"numeric"}
              placeholder={"counter"}
            />

            <TextField
              requiredLabel
              helperText={"Helper Text"}
              mode={"contained"}
              label="Email"
              // error
              // errorText={"Email is required"}
              placeholder={"Email"}
            />

            <TextField
              style={{
                marginTop: 4,
              }}
              password
              mode={"contained"}
              label="Password"
              placeholder={"Password"}
            />

            <TextField
              mode={"contained"}
              label="Search"
              shape={"rect"}
              placeholder={"Search"}
              search
            />

            <TextField
              search
              mode={"filled"}
              shape={"rounded"}
              placeholder={"Filled"}
            />

            <TextField
              mode={"filled"}
              label="Filled"
              shape={"rect"}
              placeholder={"Filled"}
            />

            <TextField
              error={true}
              errorText={"Please input this field"}
              mode={"filled"}
              label="Filled"
              shape={"rect"}
              placeholder={"Filled"}
            />

          </Stack>
        </ScrollView>
      </KeyboardAvoidingView >
    </Page >
  )
};

export default TextFieldScreen;
