/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../core/theming";
import { Portal } from "react-native-portalize";
import { Pressable, View } from "react-native";
import { Box, VStack } from "react-native-flex-layout";
import Typography from "../Typography/Typography";
import Divider from "../Divider";
import Icon from "../Icon";

export interface ImagePickerBSProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  dismissable?: boolean;
}

export default function ImagePickerBottomSheet(props: ImagePickerBSProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (props.open) {
      modalizeRef?.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [props.open]);

  const handleClose = () => {
    modalizeRef?.current?.close();
    // props.onClose();
  };

  const theme = useTheme();
  return (
    <Portal>
      <Modalize
        closeOnOverlayTap={props.dismissable ? !props.dismissable : true}
        handlePosition={"inside"}
        adjustToContentHeight
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}

        onClose={props.onClose}
        ref={modalizeRef}
      >
        <View style={{
          flexDirection: "column",
          paddingVertical: 16,
        }}>
          <VStack>
            {
              props.title &&
              <Typography type={"title2"}>{props.title}</Typography>
            }
            <Box pt={16} />
            {
              <Pressable
                onPress={() => {
                }}
              >

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 16,
                  }}
                >

                  <Icon icon={"camera"} />
                  <Typography type={"label1"} style={{
                    flexGrow: 1,
                    marginStart: 16,
                  }}>Ambil dari kamera</Typography>
                  <Icon icon={"chevron-forward"} />
                </View>
              </Pressable>

            }
            <Divider style={{ marginStart: 38 }} />
            {
              <Pressable
                onPress={() => {
                }}
              >

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 16,
                  }}
                >

                  <Icon icon={"folder-open"} />
                  <Typography type={"label1"} style={{
                    flexGrow: 1,
                    marginStart: 16,
                  }}>Ambil dari galeri</Typography>
                  <Icon icon={"chevron-forward"} />
                </View>
              </Pressable>

            }
          </VStack>

        </View>

      </Modalize>
    </Portal>
  );
}

