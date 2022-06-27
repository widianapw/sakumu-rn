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
import RadioButton from "../RadioButton/RadioButton";
import { useTranslation } from "react-i18next";

interface Props {
  open?: boolean;
  onClose?: () => void;
  initial?: string;
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (item?: PickerItem) => void;
  title?: string;
  search?: boolean;
}

export default function PickerBottomSheet(props: Props) {
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState(props.initial);
  const [list, setList] = useState(props.data);
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();

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
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8, flex: 1 }}>
        {
          item?.image &&
          <View style={{ marginRight: 8 }}>
            {/*<Typography>{item?.image}</Typography>*/}
            <Image
              source={{ uri: item?.image }}
              resizeMode={"center"}
              style={{
                width: 24,
                height: 24,
              }} />

          </View>
        }

        <RadioButton
          containerStyle={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            color: colors.neutral.neutral_90,
          }}
          value={item?.id}
        />
      </View>
      <Divider />
    </Pressable>;
  };
  return <Portal>
    <Modalize
      onClose={() => {
        setList(props.data);
        if(props.onClose){
          props.onClose();
        }
      }}
      modalStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flex: 1,
      }}
      handlePosition={"inside"}
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
                  >
                    {t("reset")}
                  </Button>
                }
              </View>
              {props.search &&
                <View style={{ marginTop: 8 }}>
                  <TextField
                    shape={"rounded"}
                    onInvokeTextChanged={(text) => {
                      if (text.length > 0) {
                        setList(props?.data?.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
                      } else {
                        setList(props.data);
                      }
                    }}
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
              size={"lg"}
              onPress={() => {
                if (props.onSave) {
                  const obj = props.data?.find(it => it.id == selected);
                  props.onSave(obj);
                }
              }}
              style={{
                width: "100%",
              }}
              shape={"rounded"}
            >{t("save")}</Button>
          </View>
        </Animated.View>
      }
      disableScrollIfPossible
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
