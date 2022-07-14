/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Modal, SafeAreaView, View } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { useLocale } from "../../../src/providers/LocaleProvider";
import Config from "react-native-config";
import TextField from "../TextInput/TextField";
import { Button, Divider, Icon, IconButton, Stack, useTheme } from "../../index";
import Typography from "../Typography/Typography";
import IllustNoLocation from "../../../src/assets/illusts/location_not_found.svg";
import Portal from "../Portal/Portal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelected: (data: GooglePlaceData | null, detail: GooglePlaceDetail | null) => void;
  onCurrentLocation: () => void;
}

export default function MapPlacePickerModal({ open, onClose, onSelected, onCurrentLocation }: Props) {
  const { t, currentLanguage } = useLocale();
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const { colors } = useTheme();

  useEffect(() => {
    if (open) {
      setTimeout(() => ref?.current?.focus(), 150);
    }
  }, [open]);

  const CustomTextField = React.forwardRef((props: any, ref) => {
    return (
      <View style={{
        flex: 1,
      }}>
        <View style={{ marginHorizontal: 16 }}>
          <TextField
            ref={ref}
            {...props}
            placeholder={t("search")}
          />
        </View>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 16,
            justifyContent: "space-between",
          }}>
          <Button
            onPress={onClose}
            icon={{
              icon: "map-outline",
            }}
            variant={"secondary"}
            size={"sm"}>{t("choose_from_map")}</Button>

          <Button
            onPress={() => {
              onCurrentLocation();
              onClose();
            }}
            variant={"secondary"}
            icon={{
              icon: "locate",
            }}
            size={"sm"}>{t("current_location")}</Button>
        </View>
        <Divider style={{
          marginTop: 16,
          borderColor: colors.neutral.neutral_30,
          borderWidth: 0.3,
        }} />
      </View>

    );
  });


  return (
    <>
      <Portal>

        <Modal visible={open} onRequestClose={onClose} animationType={"fade"}>
          <SafeAreaView style={{
            flex: 1,
          }}>
            {/*<ScrollView style={{*/}
            {/*  flex: 1,*/}
            {/*}}>*/}
            <KeyboardAvoidingView style={{
              flex: 1,
            }}>


              <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: "white",
              }}>
                <IconButton
                  onPress={() => {
                    onClose();
                  }}
                  icon={"arrow-back"}
                  color={colors.neutral.neutral_90}
                  style={{ backgroundColor: colors.neutral.neutral_10 }} />
                <Typography type={"title2"} style={{ marginStart: 8, flexGrow: 1 }}>
                  {t("choose_address")}
                </Typography>
              </View>
              <GooglePlacesAutocomplete
                ref={ref}
                fetchDetails={true}
                styles={{
                  container: {
                    flex: 1,
                    height: "100%",
                  },
                  textInputContainer: {
                    margin: 0,
                  },
                  listView: {
                    marginTop: 8,
                    paddingStart: 8,
                    paddingEnd: 16,
                  },
                  separator: {
                    marginStart: 42,
                    backgroundColor: colors.neutral.neutral_30,
                  },
                }}

                placeholder={t("search")}
                onPress={(data, detail) => {
                  onSelected(data, detail);
                  onClose();
                }}
                listEmptyComponent={() => {
                  return <Stack
                    spacing={4}
                    style={{
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 32,
                    }}>
                    <IllustNoLocation />
                    <Typography style={{ textAlign: "center", marginTop: 8 }}
                                type={"title2"}>{t("location_not_found")}</Typography>
                    <Typography style={{ textAlign: "center" }}>{t("location_not_found_description")}</Typography>
                  </Stack>;
                }}
                isRowScrollable={false}
                renderRow={(data, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Stack direction={"row"} spacing={8} style={{
                        alignItems: "flex-start",
                      }}>
                        <Icon icon={"location"} size={20} color={colors.neutral.neutral_90} />
                        <Stack spacing={4}>
                          <Typography type={"label1"}>{data?.structured_formatting?.main_text}</Typography>
                          <Typography
                            numberOfLines={2}
                            ellipsizeMode={"tail"}
                            type={"body3"}>{data?.description}</Typography>
                        </Stack>
                      </Stack>
                    </View>
                  );
                }}
                query={{
                  key: Config.GOOGLE_MAPS_API_KEY,
                  language: currentLanguage,
                }}
                textInputProps={{
                  InputComp: CustomTextField,
                  shape: "rounded",
                  search: true,
                  mode: "contained",
                  style: {
                    width: "100%",
                    backgroundColor: "white",
                  },
                  onClear: () => {
                    ref?.current?.clear();
                    ref?.current?.blur();
                  },
                }}
              />
            </KeyboardAvoidingView>
            {/*</ScrollView>*/}
          </SafeAreaView>
        </Modal>
      </Portal>
    </>
  );
}
