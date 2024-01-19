
import { get, writable } from 'svelte/store';
import menuStore from './menustore';

export interface AppStateStoreI {
  menuIdSelected: string | undefined
  categoryIdSelected: string | undefined
  localItemBelongsToCategoryId: string | undefined
  client: object | undefined 
  activeEstablishmentIndex: number,
  placeId: string | undefined
}

const appStateStoreInit: AppStateStoreI = {
  menuIdSelected: undefined,
  categoryIdSelected: undefined,
  localItemBelongsToCategoryId: undefined,
  client: undefined,
  activeEstablishmentIndex: 0,
  placeId: undefined
}

function createAppStateStore() {
  const { subscribe, set, update } = writable<AppStateStoreI>(appStateStoreInit);

  return {
    subscribe,
    setMenuIdSelected: (id: string) => update(state => { return { ...state, menuIdSelected: id } }),
    setCategoryIdSelected: (id: string) => update(state => { return { ...state, categoryIdSelected: id } }),
    setLocalItemBelongsToCategoryId: (id: string) => update(state => { return { ...state, localItemBelongsToCategoryId: id } }),
    setActiveEstablishmentIndex: (index: number) => update(state => { return { ...state, activeEstablishmentIndex: index } }),
    setPlaceIdSelected: (id: string) => update(state => { return { ...state, placeId: id } }),
    // addMenu: (menu: MenuType) => update( state => state.concat(menu))
  };
}

const appStateStore = createAppStateStore();

export default appStateStore;