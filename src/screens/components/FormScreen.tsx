/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import { VStack } from "react-native-flex-layout";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, RHFDatePicker, RHFPhoneField, RHFTimePicker } from "../../../tmd";
import RHFTextField from "../../../tmd/components/RHF/RHFTextField";
import RHFSelect from "../../../tmd/components/RHF/RHFSelect";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";

export default function FormScreen() {
  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    countryID: yup.string().required(),
    phoneCode: yup.string().required(),
    phone: yup.string().required().min(6).max(12),
    date: yup.string().required(),
    time: yup.string().required(),
  }).required();

  const method = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      countryID: "",
      phoneCode: "93",
      phone: "",
      date: "",
      time: "",
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = method;

  const onSubmit = data => console.log(data);
  return (
    <Page>

      <ScrollView style={{
        flex: 1,
      }}>

        <FormProvider {...method}>
          <VStack p={16} spacing={16} style={{
            flex: 1,
          }}>
            <View>
              <RHFTextField
                label={"First Name"}
                name={"firstName"}
                placeholder={"Enter your first name"}
              />
            </View>
            <View>
              <RHFTextField
                label={"Last Name"}
                name={"lastName"}
                placeholder={"Enter your last name"}

              />
            </View>
            <View>
              <RHFSelect
                label={"Country"}
                name={"countryID"}
                placeholder={"Enter your country"}
                options={_countries.map(it => {
                  const i: PickerItem = {
                    id: it.code,
                    name: it.name,
                  };
                  return i;
                })}
              />
            </View>

            <View>
              <RHFPhoneField
                name={"phone"}
                phoneCodeName={"phoneCode"}
                label={"Phone"}
                placeholder={"Enter your phone"}
              />
            </View>

            <View>
              <RHFDatePicker
                name={"date"}
                label={"Date"}
                placeholder={"Enter your date"}
              />
            </View>
            <View>
              <RHFTimePicker
                name={"time"}
                label={"Time"}
                placeholder={"Enter your time"}
              />
            </View>
            <Button
              containerStyle={{
                marginTop: 16,
              }}
              fullWidth
              onPress={handleSubmit(onSubmit)}
            >Submit Form</Button>
          </VStack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
