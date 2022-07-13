/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useState } from "react";
import TextField from "../TextInput/TextField";
import MapPickerModal from "../Modal/MapPickerModal";
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
        suffixIcon={{
          icon: "map",
        }}
        {...rest}
      />


      <MapPickerModal
        open={isModalOpen}
        onSelected={(val) => {
          console.log(val);
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
