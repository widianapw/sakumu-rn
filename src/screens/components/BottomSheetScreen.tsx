/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../tmd";
import IllustNoConnection from "../../assets/illusts/no_internet_connection.svg";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import DateFilterBottomSheet from "../../../tmd/components/BottomSheet/DateFilterBottomSheet";

export default function BottomSheetScreen() {
  const { showConfirmationBS, hideConfirmationBS, showAlertBS, hideAlertBS } = useBottomSheet();
  const handleShowConfirmation = () => {
    showConfirmationBS({
      title: "Takin ingin Tanda Tangan Kontrak?",
      imageNode: <IllustNoConnection />,
      description: "Selesaikan kontrak dengan melakukan tanda tangan digital pada aplikasi",
      buttonPrimaryAction: () => {
        hideConfirmationBS();
      },
    });
  };

  const handleShowAlert = () => {
    showAlertBS({
      title: "Hmm, Internet kamu putus",
      imageNode: <IllustNoConnection />,
      description: "Tenang, cek koneksi internet atau Wi-fi kamu dan coba lagi ya...",
    });
  };

  const [isShowDateFilter, setIsShowDateFilter] = useState(false);

  return (
    <>
      <DateFilterBottomSheet open={isShowDateFilter} onClose={() => setIsShowDateFilter(false)} onReset={() => {}}/>
      <ScrollView>
        <VStack spacing={16} style={{
          padding: 16,
        }}>
          <Button onPress={() => {
            handleShowAlert();
          }}>Alert / Error BottomSheet</Button>
          <Button onPress={() => {
            handleShowConfirmation();
          }}
          >Confirmation BottomSheet</Button>
          <Button
            onPress={() => {
              setIsShowDateFilter(true);
            }}
          >
            Date Filter BottomSheet</Button>
        </VStack>
      </ScrollView>
    </>
  );
}
