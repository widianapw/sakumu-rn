/**
 * Created by Widiana Putra on 05/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef, useState } from "react";
import { Image, Modal, SafeAreaView, View } from "react-native";
import MapView from "react-native-maps";
import Typography from "../Typography/Typography";
import { Button, useTheme } from "../../index";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Geocoder, { GeocodingObject } from "@timwangdev/react-native-geocoder";
import Config from "react-native-config";
import RNGooglePlaces from "react-native-google-places";
import Geolocation from "react-native-geolocation-service";
import { SelectedMap } from "./MapPicker";
import { useLocale } from "../../../src/providers/LocaleProvider";
import Stack from "../Layout/Stack";

interface Props {
  open: boolean;
  initial?: SelectedMap;
  onSelected?: (selected: SelectedMap) => void;
  onClose?: () => void;
}

export default function MapPickerModal({ open, initial, onSelected, onClose, ...rest }: Props) {
  const {t} = useLocale()
  const [addressObj, setAddressObj] = useState<GeocodingObject | null>(null);
  const [mapRegion, setMapRegion] = useState({});
  const mapRef = useRef<MapView>(null);
  const theme = useTheme();

  const handleAddressChange = (lat: number, lng: number) => {
    Geocoder.geocodePositionGoogle({
      lat: lat,
      lng: lng,
    }, {
      apiKey: Config.GOOGLE_MAPS_API_KEY,
    }).then((res) => {
      const a = res[0];
      a.position = {
        lat: lat,
        lng: lng,
      };
      setAddressObj(a);
    });
  };

  const openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({
      useOverlay: true,
    })
      .then((place) => {
        handleCameraChanges(
          place.location?.latitude,
          place.location?.longitude,
        );
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  };

  const handleCameraChanges = (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 18,
    }, { duration: 500 });
  };
  // useEffect(() => {
  //   requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.IOS.LOCATION_ALWAYS])
  //     .then((statuses) => {
  //       if (statuses["android.permission.ACCESS_COARSE_LOCATION"] == "granted" && statuses["android.permission.ACCESS_FINE_LOCATION"] == "granted" && statuses["ios.permission.LOCATION_ALWAYS"] == "granted") {
  //         console.log("ALL GRANTED");
  //       }
  //     });
  // }, []);

  useEffect(() => {
    if (open) {
      if (initial?.location) {
        setAddressObj({
          formattedAddress: initial?.fullAddress,
          feature: initial?.nameAddress,
          position: initial?.location,
        });
        handleCameraChanges(initial?.location?.latitude, initial?.location?.longitude);
      } else {
        getUserCurrentLocation();
      }
    }
  }, [open]);


  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      setMapRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      handleCameraChanges(position.coords.latitude, position.coords.longitude);
      handleAddressChange(position.coords.latitude, position.coords.longitude);
    });
  };

  return (<Modal
      onRequestClose={() => {
        if (onClose) {
          onClose();
        }
      }}
      animationType="slide"
      transparent={false}
      visible={open}
    >
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{
          position: "relative",
          flexGrow: 1,
        }}>


          <View
            style={{
              position: "absolute",
              flex: 1,
              top: 0,
              bottom: 120,
              left: 0,
              right: 0,
            }}
          >

            <View style={{
              position: "relative",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
              <View style={{
                zIndex: 200,
                marginBottom: 52,
              }}>
                <Image
                  source={require("../../../src/assets/icons/ic_marker/ic_marker.png")} />
              </View>

              <MapView
                showsCompass={false}
                style={{
                  position: "absolute",
                  top: 0, bottom: 0, left: 0, right: 0,
                }}
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onRegionChangeComplete={(r, d) => {
                  // console.log(r)
                  handleAddressChange(r.latitude, r.longitude);
                }}
              >

              </MapView>
            </View>

          </View>

          <View style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            zIndex: 50,
            backgroundColor: "white",
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }}>
            <Stack>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Typography type={"title1"}>{t("select_location")}</Typography>
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  shape={"rounded"}
                  onPress={() => {
                    openSearchModal();
                  }}
                >{t("search")}</Button>
              </View>

              <Stack style={{
                marginTop: 16,
              }}>
                <Stack direction={"row"} spacing={2}
                       style={{
                         alignItems: "center",
                       }}>
                  <Icon icon={"location-sharp"} size={16} color={theme.colors.primary.main} />
                  <Typography
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{ fontWeight: "600" }}
                    type={"title3"}>{addressObj?.feature ?? addressObj?.streetName ?? "-"}</Typography>
                </Stack>
                <Typography
                  type={"body2"}
                  style={{ marginTop: 4 }}
                >{addressObj?.formattedAddress}</Typography>
              </Stack>

              <Button
                onPress={() => {
                  const dataToSend: SelectedMap = {
                    fullAddress: addressObj?.formattedAddress,
                    location: {
                      latitude: addressObj?.position?.lat,
                      longitude: addressObj?.position?.lng,
                    },
                    nameAddress: addressObj?.feature ?? addressObj?.streetName ?? "",
                  };
                  if (onSelected) {
                    onSelected(dataToSend);
                    // console.log(dataToSend);
                    if (onClose) {
                      onClose();
                    }
                  }
                }}
                style={{ marginTop: 16 }}
                fullWidth size={"md"}>{t("save")}</Button>
            </Stack>

          </View>


          <View
            style={{
              flexDirection: "row",
            }}>
            <IconButton
              themeSize={"lg"}
              variant={"tertiary"}
              color={theme.colors.neutral.neutral_80}
              style={{
                margin: 16,
                elevation: 8,
              }}
              onPress={() => {
                if (onClose) {
                  onClose();
                }
              }}
              icon={"arrow-back"}
            />
            <View style={{ flexGrow: 1 }} />
            <IconButton
              themeSize={"lg"}
              color={theme.colors.neutral.neutral_80}
              variant={"tertiary"}
              style={{
                elevation: 8,
                margin: 16,
              }}
              onPress={() => {
                getUserCurrentLocation();
              }}
              icon={"locate"}
            />

          </View>
        </View>
      </SafeAreaView>

    </Modal>
  );
}
