import {GeocoderMapResponse} from "../models/utils/GeocoderResponse";

interface LocationFromLatLngRequest  {
    lat: number,
    lng: number
    apiKey: string
}

interface GeocoderResponse extends GeocoderMapResponse{
    encoded: {
        location: {
            lat: number,
            lng: number
        },
        streetName: string,
        streetNumber: string,
        ruralDistrict: string,
        district: string,
        city: string,
        state: string,
        country: string,
        postalCode: string,
        formattedAddress: string
    }
}

const Geocoder = {
    getLocationFromLatLng :(req: LocationFromLatLngRequest) => {
        return  new Promise<GeocoderResponse>(async (resolve, reject) => {
            try {
                const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.lat},${req.lng}&key=${req.apiKey}`)
                const resJson =  await res.json()
                const firstResult = resJson.results[0];
                const streetName = firstResult.address_components.find((item) => item.types.includes("route"));
                const streetNumber = firstResult.address_components.find((item) => item.types.includes("street_number"));
                const district = firstResult.address_components.find((item) => item.types.includes("administrative_area_level_3"));
                const city = firstResult.address_components.find((item) => item.types.includes("administrative_area_level_2"));
                const state = firstResult.address_components.find((item) => item.types.includes("administrative_area_level_1"));
                const country = firstResult.address_components.find((item) => item.types.includes("country"));
                const postalCode = firstResult.address_components.find((item) => item.types.includes("postal_code"));
                const ruralDistrict = firstResult.address_components.find((item) => item.types.includes("administrative_area_level_4"));
                const response : GeocoderResponse = {
                    ...resJson,
                    encoded: {
                        location: firstResult.geometry.location,
                        streetName: streetName?.long_name || "",
                        ruralDistrict: ruralDistrict?.long_name || "",
                        district: district?.long_name || "",
                        city: city?.long_name || "",
                        state: state?.long_name || "",
                        country: country?.long_name || "",
                        postalCode: postalCode?.long_name || "",
                        formattedAddress: firstResult.formatted_address,
                        streetNumber: streetNumber?.long_name || ""
                    }
                }
                resolve(response)
            }catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }
}

export default Geocoder
