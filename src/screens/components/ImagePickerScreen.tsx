/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Page from "../../../tmd/components/Page";
import { ScrollView } from "react-native";
import ImagePicker from "../../../tmd/components/picker/ImagePicker";
import { VStack } from "react-native-flex-layout";
import MultiImagePicker from "../../../tmd/components/picker/MultiImagePicker";

export default function ImagePickerScreen() {
  return (
    <Page>
      <ScrollView>
        <VStack p={16}>
          <ImagePicker
            label={"Select Image"}
            description={"Pick an image from your camera roll"}
            buttonProps={{
              icon: {
                icon: "camera",
              },
            }}
          />

          <MultiImagePicker
            style={{marginTop: 16}}
            label={"Multiple Image"}
            description={"Pick an image from your camera roll"}
            buttonProps={{
              icon: {
                icon: "camera",
              },
            }}
          />

        </VStack>
      </ScrollView>
    </Page>
  );
}