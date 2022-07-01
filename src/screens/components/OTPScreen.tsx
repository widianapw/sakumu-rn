/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import OTPInput from "../../../tmd/components/Otp/OTPInput";
import Page from "../../../tmd/components/Page";

export default function OTPScreen() {
  return (
    <Page>

      <ScrollView>
        <VStack spacing={16} p={16}>
          <OTPInput
            pinCount={5} />

          <OTPInput
            mode={"flat"}
            pinCount={5} />

          <OTPInput
            mode={"contained"}
            pinCount={5} />
        </VStack>
      </ScrollView>
    </Page>
  );
}
