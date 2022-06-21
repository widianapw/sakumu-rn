/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { View } from "react-native";
import Typography from "../Typography/Typography";
import { useTheme } from "../../core/theming";
import { Button } from "../../index";
import { HStack, VStack } from "react-native-flex-layout";

export interface BSProps {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondary?: boolean;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissable?: boolean;
}

export default function AlertBottomSheet(props: BSProps) {
  const modalizeRef = useRef<Modalize>(null);
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
          <VStack justify={"center"} items={"center"}>
            {
              props.imageNode &&
              props.imageNode
            }
            {
              props.title &&
              <Typography type={"title2"} style={{ textAlign: "center" }}>{props.title}</Typography>
            }
            {
              props.description &&
              <Typography type={"body1"} style={{
                color: theme.colors.neutral.neutral_80, textAlign: "center",
              }}>{props.description}</Typography>
            }
          </VStack>
          <HStack spacing={8} mt={18}>
            {
              props.buttonSecondary &&
              <Button
                fullWidth variant={"secondary"}
                onPress={() => {
                  if (props.buttonSecondaryAction) {
                    props.buttonSecondaryAction();
                  } else {
                    handleClose();
                  }
                }}
              >{props.buttonSecondaryTitle ?? "Cancel"}</Button>
            }
            <Button
              fullWidth
              onPress={() => {
                if (props.buttonPrimaryAction) {
                  props.buttonPrimaryAction();
                } else {
                  handleClose();
                }
              }}
            >{props.buttonPrimaryTitle ?? "Kembali"}</Button>

          </HStack>

        </View>

      </Modalize>
    </Portal>
  );
}
