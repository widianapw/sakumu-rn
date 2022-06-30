/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import { VStack } from "react-native-flex-layout";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Button, RHFPhoneField, RHFTextField } from "../../../tmd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthProvider";
import { useSelector } from "react-redux";

export default function LoginScreen() {
  const { login, isLoadingLogin, isAuthenticated } = useAuth();
  const isssss = useSelector(state => state.isAuthenticated);
  const schema = yup.object({
    phone_code: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
  }).required();

  const method = useForm({
    defaultValues: {
      phone_code: "62",
      phone: "82146456432",
      password: "password",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data?.phone, data?.phone_code, data?.password);
  };

  return (
    <ScrollView style={{
      flex: 1,
    }}>
      <FormProvider {...method}>
        <VStack p={16} spacing={16} style={{
          flex: 1,
        }}>
          <View>

            <RHFPhoneField
              mode={"filled"}
              name={"phone"}
              phoneCodeName={"phone_code"}
              label={"Phone"}
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
            onPress={method.handleSubmit(onSubmit)}
            containerStyle={{
              marginTop: 24,
            }}
            fullWidth
          >Login</Button>
        </VStack>
      </FormProvider>
    </ScrollView>
  );
}
