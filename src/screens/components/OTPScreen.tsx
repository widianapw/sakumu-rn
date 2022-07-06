/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import OTPInput from "../../../tmd/components/Otp/OTPInput";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";

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
            pinCount={5} />

          <OTPInput
            mode={"flat"}
            pinCount={5} />

          <OTPInput
            mode={"contained"}
            pinCount={5} />
        </Stack>
      </ScrollView>
    </Page>
  );
}
