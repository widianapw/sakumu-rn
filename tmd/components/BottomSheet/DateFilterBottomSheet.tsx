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
import moment from "moment";
import TmdConstants from "../../utils/TmdConstants";
import { useTranslation } from "react-i18next";

/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */

type DateRange = {
  start_date?: string;
  end_date?: string;
}

export type DateFilterPayload = {
  id: number;
  date_range?: DateRange;
}

interface Props {
  open: boolean;
  initial?: DateFilterPayload | undefined;
  onClose: () => void;
  onSave?: (data: DateFilterPayload) => void;
  onReset?: () => void;
  title?: string;
}

export default function DateFilterBottomSheet({ open, initial, onClose, ...props }: Props) {
  const modalizeRef = useRef<Modalize>(null);
  const [selectedItem, setSelectedItem] = useState<DateFilterPayload>();
  const [selectedId, setSelectedId] = useState<number | null | undefined>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    start_date: moment().format(TmdConstants.DATE_FORMAT_SEND_API),
    end_date: moment().format(TmdConstants.DATE_FORMAT_SEND_API),
  });
  const { t } = useTranslation();
  const list = _dateFilters;
  useEffect(() => {
    if (open) {
      modalizeRef.current?.open();
    } else {
      modalizeRef?.current?.close();
    }
  }, [open]);

  useEffect(() => {
    console.log(initial);
    setSelectedId(initial?.id);
    setDateRange(initial?.date_range);
  }, [initial]);


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
          text={t(item?.name)}
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

  const getValue = (): DateFilterPayload => {
    let returnedValue: DateFilterPayload;
    switch (selectedId) {
      case 1 : {
        const currDate = moment();
        const start = currDate.format(TmdConstants.DATE_FORMAT_SEND_API);
        const end = currDate.subtract(1, "months").format(TmdConstants.DATE_FORMAT_SEND_API);
        returnedValue = {
          id: selectedId,
          date_range: {
            start_date: start,
            end_date: end,
          },
        };
        break;
      }
      case 2: {
        const currDate = moment();
        const start = currDate.format(TmdConstants.DATE_FORMAT_SEND_API);
        const end = currDate.subtract(2, "months").format(TmdConstants.DATE_FORMAT_SEND_API);
        returnedValue = {
          id: selectedId,
          date_range: {
            start_date: start,
            end_date: end,
          },
        };
        break;
      }
      case 3: {
        const currDate = moment();
        const start = currDate.format(TmdConstants.DATE_FORMAT_SEND_API);
        const end = currDate.subtract(3, "months").format(TmdConstants.DATE_FORMAT_SEND_API);
        returnedValue = {
          id: selectedId,
          date_range: {
            start_date: start,
            end_date: end,
          },
        };
        break;
      }
      default: {
        console.log(dateRange);
        returnedValue = {
          id: selectedId ?? 4,
          date_range: dateRange,
        };
        break;
      }
    }
    return returnedValue;
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
              <Typography type={"title2"}>{props.title ?? t("choose_date")}</Typography>
              {
                props.onReset &&
                <Button
                  size={"sm"}
                  shape={"rounded"}
                  variant={"secondary"}
                  onPress={props?.onReset}
                >{t("reset")}</Button>
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

              <HStack spacing={8} mt={16}>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    date={dateRange?.start_date}
                    onDateChangesFormatted={(date) => {
                      setDateRange({ ...dateRange, start_date: date });
                    }}
                    disabled={selectedId != 4}
                    label={t("start_date")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DatePicker
                    date={dateRange?.end_date}
                    onDateChangesFormatted={(date) => {
                      console.log(date);
                      setDateRange({ ...dateRange, end_date: date });
                    }}
                    disabled={selectedId != 4}
                    label={t("end_date")}
                  />
                </View>
              </HStack>

            <VStack mt={24}>
              <Button
                onPress={() => {
                  if (props.onSave) {
                    const value = getValue();
                    setSelectedItem(value);
                    props.onSave(value);
                  }
                }}
                style={{
                  width: "100%",
                }}
              >{t("apply_filter")}</Button>
            </VStack>
          </View>
        </Modalize>
      </Portal>
    </>
  )
    ;
};
