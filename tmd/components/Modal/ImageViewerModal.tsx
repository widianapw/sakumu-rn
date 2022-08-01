/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { Modal, SafeAreaView, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import color from "color";
import { white } from "../../styles/colors";
import { IconButton } from "../../index";
import Typography from "../Typography/Typography";

interface Props {
  images?: string[];
  index?: number;
  onClose: () => void;
  open: boolean;

}

export default function ImageViewerModal({ images, index = 0, onClose, open }: Props) {
  const getRenderIndicator = () => {
    if (images && images.length > 1) {
      return {};
    } else {
      return "";

    }
  };
  return (
    <>
      <Modal
        onRequestClose={onClose}
        visible={open} animationType={"fade"}>
        <SafeAreaView style={{ flex: 1 }}>
          <ImageViewer
            index={index}
            renderIndicator={(images && images?.length > 1) ?
              (currentIndex, allSize) => (
                  <View style={{
                    position:'absolute',
                    top:64,
                    alignSelf:'center'
                  }}>
                  <Typography
                    style={{ color: "white" }}>{currentIndex + "/" + allSize}</Typography>
                  </View>
              )
              : () => <></>}
            renderHeader={() => {
              return <View style={{
                backgroundColor: color(white).alpha(0.01).rgb().string(),
                paddingHorizontal: 8,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
              }}>
                <IconButton
                  color={"white"}
                  variant={"tertiary"}
                  shape={'rounded'}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  icon={"chevron-back"} onPress={() => {
                  onClose();
                }} />
                <Typography style={{ flexGrow: 1, marginLeft: 8, color: "white" }} type={"title2"}>Image
                  Preview</Typography>
              </View>;
            }}
            show={open}
            imageUrls={
              images?.map((image) => {
                return {
                  url: image,
                };
              })
            } />
        </SafeAreaView>
      </Modal>
    </>
  );
}
