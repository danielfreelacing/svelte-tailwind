export type AddressType = {
    id: string
    addressLine1: string
    addressLine2: string
    city: string
    county: string
    postcode: string
    country: string
}

export type MerchantTypeType = {
    id: string
    name: string
}


export type PlaceTypeType = {
    id: string
    name: string
}

export const addressInit = {
    id: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    country: '',
}

export const merchantTypeInit = {
    id: '',
    name: ''
}



export const placeInit = {
    id: '',
    name: '',
    logoUrl: ''
}

export type PlaceType = {
    id: string
    name: string
    logoUrl: string
}