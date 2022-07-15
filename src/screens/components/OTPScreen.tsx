/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import OTPInput from "../../../tmd/components/Otp/OTPInput";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import { Toast } from "../../../tmd";

export default function OTPScreen() {
  return (
    <Page>

      <ScrollView>
        <Stack
          spacing={16}
          style={{
            padding: 16,
          }}>
          <OTPInput
            onCodeFilled={(code) => {
              Toast.show(code);
            }}
            pinCount={6} />

          <OTPInput
            onCodeFilled={(code) => {
              Toast.show(code);
            }}
            mode={"flat"}
            pinCount={5} />

          <OTPInput
            onCodeFilled={(code) => {
              Toast.show(code);
            }}
            mode={"contained"}
            pinCount={5} />
        </Stack>
      </ScrollView>
    </Page>
  );
}
