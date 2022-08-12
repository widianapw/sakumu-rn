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
    phone_code: yup.string().required(),
    phone: yup.string().required().min(6).max(13),
    password: yup.string().required().min(8),
    signature: yup.string().required(),
  }).required();

  const defaultValues = {
    phone_code: "62",
    phone: "82146456432",
    password: "password",
    signature: "",
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await login(data?.phone, data?.phone_code, data?.password);
  };

  const watchSignature = useWatch({
    control: method.control,
    name: "signature",
  });

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


            <View>
              <RHFSignatureCanvas
                onProgress={(isOnProgress) => {
                  setScrollable(!isOnProgress);
                }}
                name={"signature"}
                label={"Signature"}
                canvasStyle={{
                  height: 200,
                }}
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

            {
              (watchSignature != "") &&
              <>
                <Image
                  source={{ uri: watchSignature }}
                  style={{
                    width: 100, height: 100,
                  }} />
                <Typography>{watchSignature}</Typography>
              </>
            }
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
