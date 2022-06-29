/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext } from "react";
import { Permission } from "react-native-permissions/src/types";
import { requestMultiple } from "react-native-permissions";
import _permissionTypes, { PermissionOS } from "../data/_permissionTypes";
import { PermissionType, useBottomSheet } from "./BottomSheetProvider";
import { Platform } from "react-native";

type PermissionContextType = {
  requestPermissions: (permissions: PermissionOS[], onGranted?: () => void) => void;
}

const initialState: PermissionContextType = {
  requestPermissions: (permissions: PermissionOS[], onGranted?: () => void) => {
  },
};

export const PermissionContext = createContext(initialState);
export const usePermission = () => useContext(PermissionContext);

const PermissionProvider = ({ children }: any) => {
  const { showPermissionBS, hidePermissionBS } = useBottomSheet();
  const getPermissionType = (permission: Permission | undefined): PermissionType => {
    if (permission) {
      const isAndroid = Platform.OS == "android";
      let type;
      if (isAndroid) {
        type = _permissionTypes.find((it) => it.permissions.android.includes(permission));
      } else {
        type = _permissionTypes.find((it) => it.permissions.ios.includes(permission));
      }
      if (type) {
        return type.type;
      } else {
        return "another";
      }
    } else {
      return "another";
    }
  };

  const requestPermissions = (permissions: PermissionOS[], onGranted?: () => void) => {
    const isAndroid = Platform.OS == "android";
    let osPermissions: Permission[];
    if (isAndroid) {
      osPermissions = permissions.map(it => it.android).flat();
    } else {
      osPermissions = permissions.map(it => it.ios).flat();
    }
    requestMultiple(osPermissions)
      .then((statuses) => {
        const results = osPermissions.map(it => statuses[it] == "granted");
        console.log(results);
        if (!results.includes(false)) {
          if (onGranted) {
            onGranted();
          }
        } else {
          //get first that are not granted
          const notGranted = osPermissions.find(it => statuses[it] != "granted");
          const type = getPermissionType(notGranted);
          showPermissionBS(type);
        }
      });
  };
  return (
    <PermissionContext.Provider
      value={{ requestPermissions }}>
      {children}

    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
