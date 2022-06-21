import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, View } from "react-native";
import { _dateFilters } from "../../data/_dateFilters";
import RadioButton from "../RadioButton/RadioButton";
import { Button, Divider } from "../../index";
import Typography from "../Typography/Typography";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { HStack, VStack } from "react-native-flex-layout";
import { DatePicker } from "../picker/DatePicker";


/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */

type DateFilterPayload = {
  id: number;
  start_date?: string;
  end_date?: string;
}

interface Props {
  open: boolean;
  initial?: DateFilterPayload;
  onClose: () => void;
  onSave?: (data: DateFilterPayload) => void;
  onReset?: () => void;
  title?: string;
}

export default function DateFilterBottomSheet({ open, initial, onClose, ...props }: Props) {
  const modalizeRef = useRef<Modalize>(null);
  const [selectedItem, setSelectedItem] = useState<DateFilterPayload>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const list = _dateFilters;
  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    } else {
      modalizeRef?.current?.close();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const RenderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        console.log(item?.id);
        setSelectedId(item?.id);
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8 }}>
        <RadioButton
          containerStyle={{
            flexDirection: "row-reverse",
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            flex: 1,
          }}
          value={item?.id}
        />
      </View>
      <Divider />
    </Pressable>;
  };


  return (
    <>
      <Portal>
        <Modalize
          modalStyle={{
            padding: 16,
          }}
          adjustToContentHeight
          handlePosition={"inside"}
          ref={modalizeRef}
          onClose={() => {
            handleClose();
          }}
        >
          <View
            style={{
              paddingVertical: 16,
            }}
          >
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <Typography type={"title2"}>{props.title ?? "Filter Data"}</Typography>
              {
                props.onReset &&
                <Button
                  size={"sm"}
                  shape={"rounded"}
                  variant={"secondary"}
                  onPress={props?.onReset}
                >Reset</Button>
              }
            </View>
            <RadioButtonGroup
              onValueChange={(value) => {
                // console.log(value);
                setSelectedId(value);
                // setSelectedItem(value);
              }}
              value={selectedId}>
              {
                list.map((item) => {
                  return <RenderItem item={item} key={item.id} />;
                })
              }
            </RadioButtonGroup>

            {
              selectedId == 4 &&
              <HStack spacing={8} mt={16}>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    label={"Start Date"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    label={"End Date"}
                  />
                </View>
              </HStack>
            }

            <VStack mt={24}>
              <Button
                onPress={() => {
                  if (props.onSave) {
                    props.onSave(selectedItem);
                  }
                }}
                style={{
                  width: "100%",
                }}
              >Apply Filter</Button>
            </VStack>
          </View>
        </Modalize>
      </Portal>
    </>
  )
    ;
};
