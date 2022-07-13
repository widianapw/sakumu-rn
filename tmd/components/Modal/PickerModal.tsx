/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { useTheme } from "../../core/theming";
import { Modal, SafeAreaView } from "react-native";
import { PickerItem } from "../../model/PickerItem";

interface Props {
  open?: boolean;
  onClose?: () => void;
  value?: string | number;
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (item?: PickerItem) => void;
  title?: string;
  search?: boolean;
}

export default function PickerModal({ open, onClose, value, data, onReset, onSave, title, search }: Props) {
  const { colors } = useTheme();
  return (
    <>
      <Modal
        visible={open}
        onRequestClose={onClose}
        animationType={"slide"}>
        <SafeAreaView>

        </SafeAreaView>
      </Modal>
    </>
  );
}
