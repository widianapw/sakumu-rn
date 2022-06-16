/**
 * Created by Widiana Putra on 06/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Animated, FlatList, Image, Pressable, View } from "react-native";
import Typography from "../Typography/Typography";
import { Button, Divider, useTheme } from "../../index";
import TextField from "../TextInput/TextField";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { PickerItem } from "../../model/PickerItem";
import { RadioButton } from "../RadioButton/RadioButton";

interface Props {
  open?: boolean;
  onClose?: () => void;
  initial?: string;
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (id: string | number) => void;
  title?: string;
  search?: boolean;
}

export default function PickerBottomSheet(props: Props) {
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState(props.initial);
  const [list, setList] = useState(props.data);
  const theme = useTheme();
  const { colors } = theme;

  useEffect(() => {
    if (props.open) {
      modalizeRef?.current?.open();
      setSelected(props.initial);
    } else {
      modalizeRef?.current?.close();
    }
  }, [props.open]);


  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        setSelected(item?.id);
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8 }}>
        {
          item?.image &&
          <View style={{ marginRight: 8 }}>
            <Image
              source={{ uri: item?.image }}
              resizeMode={"center"}
              style={{
                width: 24,
                height: 24,
              }} />

          </View>
        }
        <Typography type={"body2"} style={{
          flexGrow: 1,
          flex: 1,
          color: colors.neutral.neutral_90,
        }}>{item?.name}</Typography>
        <RadioButton value={item?.id} />
      </View>
      <Divider />
    </Pressable>;
  };
  return <Portal>
    <Modalize
      onClose={() => {
        setList(props.data);
        props.onClose();
      }}
      customRenderer={
        <Animated.View style={{
          flex: 1,
          flexDirection: "column",
        }}>
          <View
            style={{ flexDirection: "column", paddingTop: 24, paddingBottom: 8 }}>

            <View
              style={{ flexDirection: "column", paddingHorizontal: 16 }}>

              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Typography type={"title2"}>{props.title ?? "Pick Data"}</Typography>
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
              {props.search &&
                <View style={{ marginTop: 8 }}>
                  <TextField
                    onInvokeTextChanged={(text) => {
                      if (text.length > 0) {
                        setList(props.data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
                      } else {
                        setList(props.data);
                      }
                    }}
                    mode={"contained"}
                    search
                    placeholder={"Search"}
                  />
                </View>
              }
            </View>
            {(props.search || props.onReset) &&
              <Divider
                variant={"dotted"}
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                }} />
            }
          </View>

          <View style={{ flexGrow: 1, flex: 1 }}>
            <RadioButtonGroup
              onValueChange={(value) => {
                setSelected(value);
              }}
              value={selected}>
              <FlatList
                style={{
                  paddingHorizontal: 16,
                }}
                data={list}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
              />
            </RadioButtonGroup>
          </View>
          <Divider
            style={{
              marginTop: 0,
            }}
            variant={"dotted"} />

          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <Button
              onPress={() => {
                props.onSave(selected);
              }}
              fullWidth
              shape={"rounded"}
            >Save</Button>
          </View>
        </Animated.View>
      }
      disableScrollIfPossible
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
