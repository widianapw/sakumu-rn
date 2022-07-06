/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef, useState } from "react";
import TextField from "../TextInput/TextField";
import Icon from "../Icon";
import { Image, Modal, SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { Button, useTheme } from "../../index";
import IconButton from "../IconButton";
import MapView from "react-native-maps";
import { HStack, VStack } from "react-native-flex-layout";
import Geocoder, { GeocodingObject } from "@timwangdev/react-native-geocoder";
import RNGooglePlaces from "react-native-google-places";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import Config from "react-native-config";
import MapPickerModal from "./MapPickerModal";
import { usePermission } from "../../providers/PermissionProvider";
import { LOCATION_PERMISSIONS } from "../../data/_permissionTypes";

export interface SelectedMap {
  fullAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  nameAddress?: string;
}

interface Props {
  onSelected?: (selected: SelectedMap) => void;
  initial?: SelectedMap;
}

export default function MapPicker({ onSelected, initial, ...rest }: React.ComponentProps<typeof TextField> & Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMap, setSavedMap] = useState<SelectedMap | null>(null);
  const {requestPermissions} = usePermission()
  const handleOpen = () => {
    requestPermissions(
      [LOCATION_PERMISSIONS], () => {
        setIsModalOpen(true);
      }
    )
  };


  return (
    <>
      <TextField
        selection={{ start: 0 }}
        pickerType={"map"}
        editable={false}
        onOpenPicker={handleOpen}
        value={savedMap?.fullAddress}
        suffixIcon={
          <Icon icon={"map"} size={18} />
        }
        {...rest}
      />


      <MapPickerModal
        open={isModalOpen}
        onSelected={(val) => {
          setSavedMap(val)
          if(onSelected){
            onSelected(val)
          }
        }}
        initial={initial}
        onClose={() => setIsModalOpen(false)} />
    </>
  );
}
