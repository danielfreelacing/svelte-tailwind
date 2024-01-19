
import { writable } from 'svelte/store';

export const localInitAddress = {
    copyAddresOver: true,
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    country: "",
};

type localAddressStoreTypes = {
    copyAddresOver: boolean,
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    county: string,
    postcode: string,
    country: string,
}


// function createLocalItem() {
//     const { subscribe, set, update } = writable<ItemType>(localItem);
//     return {
//         subscribe,
      
//     }
// }

// const localItemStore = createLocalItem();

const localAddressStore = writable(localInitAddress);

export default localAddressStore;