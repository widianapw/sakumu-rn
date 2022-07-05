/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import { Button, HelperText, Icon, IconButton, useTheme } from "../../index";
import { Dimensions, ImageBackground, Modal, View, ViewStyle } from "react-native";
import { useLocale } from "../../../src/providers/LocaleProvider";
import { usePermission } from "../../providers/PermissionProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";
import color from "color";
import Portal from "../Portal/Portal";
import ImageViewer from "react-native-image-zoom-viewer";
import ImagePickerBottomSheet, { ImagePickerBSProps } from "../BottomSheet/ImagePickerBottomSheet";
import LabelInput from "../TextInput/Label/LabelInput";
import Typography from "../Typography/Typography";

interface Props {
  label?: string;
  requiredLabel?: boolean;
  description?: string;
  buttonProps?: ComponentProps<typeof Button>;
  buttonTitle?: string;
  pickerTitle?: string;
  editable?: boolean;
  initialImageUrls?: string[];
  error?: boolean;
  errorText?: string;
  style?: ViewStyle;
  onChangeSelectedUrls?: (selectedUrls: string[]) => void;
}

export default function MultiImagePicker({
                                           initialImageUrls,
                                           buttonProps,
                                           description,
                                           buttonTitle,
                                           pickerTitle,
                                           editable = true,
                                           error,
                                           errorText,
                                           style,
                                           ...rest
                                         }: Props & ImagePickerBSProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowViewer, setIsShowViewer] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const { colors, roundness } = useTheme();
  const { t } = useLocale();
  const { requestPermissions } = usePermission();
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const handleOpenImagePicker = () => {
    requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS], () => {
      setIsOpen(true);
    });
  };
  const colNum = 3;

  const [viewWidth, setViewWidth] = useState(0);
  const imageSize = Dimensions.get("window").width / colNum - 8;
  const handleOpenViewer = (index: number) => {
    setViewerIndex(index);
    setIsShowViewer(true);
  };

  useEffect(() => {
    if (initialImageUrls) {
      setSelectedImageUrls(initialImageUrls);
    }
  }, [initialImageUrls]);

  useEffect(() => {
    if (rest.onChangeSelectedUrls) {
      rest.onChangeSelectedUrls(selectedImageUrls);
    }
  }, [selectedImageUrls]);


  const ImagePlaceHolderIcon = () => {
    const size = 50;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: colors.primary.border,
      }}>
        <Icon icon={"image"} color={colors.primary.main} size={size / 2 + 10} />
      </View>
    );
  };

  const ImageViewerButton = ({ index }: any) => {
    const size = 50;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: color(colors.primary.focus).alpha(0.2).rgb().string(),
      }}>
        <IconButton
          onPress={() => {
            handleOpenViewer(index);
          }}
          size={size / colNum}
          variant={"tertiary"}
          icon={"search"} />
      </View>
    );
  };

  const deleteImage = (index: number) => {
    const newImageUrls = [...selectedImageUrls];
    newImageUrls.splice(index, 1);
    setSelectedImageUrls(newImageUrls);
  };

  const addImage = (imageUrl: string) => {
    const newImageUrls = [...selectedImageUrls];
    newImageUrls.push(imageUrl);
    setSelectedImageUrls(newImageUrls);
  };

  return (
    <>
      <Portal>
        <Modal
          onRequestClose={() => {
            setIsShowViewer(false);
          }}
          visible={isShowViewer} animationType={"fade"}>
          <ImageViewer
            index={viewerIndex}
            show={isShowViewer}
            imageUrls={
              selectedImageUrls.map(it => {
                return {
                  url: it,
                };
              })} />
        </Modal>
      </Portal>
      <ImagePickerBottomSheet
        camera={rest.camera}
        gallery={rest.gallery}
        ratio={rest.ratio}
        crop={rest.crop}
        open={isOpen}
        onChangeImage={(image) => {
          if (rest.onChangeImage) {
            rest.onChangeImage(image);
          }
          addImage(image?.path);
          setIsOpen(false);
          // setSelectedImageUrls(image.path);
        }}
        onClose={() => {
          setIsOpen(false);
        }} />

      <View style={[style]}>
        {
          rest.label &&
          <View>
            <LabelInput
              style={{
                marginBottom: 8,
              }}
              label={rest?.label}
              required={rest?.requiredLabel} />
          </View>
        }

        {
          !selectedImageUrls.length
            ? <View style={{
              marginVertical: 4,
              marginHorizontal: 4,
              alignItems: "center",
              justifyContent: "center",
              height: imageSize,
              width: imageSize,
              borderRadius: roundness,
              backgroundColor: colors.primary.surface,
              position: "relative",
            }}>
              {
                <ImagePlaceHolderIcon />
              }
            </View>
            : <>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  flex: 1,
                }}
                onLayout={(event) => {
                  setViewWidth(
                    event.nativeEvent.layout.width,
                  );
                }}
              >

                {
                  selectedImageUrls.map((item, index) => {
                    const size = viewWidth ? (viewWidth / 3) : imageSize;
                    return <>
                      <View
                        key={index}
                        style={{
                          padding: 4,
                          height: size,
                          width: size,
                          // flex: 0.34,
                        }}>
                        <View style={{
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: roundness,
                          backgroundColor: colors.primary.surface,
                          position: "relative",
                        }}
                        >
                          <ImageBackground
                            key={index}
                            borderRadius={roundness}
                            style={{
                              width: "100%",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                            }}
                            source={{
                              uri: item,
                            }}
                          >
                            <ImageViewerButton index={index} />
                            <View
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                margin: 4,
                              }}
                            >
                              <IconButton
                                style={{
                                  backgroundColor: colors.danger.main,
                                }}
                                onPress={() => {
                                  deleteImage(index);
                                }}
                                icon={"close"}
                                themeSize={"sm"}
                              />
                            </View>
                          </ImageBackground>
                        </View>
                      </View>
                    </>
                      ;
                  })
                }
              </View>
            </>
        }

        <View style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}>
          {(description || errorText) &&
            <View style={{
              marginTop: 8,
            }}>
              {
                (error && errorText) &&
                <HelperText
                  type={"error"}>{errorText}</HelperText>
              }
              {
                description &&
                <Typography
                  type={"body3"}
                >
                  {description}
                </Typography>
              }
            </View>
          }
          {
            editable &&
            <Button
              size={buttonProps?.size ?? "sm"}
              containerStyle={{
                marginTop: 8,
              }}
              variant={buttonProps?.variant ?? "secondary"}
              onPress={handleOpenImagePicker}
              {...buttonProps}
            >
              {
                buttonTitle ??
                t("pick_image")
              }
            </Button>
          }
        </View>
      </View>
    </>
  );

}
