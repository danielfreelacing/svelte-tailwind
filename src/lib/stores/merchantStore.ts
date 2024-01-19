
import { writable } from 'svelte/store';
import { addressInit, merchantTypeInit, placeInit, type AddressType, type MerchantTypeType, type PlaceType} from './types';


export type MerchantType = {
    id: string | undefined
    name: string
    description: string
    logoUrl: string
    address: AddressType
    merchantType: MerchantTypeType
    placeList: PlaceType[]
}

const merchantInit = {
    id: undefined,
    name: '',
    description: '',
    logoUrl: '',
    address: addressInit,
    merchantType: merchantTypeInit,
    placeList: [placeInit]
}


const merchantStore = writable<MerchantType>(merchantInit);

export default merchantStore;