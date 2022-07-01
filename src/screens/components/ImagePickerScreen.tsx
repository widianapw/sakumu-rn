/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../tmd";
import ImagePickerBottomSheet from "../../../tmd/components/BottomSheet/ImagePickerBottomSheet";

export default function ImagePickerScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenImagePicker = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ImagePickerBottomSheet
        open={isOpen}
        title={"Pilih Foto"}
        onClose={() => {
          setIsOpen(false);
        }} />
      <ScrollView>
        <VStack p={16} spacing={16}>
          <Button onPress={handleOpenImagePicker}>
            Open Image Picker
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}
