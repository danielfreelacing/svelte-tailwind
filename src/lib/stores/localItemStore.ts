import type { ItemType, ExtrasType, OptionType, OptionsSetType } from '$lib/components/items/types';
import { writable } from 'svelte/store';

const optionSet: OptionsSetType[] = [{
    id: 1,
    name: 'toppings',
    active: true,
    optionList: [
        { id: 1, name: 'sauce', price: 0.99, active: true },
        { id: 2, name: 'extra cheese', price: 1.25, active: true }
    ]
}];


export const localInitItem: ItemType = {
    id: 0,
    name: '',
    options: [],
    price: undefined,
    extras: [],
    isAvailable: true,
    description: '',
    weight: undefined,
    weightUnit: 'Gram',
    cookingTime: 15,
    cookingTimeUnit: 'Minute',
    tags: []
};



// function createLocalItem() {
//     const { subscribe, set, update } = writable<ItemType>(localItem);
//     return {
//         subscribe,
      
//     }
// }

// const localItemStore = createLocalItem();

const localItemStore = writable<ItemType>(localInitItem);

export default localItemStore;