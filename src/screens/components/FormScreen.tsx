/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, RHFDatePicker, RHFPhoneField, RHFTimePicker, Stack } from "../../../tmd";
import RHFTextField from "../../../tmd/components/RHF/RHFTextField";
import RHFSelect from "../../../tmd/components/RHF/RHFSelect";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";
import RHFImagePicker from "../../../tmd/components/RHF/RHFImagePicker";
import { useLocale } from "../../providers/LocaleProvider";
import RHFMultiImagePicker from "../../../tmd/components/RHF/RHFMultiImagePicker";

export default function FormScreen() {
  const { t } = useLocale();
  const schema = yup.object({
    firstName: yup.string().required().label(t("labels.first_name")),
    lastName: yup.string().required().label(t("labels.last_name")),
    countryID: yup.string().required().label(t("labels.country")),
    phoneCode: yup.string().required().label(t("labels.phone_code")),
    phone: yup.string().required().min(6).max(12).label(t("labels.phone")),
    date: yup.string().required().label(t("labels.date")),
    time: yup.string().required().label(t("labels.time")),
    image: yup.mixed().required().label(t("labels.image")),
    multiImage: yup.array().min(2).required()
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
      image: undefined,
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
          <Stack p={16} spacing={16} style={{
            flex: 1,
          }}>
            <View>
              <RHFTextField
                label={t("labels.first_name")}
                name={"firstName"}
                placeholder={t("labels.first_name")}
              />
            </View>
            <View>
              <RHFTextField
                label={t("labels.last_name")}
                name={"lastName"}
                placeholder={t("labels.last_name")}

              />
            </View>
            <View>
              <RHFSelect
                label={t("labels.country")}
                name={"countryID"}
                placeholder={t("labels.country")}
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
                label={t("labels.phone")}
                placeholder={"Enter your phone"}
              />
            </View>

            <View>
              <RHFDatePicker
                name={"date"}
                label={t("labels.date")}
                placeholder={t("labels.date")}
              />
            </View>
            <View>
              <RHFTimePicker
                name={"time"}
                label={t("labels.time")}
                placeholder={t("labels.time")}
              />
            </View>
            <View>
              <RHFImagePicker
                description={"Pastikan foto KTP terlihat jelas dan dapat dibaca"}
                buttonProps={{
                  icon: {
                    icon: "camera",
                  },
                }}
                requiredLabel
                name={"image"}
                label={t("labels.image")} />
            </View>

            <View>
              <RHFMultiImagePicker
                ratio={'16:9'}
                description={"Pastikan foto KTP terlihat jelas dan dapat dibaca"}
                buttonProps={{
                  icon: {
                    icon: "camera",
                  },
                }}
                requiredLabel
                name={"multiImage"}
                label={"Multi Image"}
              />
            </View>

            <Button
              containerStyle={{
                marginTop: 16,
              }}
              fullWidth
              onPress={handleSubmit(onSubmit)}
            >Submit Form</Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
