/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { VStack } from "react-native-flex-layout";
import { Button } from "../../../tmd";
import IllustNoConnection from "../../assets/illusts/no_internet_connection.svg";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import DateFilterBottomSheet, { DateFilterPayload } from "../../../tmd/components/BottomSheet/DateFilterBottomSheet";
import Typography from "../../../tmd/components/Typography/Typography";
import { usePermission } from "../../../tmd/providers/PermissionProvider";
import { CAMERA_PERMISSIONS, LOCATION_PERMISSIONS, STORAGE_PERMISSIONS } from "../../../tmd/data/_permissionTypes";
import useBankService from "../../services/bank/useBankService";
import Page from "../../../tmd/components/Page";

export default function BottomSheetScreen() {
  const { getBank } = useBankService();
  const {
    showConfirmationBS,
    hideConfirmationBS,
    showAlertBS,
  } = useBottomSheet();
  const { requestPermissions } = usePermission();
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


  const requestPermission = () => {
    requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS, LOCATION_PERMISSIONS],
      () => {
        Alert.alert("GRANTED ");
      });
  };

  const [isShowDateFilter, setIsShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateFilterPayload | null>(null);
  return (
    <>
      <Page>

        <DateFilterBottomSheet
          open={isShowDateFilter}
          initial={selectedDate}
          onClose={() => setIsShowDateFilter(false)}
          onReset={() => {
            setSelectedDate(null);
            setIsShowDateFilter(false);
          }}

          onSave={(data) => {
            setSelectedDate(data);
            setIsShowDateFilter(false);
          }} />
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
            {
              selectedDate &&
              <Typography>
                Date Start = {selectedDate?.date_range?.start_date}, Date End = {selectedDate?.date_range?.end_date}
              </Typography>
            }

            <Button
              onPress={() => {
                getBank()
              }}
            >
              GET DATA WITH ERROR
            </Button>

            <Button
              onPress={requestPermission}
            >
              PERMISSIONS (REJECT)
            </Button>
          </VStack>
        </ScrollView>
      </Page>
    </>
  );
}
