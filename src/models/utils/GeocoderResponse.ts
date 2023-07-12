export interface GeocoderMapResponse {
    plus_code: PlusCode
    results: Result[]
    status: string
}

 interface PlusCode {
    compound_code: string
    global_code: string
}

 interface Result {
    address_components: AddressComponent[]
    formatted_address: string
    geometry: Geometry
    place_id: string
    plus_code?: PlusCode2
    types: string[]
}

 interface AddressComponent {
    long_name: string
    short_name: string
    types: string[]
}

 interface Geometry {
    location: Location
    location_type: string
    viewport: Viewport
    bounds?: Bounds
}

 interface Location {
    lat: number
    lng: number
}

 interface Viewport {
    northeast: Northeast
    southwest: Southwest
}

 interface Northeast {
    lat: number
    lng: number
}

 interface Southwest {
    lat: number
    lng: number
}

 interface Bounds {
    northeast: Northeast2
    southwest: Southwest2
}

 interface Northeast2 {
    lat: number
    lng: number
}

 interface Southwest2 {
    lat: number
    lng: number
}

 interface PlusCode2 {
    compound_code: string
    global_code: string
}
