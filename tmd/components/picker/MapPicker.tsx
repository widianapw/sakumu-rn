/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef, useState } from "react";
import TextField from "../TextInput/TextField";
import Icon from "../Icon";
import { Image, Modal, SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { Button, useTheme } from "../../index";
import IconButton from "../IconButton";
import MapView from "react-native-maps";
import { HStack, VStack } from "react-native-flex-layout";
import Geocoder, { GeocodingObject } from "@timwangdev/react-native-geocoder";
import RNGooglePlaces from "react-native-google-places";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import Config from "react-native-config";

interface SelectedMap {
  fullAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  nameAddress?: string;
}

interface Props {
  onSelected?: (selected: SelectedMap) => void;
  initial?: SelectedMap;
}

export default function MapPicker({ onSelected, initial, ...rest }: React.ComponentProps<typeof TextField> & Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  const [addressObj, setAddressObj] = useState<GeocodingObject | null>(null);
  const [savedMap, setSavedMap] = useState<SelectedMap | null>(null);
  const [mapRegion, setMapRegion] = useState({});
  const mapRef = useRef<MapView>(null);
  const theme = useTheme();
  const handleOpen = () => {
    setIsModalOpen(true);
    // modalizeRef?.current?.open();
  };

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

  useEffect(() => {
    requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.IOS.LOCATION_ALWAYS])
      .then((statuses) => {
        if (statuses["android.permission.ACCESS_COARSE_LOCATION"] == "granted" && statuses["android.permission.ACCESS_FINE_LOCATION"] == "granted" && statuses["ios.permission.LOCATION_ALWAYS"] == "granted") {
          console.log("ALL GRANTED");
        }
      });
  }, []);

  useEffect(() => {
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
  }, [isModalOpen]);


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

  return (
    <>
      <TextField
        selection={{ start: 0 }}
        pickerType={"map"}
        editable={false}
        onOpenPicker={handleOpen}
        value={savedMap?.fullAddress}
        suffixIcon={
          <Icon icon={"map"} size={18} />
        }
        {...rest}
      />

      {/* pick location modal*/}
      <Modal
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        animationType="slide"
        transparent={false}
        visible={isModalOpen}
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
                  marginBottom: 52
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
              <VStack>

                <HStack justify={"between"} items={"center"}>
                  <Typography type={"title1"}>Select Location</Typography>
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    shape={"rounded"}
                    onPress={() => {
                      openSearchModal();
                    }}
                  >Search</Button>
                </HStack>

                <VStack style={{
                  marginTop: 16,
                }}>
                  <HStack items={"center"}>
                    <Icon icon={"location-sharp"} size={16} color={theme.colors.primary.main} />
                    <Typography
                      style={{ fontWeight: "600" }}
                      type={"title3"}>{addressObj?.feature ?? addressObj?.streetName ?? "-"}</Typography>
                  </HStack>
                  <Typography
                    type={"body2"}
                    style={{ marginTop: 4 }}
                  >{addressObj?.formattedAddress}</Typography>
                </VStack>

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
                      setSavedMap(dataToSend);
                      onSelected(dataToSend);
                      // console.log(dataToSend);
                      setIsModalOpen(false);
                    }
                  }}
                  style={{ marginTop: 16 }}
                  fullWidth size={"md"}>Save</Button>
              </VStack>

            </View>

            <View style={{ flex: 1 }}>
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
                    setIsModalOpen(false);
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
          </View>
        </SafeAreaView>

      </Modal>
    </>
  );
}
