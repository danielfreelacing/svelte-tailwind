export type ItemType = {
    id: string
    name: string
    options: OptionsSetType[]
    price: number | undefined
    extrasIds: number[]
    active: boolean
    descriptions: string
    weight: number | undefined
    servingtime: number
    unit: string,
    tagItems: TagType[]
}

export type CategoryType = {
    id: string
    name: string
    items: ItemType[]
    extras: ExtrasType[]
    position: number
    active?: boolean
    menuId?: string
    placeId?: string
    isAvailable?: boolean
}
export type ExtrasType = {
    id: string
    name: string
    price: number
    isAvailable: boolean
}

export type OptionType = {
    id: string
    name: string
    price: number | null
    active?: boolean
}

export type OptionsSetType = {
    id: string
    name: string
    active?: boolean
    options: OptionType[]
}

export type MenuItemOption = {
    id: string
    name: string
    active?: boolean
    options: OptionType[]
}

export type MenuItemType = {
    id?: string
    name: string
    description: string
    price: number
    bannerUrl: string
    isAvailable: boolean
    cookingTime: number
    cookingTimeUnit: TimeUnit
    weight: number
    weightUnit: WeightUnit
    extras: ExtrasType[]
    optionSets: OptionsSetType[]
    tags?: TagType[]
    categories: CategoryType[]
    menuId?: string
    placeId?: string
}

export type MenuType = {
    id: string
    name: string
    categories: CategoryType[]
    isSeasonal: boolean 
    seasonalFrom: string | null
    seasonalTo: string | null
    daysFilter: boolean[]
    isTimeLimited: boolean 
    timeFrom: string | null
    timeTo: string | null
    position: number
    menuItems: MenuItemType[]
}

export type TagType = {
    id?: string
    name: string
    active: boolean
}

export type EstablishmentType = {

}

export type MerchantType = {

}
 
export type TimeUnit = "Second" | "Minute" | "Hour"
export type WeightUnit = "Gram" | "Kg"
