/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useRef, useState } from "react";
import TextField from "../TextInput/TextField";
import Icon from "../Icon";
import { Modal, View } from "react-native";
import { Modalize } from "react-native-modalize";
import Typography from "../Typography/Typography";
import { Button } from "../../index";
import IconButton from "../IconButton";
import MapView from "react-native-maps";
import { HStack, VStack } from "react-native-flex-layout";

export default function MapPicker({ ...rest }: React.ComponentProps<typeof TextField>) {
  const modalizeRef = useRef<Modalize>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => {
    setIsModalOpen(true);

    // modalizeRef?.current?.open();
  };

  return (
    <>
      <TextField
        pickerType={"map"}
        editable={false}
        onOpenPicker={handleOpen}
        suffixIcon={
          <Icon icon={"map"} size={18} />
        }
        {...rest}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalOpen}
      >
        <View style={{
          position: "relative",
          flexGrow: 1,
        }}>

          <MapView
            style={{
              position: "absolute",
              flex: 1,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />


          <View style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            zIndex: 50,
            backgroundColor: "white",
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }}>
            <VStack>

              <HStack justify={"between"} items={"center"}>
                <Typography type={"title1"}>Select Location</Typography>
                <Button variant={"secondary"} size={"sm"} shape={"rounded"}>Search</Button>
              </HStack>

              <Button fullWidth size={'md'}>Save</Button>

            </VStack>

          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
              }}>
              <IconButton
                style={{
                  margin: 16,
                  backgroundColor: "white",
                  elevation: 8,
                }}
                onPress={() => {
                  setIsModalOpen(false);
                }}
                icon={"arrow-back"}
              />
              <View style={{ flexGrow: 1 }} />
              <IconButton
                style={{
                  backgroundColor: "white",
                  elevation: 8,
                  margin: 16,
                }}
                onPress={() => {

                }}
                icon={"locate"}
              />

            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
