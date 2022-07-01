/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import { TextInput, useTheme } from "../../../tmd";
import TextField from "../../../tmd/components/TextInput/TextField";
import { VStack } from "react-native-flex-layout";

const TextFieldScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>

      <KeyboardAvoidingView>
        <ScrollView
          style={{
            backgroundColor: theme.colors.neutral.neutral_10,
          }}
        >
          <VStack
            spacing={16}
            style={{
              padding: 16,
              flexDirection: "column",
        }}>

        <TextInput
          required
          mode={"flat"}
          label="Search"
          placeholder={"Search"}
          search
        />

        <TextInput
          required
          mode={"flat"}
          password
          label="Password"
          placeholder={"password"}
        />

        <TextInput
          mode={"flat"}
          label="Counter"
          counter
          multiline
          numberOfLines={3}
          maxLength={300}
          placeholder={"Counter"}
        />


        <TextInput
          maxLength={8}
          counter
          label="Counter"
          keyboardType={"numeric"}
          placeholder={"counter"}
        />

        <TextInput
          required
          mode={"contained"}
          label="Email"
          placeholder={"Email"}
        />

        <TextInput
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
          label="Filled"
          shape={"rect"}
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

          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

export default TextFieldScreen;
