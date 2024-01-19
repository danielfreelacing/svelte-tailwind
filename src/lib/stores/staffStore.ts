import type {SelectItemType} from '$lib/types/common';
import type {StaffType} from '$lib/types/staff';
import {writable} from 'svelte/store';

const INIT_STAFF_ARR: StaffType[] = []

const createStaffArr = () => {
    const {subscribe, set, update} = writable<StaffType[]>(INIT_STAFF_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: StaffType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: StaffType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

const INIT_STAFF_ROLE_ARR: SelectItemType[] = [
    {label: 'Admin', value: 'Admin'},
    {label: 'Manager', value: 'Manager'},
    {label: 'Serving Staff', value: 'ServingStaff'},
]

const createStaffRoleArr = () => {
    const {subscribe, set, update} = writable<SelectItemType[]>(INIT_STAFF_ROLE_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: SelectItemType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: SelectItemType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

const INIT_STAFF_PAY_TYPE_ARR: SelectItemType[] = [
    {label: 'Hourly', value: 'Hourly'},
    {label: 'Daily', value: 'Daily'},
    {label: 'Monthly', value: 'Monthly'},
]

const createStaffPayTypeArr = () => {
    const {subscribe, set, update} = writable<SelectItemType[]>(INIT_STAFF_PAY_TYPE_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: SelectItemType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: SelectItemType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

const INIT_STAFF_TABLE_ARR: SelectItemType[] = [
    {label: 'Table 1', value: 'Table 1'},
    {label: 'Table 2', value: 'Table 2'},
    {label: 'Table 3', value: 'Table 3'},
]

const createStaffTableArr = () => {
    const {subscribe, set, update} = writable<SelectItemType[]>(INIT_STAFF_TABLE_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: SelectItemType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: SelectItemType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

const INIT_ESTABLISHMENT_ARR: SelectItemType[] = []

const createEstablishmentArr = () => {
    const {subscribe, set, update} = writable<SelectItemType[]>(INIT_ESTABLISHMENT_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: SelectItemType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: SelectItemType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

const INIT_STAFF_STATUS_ARR: SelectItemType[] = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
]

const createStaffStatusArr = () => {
    const {subscribe, set, update} = writable<SelectItemType[]>(INIT_STAFF_STATUS_ARR);

    return {
        subscribe,
        set,
        addValue: (newValue: SelectItemType) => update(state => state.concat(newValue)),
        setValue: (index: number, newValue: SelectItemType) => update(state => {
            state[index] = newValue
            return state
        }),
        removeValue: (index: number) => update(state => {
            state.splice(index, 1)
            return state
        }),
    }
}

export const staffArr = createStaffArr()
export const showStaffModal = writable<boolean>(false);
export const selStaffIndex = writable<number>(-1);
export const staffRoleArr = createStaffRoleArr()
export const staffPayTypeArr = createStaffPayTypeArr()
export const staffTableArr = createStaffTableArr()
export const establishmentArr = createEstablishmentArr()
export const staffStatusArr = createStaffStatusArr()
export const showStaffRightBar = writable<boolean>(false);
