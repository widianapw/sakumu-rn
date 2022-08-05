import React, { useEffect, useRef, useState } from "react";
import { Page, useTheme } from "../../../tmd";
import { Image, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import polyline from "@mapbox/polyline";

export default function MapTrackingScreen() {
  const mapRef = useRef<MapView>(null);
  const [markerPos, setMarkerPos] = useState<Geolocation.GeoCoordinates | null>(null);
  const [cameraHeading, setCameraHeading] = useState(0);
  const {colors} = useTheme()
  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      console.log(JSON.stringify(position, null, 2));
      handleCameraChanges(position.coords.latitude, position.coords.longitude);
      setMarkerPos(position.coords);
    });
    const watchId = Geolocation.watchPosition((position) => {
        console.log(JSON.stringify(position, null, 2));
        // handleCameraChanges(position.coords.latitude, position.coords.longitude);
        setMarkerPos(position.coords);
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 1 },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const handleCameraChanges = (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 18,
    }, { duration: 500 });
  };

  const updateCameraHeading = () => {
    mapRef?.current?.getCamera().then((camera) => {
      console.log(camera);
      setCameraHeading(camera.heading);
    });
  };
  const decodedPolylineArrs = polyline.decode("hs~s@e|j~T^Eh@CT@n@BN?BfFJpCBpCuCEqCL_FDgAFaG@wEDCkBAMwA@A?_BAiBEgBBmB@gADc@?sC?A^InFOlECdAsGIkGEIAMCC?ICCBo@@cDBoA?yA@}E@@QJyDLoJb@CDMBE`A?rC@");
  const decodedPolyline = decodedPolylineArrs.map((arr) => {
    return {
      latitude: arr[0],
      longitude: arr[1],
    };
  })
  // const decodedPolyline = [
  //   {
  //     "latitude": -8.65222,
  //     "longitude": 115.24790
  //   },
  //   {
  //     "latitude": -8.65224,
  //     "longitude": 115.24790
  //   },
  //   {
  //     "latitude": -8.65226,
  //     "longitude": 115.24788
  //   },
  //   {
  //     "latitude": -8.65227,
  //     "longitude": 115.24784
  //   },
  //   {
  //     "latitude": -8.65232,
  //     "longitude": 115.24768
  //   },
  //   {
  //     "latitude": -8.65234,
  //     "longitude": 115.24761
  //   },
  //   {
  //     "latitude": -8.65235,
  //     "longitude": 115.24746
  //   },
  //   {
  //     "latitude": -8.65236,
  //     "longitude": 115.24737
  //   },
  //   {
  //     "latitude": -8.65238,
  //     "longitude": 115.24709
  //   },
  //   {
  //     "latitude": -8.65246,
  //     "longitude": 115.24658
  //   },
  //   {
  //     "latitude": -8.65264,
  //     "longitude": 115.24666
  //   },
  //   {
  //     "latitude": -8.65325,
  //     "longitude": 115.24704
  //   },
  //   {
  //     "latitude": -8.65354,
  //     "longitude": 115.24722
  //   },
  //   {
  //     "latitude": -8.65380,
  //     "longitude": 115.24738
  //   },
  //   {
  //     "latitude": -8.65386,
  //     "longitude": 115.24742
  //   },
  //   {
  //     "latitude": -8.65386,
  //     "longitude": 115.24743
  //   },
  //   {
  //     "latitude": -8.65386,
  //     "longitude": 115.24746
  //   },
  //   {
  //     "latitude": -8.65406,
  //     "longitude": 115.24813
  //   },
  //   {
  //     "latitude": -8.65413,
  //     "longitude": 115.24827
  //   },
  //   {
  //     "latitude": -8.65421,
  //     "longitude": 115.24838
  //   },
  //   {
  //     "latitude": -8.65436,
  //     "longitude": 115.24855
  //   },
  //   {
  //     "latitude": -8.65464,
  //     "longitude": 115.24874
  //   },
  //   {
  //     "latitude": -8.65482,
  //     "longitude": 115.24885
  //   },
  //   {
  //     "latitude": -8.65515,
  //     "longitude": 115.24896
  //   },
  //   {
  //     "latitude": -8.65545,
  //     "longitude": 115.24904
  //   },
  //   {
  //     "latitude": -8.65616,
  //     "longitude": 115.24920
  //   },
  //   {
  //     "latitude": -8.65626,
  //     "longitude": 115.24921
  //   },
  //   {
  //     "latitude": -8.65631,
  //     "longitude": 115.24922
  //   },
  //   {
  //     "latitude": -8.65637,
  //     "longitude": 115.24921
  //   },
  //   {
  //     "latitude": -8.65660,
  //     "longitude": 115.24920
  //   },
  //   {
  //     "latitude": -8.65723,
  //     "longitude": 115.24914
  //   },
  //   {
  //     "latitude": -8.65739,
  //     "longitude": 115.24912
  //   },
  //   {
  //     "latitude": -8.65746,
  //     "longitude": 115.24912
  //   },
  //   {
  //     "latitude": -8.65764,
  //     "longitude": 115.24908
  //   },
  //   {
  //     "latitude": -8.65779,
  //     "longitude": 115.24907
  //   },
  //   {
  //     "latitude": -8.65791,
  //     "longitude": 115.24907
  //   },
  //   {
  //     "latitude": -8.65809,
  //     "longitude": 115.24907
  //   },
  //   {
  //     "latitude": -8.65875,
  //     "longitude": 115.24911
  //   },
  //   {
  //     "latitude": -8.65902,
  //     "longitude": 115.24916
  //   },
  //   {
  //     "latitude": -8.66012,
  //     "longitude": 115.24937
  //   },
  //   {
  //     "latitude": -8.66109,
  //     "longitude": 115.24954
  //   },
  //   {
  //     "latitude": -8.66156,
  //     "longitude": 115.24962
  //   },
  //   {
  //     "latitude": -8.66197,
  //     "longitude": 115.24970
  //   },
  //   {
  //     "latitude": -8.66219,
  //     "longitude": 115.24976
  //   },
  //   {
  //     "latitude": -8.66321,
  //     "longitude": 115.25013
  //   },
  //   {
  //     "latitude": -8.66348,
  //     "longitude": 115.25022
  //   },
  //   {
  //     "latitude": -8.66354,
  //     "longitude": 115.25025
  //   },
  //   {
  //     "latitude": -8.66376,
  //     "longitude": 115.25028
  //   },
  //   {
  //     "latitude": -8.66427,
  //     "longitude": 115.25027
  //   },
  //   {
  //     "latitude": -8.66473,
  //     "longitude": 115.25036
  //   },
  //   {
  //     "latitude": -8.66568,
  //     "longitude": 115.25061
  //   },
  //   {
  //     "latitude": -8.66588,
  //     "longitude": 115.25067
  //   },
  //   {
  //     "latitude": -8.66622,
  //     "longitude": 115.25073
  //   },
  //   {
  //     "latitude": -8.66703,
  //     "longitude": 115.25081
  //   },
  //   {
  //     "latitude": -8.66728,
  //     "longitude": 115.25084
  //   },
  //   {
  //     "latitude": -8.66811,
  //     "longitude": 115.25092
  //   },
  //   {
  //     "latitude": -8.66832,
  //     "longitude": 115.25094
  //   },
  //   {
  //     "latitude": -8.66864,
  //     "longitude": 115.25107
  //   },
  //   {
  //     "latitude": -8.66900,
  //     "longitude": 115.25114
  //   },
  //   {
  //     "latitude": -8.66924,
  //     "longitude": 115.25117
  //   },
  //   {
  //     "latitude": -8.66943,
  //     "longitude": 115.25121
  //   },
  //   {
  //     "latitude": -8.66955,
  //     "longitude": 115.25124
  //   },
  //   {
  //     "latitude": -8.66993,
  //     "longitude": 115.25129
  //   },
  //   {
  //     "latitude": -8.67002,
  //     "longitude": 115.25131
  //   },
  //   {
  //     "latitude": -8.67026,
  //     "longitude": 115.25135
  //   },
  //   {
  //     "latitude": -8.67061,
  //     "longitude": 115.25142
  //   },
  //   {
  //     "latitude": -8.67167,
  //     "longitude": 115.25157
  //   },
  //   {
  //     "latitude": -8.67225,
  //     "longitude": 115.25167
  //   },
  //   {
  //     "latitude": -8.67256,
  //     "longitude": 115.25174
  //   },
  //   {
  //     "latitude": -8.67345,
  //     "longitude": 115.25195
  //   },
  //   {
  //     "latitude": -8.67411,
  //     "longitude": 115.25211
  //   },
  //   {
  //     "latitude": -8.67406,
  //     "longitude": 115.25182
  //   },
  //   {
  //     "latitude": -8.67400,
  //     "longitude": 115.25136
  //   },
  //   {
  //     "latitude": -8.67396,
  //     "longitude": 115.25112
  //   },
  //   {
  //     "latitude": -8.67382,
  //     "longitude": 115.25019
  //   },
  //   {
  //     "latitude": -8.67381,
  //     "longitude": 115.25010
  //   },
  //   {
  //     "latitude": -8.67376,
  //     "longitude": 115.24965
  //   },
  //   {
  //     "latitude": -8.67371,
  //     "longitude": 115.24907
  //   },
  //   {
  //     "latitude": -8.67371,
  //     "longitude": 115.24900
  //   },
  //   {
  //     "latitude": -8.67370,
  //     "longitude": 115.24860
  //   },
  //   {
  //     "latitude": -8.67368,
  //     "longitude": 115.24669
  //   },
  //   {
  //     "latitude": -8.67368,
  //     "longitude": 115.24661
  //   },
  //   {
  //     "latitude": -8.67368,
  //     "longitude": 115.24658
  //   },
  //   {
  //     "latitude": -8.67368,
  //     "longitude": 115.24656
  //   },
  //   {
  //     "latitude": -8.67366,
  //     "longitude": 115.24579
  //   },
  //   {
  //     "latitude": -8.67365,
  //     "longitude": 115.24564
  //   },
  //   {
  //     "latitude": -8.67364,
  //     "longitude": 115.24551
  //   },
  //   {
  //     "latitude": -8.67364,
  //     "longitude": 115.24509
  //   },
  //   {
  //     "latitude": -8.67364,
  //     "longitude": 115.24495
  //   },
  //   {
  //     "latitude": -8.67364,
  //     "longitude": 115.24490
  //   },
  //   {
  //     "latitude": -8.67364,
  //     "longitude": 115.24485
  //   },
  //   {
  //     "latitude": -8.67362,
  //     "longitude": 115.24481
  //   },
  //   {
  //     "latitude": -8.67360,
  //     "longitude": 115.24478
  //   },
  //   {
  //     "latitude": -8.67362,
  //     "longitude": 115.24470
  //   },
  //   {
  //     "latitude": -8.67363,
  //     "longitude": 115.24465
  //   },
  //   {
  //     "latitude": -8.67363,
  //     "longitude": 115.24428
  //   },
  //   {
  //     "latitude": -8.67360,
  //     "longitude": 115.24350
  //   },
  //   {
  //     "latitude": -8.67359,
  //     "longitude": 115.24317
  //   },
  //   {
  //     "latitude": -8.67353,
  //     "longitude": 115.24174
  //   },
  //   {
  //     "latitude": -8.67429,
  //     "longitude": 115.24171
  //   },
  //   {
  //     "latitude": -8.67438,
  //     "longitude": 115.24173
  //   },
  //   {
  //     "latitude": -8.67480,
  //     "longitude": 115.24178
  //   },
  //   {
  //     "latitude": -8.67494,
  //     "longitude": 115.24178
  //   },
  //   {
  //     "latitude": -8.67496,
  //     "longitude": 115.24178
  //   },
  //   {
  //     "latitude": -8.67512,
  //     "longitude": 115.24182
  //   },
  //   {
  //     "latitude": -8.67529,
  //     "longitude": 115.24185
  //   },
  //   {
  //     "latitude": -8.67546,
  //     "longitude": 115.24188
  //   },
  //   {
  //     "latitude": -8.67568,
  //     "longitude": 115.24191
  //   },
  //   {
  //     "latitude": -8.67620,
  //     "longitude": 115.24216
  //   },
  //   {
  //     "latitude": -8.67662,
  //     "longitude": 115.24232
  //   },
  //   {
  //     "latitude": -8.67674,
  //     "longitude": 115.24237
  //   },
  //   {
  //     "latitude": -8.67690,
  //     "longitude": 115.24239
  //   },
  //   {
  //     "latitude": -8.67711,
  //     "longitude": 115.24241
  //   },
  //   {
  //     "latitude": -8.67705,
  //     "longitude": 115.24094
  //   },
  //   {
  //     "latitude": -8.67707,
  //     "longitude": 115.24088
  //   },
  //   {
  //     "latitude": -8.67706,
  //     "longitude": 115.24082
  //   },
  //   {
  //     "latitude": -8.67757,
  //     "longitude": 115.24073
  //   },
  //   {
  //     "latitude": -8.67767,
  //     "longitude": 115.24072
  //   },
  //   {
  //     "latitude": -8.67790,
  //     "longitude": 115.24069
  //   },
  //   {
  //     "latitude": -8.67805,
  //     "longitude": 115.24065
  //   },
  //   {
  //     "latitude": -8.67838,
  //     "longitude": 115.24056
  //   },
  //   {
  //     "latitude": -8.67880,
  //     "longitude": 115.24045
  //   },
  //   {
  //     "latitude": -8.67911,
  //     "longitude": 115.24039
  //   },
  //   {
  //     "latitude": -8.67920,
  //     "longitude": 115.24037
  //   },
  //   {
  //     "latitude": -8.67923,
  //     "longitude": 115.24037
  //   },
  //   {
  //     "latitude": -8.67937,
  //     "longitude": 115.24036
  //   },
  //   {
  //     "latitude": -8.67967,
  //     "longitude": 115.24036
  //   },
  //   {
  //     "latitude": -8.67979,
  //     "longitude": 115.24036
  //   },
  //   {
  //     "latitude": -8.67994,
  //     "longitude": 115.24037
  //   },
  //   {
  //     "latitude": -8.68011,
  //     "longitude": 115.24036
  //   },
  //   {
  //     "latitude": -8.68036,
  //     "longitude": 115.24036
  //   },
  //   {
  //     "latitude": -8.68057,
  //     "longitude": 115.24037
  //   },
  //   {
  //     "latitude": -8.68088,
  //     "longitude": 115.24038
  //   },
  //   {
  //     "latitude": -8.68120,
  //     "longitude": 115.24038
  //   },
  //   {
  //     "latitude": -8.68125,
  //     "longitude": 115.24039
  //   },
  //   {
  //     "latitude": -8.68151,
  //     "longitude": 115.24043
  //   },
  //   {
  //     "latitude": -8.68166,
  //     "longitude": 115.24045
  //   }
  // ]
  console.log(decodedPolyline);
  return (
    <Page>
      <View style={{
        flex: 1,
      }}>
        <MapView
          followsUserLocation={true}
          ref={mapRef}
          onTouchEnd={() => {
            updateCameraHeading();
          }}
          onTouchCancel={() => {
            updateCameraHeading();
          }}
          onTouchStart={() => {
            updateCameraHeading();
          }}
          onTouchMove={() => {
            updateCameraHeading();
          }}
          showsUserLocation={true}
          style={{
            flex: 1,
          }}>
          {
            decodedPolyline &&
            <Polyline
              coordinates={decodedPolyline} strokeWidth={3} strokeColor={colors.primary.main}
            />
          }
          {
            markerPos && (
              <Marker
                flat
                anchor={{
                  x: 0.5,
                  y: 0.5,
                }}
                coordinate={{
                  latitude: markerPos?.latitude,
                  longitude: markerPos?.longitude,
                }}>
                <View
                  style={{
                    // transform: [{ rotate: "45deg" }],
                    transform: [{ rotate: `${(markerPos?.heading ?? 0 - cameraHeading) - 180}deg` }],
                  }}
                >
                  <Image
                    source={require("../../assets/icons/ic_driver/ic_driver.png")} />
                </View>
              </Marker>
            )
          }

        </MapView>
      </View>
    </Page>
  );
}
