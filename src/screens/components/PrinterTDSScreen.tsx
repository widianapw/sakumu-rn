import React, { useEffect, useState } from "react";
import { Button, Page, Stack, Toolbar } from "../../../tmd";
import { ScrollView } from "react-native";
import Share from "react-native-share";
import ThermalPrinterModule from "react-native-thermal-printer";
import Select from "../../../tmd/components/Select/Select";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Typography from "../../../tmd/components/Typography/Typography";

////////ANDROID ONLY SYG
export default function PrinterTDSScreen() {
  const [bluetoothOptions, setBluetoothOptions] = useState<PickerItem[]>([]);
  const [selectedBluetooth, setSelectedBluetooth] = useState<PickerItem | undefined>();
  const [isLoadingGetBluetooth, setIsLoadingGetBluetooth] = useState(false);
  useEffect(() => {
    setIsLoadingGetBluetooth(true);
    ThermalPrinterModule.getBluetoothDeviceList().then((devices) => {
      const options = devices.map((device) => {
        return {
          id: device.macAddress,
          name: device.deviceName,
        };
      });
      setIsLoadingGetBluetooth(false);
      setBluetoothOptions(options);
    }).catch((e) => {
      setIsLoadingGetBluetooth(false);
      console.log(e);
    });
  }, []);

  const handleShare = async () => {
    try {
      await Share.open({
        message: "Pande Putri is a supermarket that provides various types of goods ranging from basic needs, household needs, electronics and other necessities. Pande Putri has managed to grow rapidly since it was founded and it has successfully opened 2 more branches. Until now, there are 4 branches of Pande Putri Supermarket in the Sanur area.",
        url: "https://dev-admin.pandeputrigroup.com/",
      });
    } catch (e) {
      console.log(e);
    }
  };


  const handlePrint = async () => {
    const text =
      "[L]\n" +
      "[L]================================\n" +
      "[L]PANDE PUTRI SUPERMARKET\n" +
      "[L]================================\n" +
      "[L]\n";
    if (selectedBluetooth?.id) {
      try {
        await ThermalPrinterModule.printBluetooth({
          payload: text,
          macAddress: String(selectedBluetooth?.id),
        });
      } catch (e) {
        console.log(e?.message);
      }
    }
  };

  return <Page>
    <Toolbar title={"Printer Screen"} />
    <ScrollView>
      <Stack p={16} spacing={16}>
        <Select
          loading={isLoadingGetBluetooth}
          onSelectedItemChange={(item) => setSelectedBluetooth(item)}
          options={bluetoothOptions} label={"Select Bluetooth to Connect"} placeholder={"Select bluetooth"} />
        <Button onPress={handleShare}>Share</Button>
        <Typography type={"label1"}>Selected Bluetooth: {selectedBluetooth?.name}</Typography>
        <Button onPress={handlePrint}>Print</Button>
      </Stack>
    </ScrollView>
  </Page>;
}
