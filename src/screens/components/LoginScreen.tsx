/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import * as yup from "yup";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, RHFPhoneField, RHFTextField } from "../../../tmd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import RHFSignatureCanvas from "../../../tmd/components/RHF/RHFSignatureCanvas";
import Typography from "../../../tmd/components/Typography/Typography";

export default function LoginScreen() {
  const { login, isLoadingLogin } = useAuth();
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  }).required();

  const defaultValues = {
    email: "anikolaus@example.org",
    password: "password",
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await login(data?.email, data?.password);
  };

  const [scrollable, setScrollable] = useState(true);
  return (
    <Page>
      <ScrollView
        scrollEnabled={scrollable}
        style={{
          flex: 1,
        }}>
        <FormProvider {...method}>
          <Stack p={16} spacing={16} style={{
            flex: 1,
          }}>
            <View>
              <RHFTextField
                name={"email"}
                label={"Email"}
                />
            </View>

            <View>
              <RHFTextField
                name={"password"}
                label={"Password"}
                password
              />
            </View>




            <Button
              loading={isLoadingLogin}
              onPress={method.handleSubmit(onSubmit, (e) => {
                console.log(e);
              })}
              style={{
                marginTop: 24,
              }}
              fullWidth
            >Login</Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
