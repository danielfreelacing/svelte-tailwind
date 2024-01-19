import type { ItemType, MenuType, ExtrasType, OptionType, OptionsSetType, TagType, CategoryType, MenuItemType } from '$lib/components/itemspage/types';
import { writable } from 'svelte/store';

import appStateStore from './appStateStore';
import { get } from 'svelte/store';
import localItemStore from './localItemStore';

let menu_items: MenuType[] = [];

export const category_item_init = {
    id: undefined,
    name: '',
    items: [],
    extras: [],
    active: true,
    position: 1

}

export const menu_item_init = {}

function createMenus() {
    const { subscribe, set, update } = writable<MenuType[]>(menu_items);
    return {
        subscribe,
        set,
        // increment: () => update((n) => n + 1),
        // reset: () => set(0)
        addMenu: (menu: MenuType) => update(state => state.concat(menu)),
        deleteMenu: (menuId: string) => update(state => {
            return state.filter(menu => menu.id !== menuId)
        }),
        updateMenu: (editedMenu: MenuType) => update(state => {
            return state.map(menu => {
                if (menu.id === editedMenu.id) {
                    menu = { ...editedMenu }
                }
                console.log("updating menu with ", menu)
                return menu
            })
        }),
        addCategory: (category: CategoryType) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    menu.categories = menu.categories.concat({
                        id: category.id,
                        name: category.name,
                        items: category.items,
                        isAvailable: category.isAvailable,
                        extras: [], 
                        position: 0
                    })
                }
                return menu
            })
        }),
        deleteCategory: (categoryID: string) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    console.log("deleting this category with id", categoryID)
                    menu.categories = menu.categories.filter((mappedCategory) => mappedCategory.id !== categoryID)
                }
                return menu
            })
        }),
        editCategory: (categoryID: string, newName: string) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    const categoryToEdit = menu.categories.find((mappedCategory) => mappedCategory.id === categoryID)
                    if (categoryToEdit !== undefined) {
                        console.log("editing this category with id", categoryID)
                        categoryToEdit.name = newName
                    }
                }
                return menu
            })
        }),
        addExtraToCategory: (menuItemID: string, extraData: ExtrasType) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    // const categoryToUpdate = menu.categories.find((mappedCategory) => mappedCategory.id === categoryID)
                    // if (categoryToUpdate !== undefined) {
                    //     console.log("editing this category with id", categoryID)
                    //     categoryToUpdate.extras = categoryToUpdate.extras.concat({ id: extraId, name: extraName, price: extraPrice, active: active })
                    // }

                    return {
                        ...menu,
                        menuItems: menu.menuItems.map((item) => {
                            if (item.id === menuItemID) {
                                return {
                                    ...item,
                                    extras: item.extras ? item.extras.concat(extraData) : [extraData]
                                }
                            }

                            return item
                        })
                    }
                }
                return menu
            })
        }),
        deleteExtraFromCategory: (menuItemID: string, extraId: string) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    // const categoryToEdit = menu.categories.find((mappedCategory) => mappedCategory.id === categoryID)
                    // if (categoryToEdit !== undefined) {
                    //     console.log("editing this category with id", categoryID)
                    //     categoryToEdit.extras = categoryToEdit.extras.filter(extraInCategory => extraInCategory.id !== extraId)
                    // }

                    return {
                        ...menu,
                        menuItems: menu.menuItems.map((item, index) => {
                            if (item.id === menuItemID) {
                                return {
                                    ...item,
                                    extras: item.extras
                                        ? item.extras.filter(item => item.id !== extraId)
                                        : []
                                }
                            }

                            return item
                        })
                    }
                }
                return menu
            })
        }),
        updateExtraInCategory: (categoryID: string,  extraId: string, extraName: string, extraPrice: number, active: boolean) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    const categoryToUpdate = menu.categories.find((mappedCategory) => mappedCategory.id === categoryID)
                    if (categoryToUpdate !== undefined) {
                        console.log("editing this category with id", categoryID)
                        categoryToUpdate.extras = categoryToUpdate.extras.filter(extraInCategory => extraInCategory.id !== extraId)
                    }
                }
                return menu
            })
        }),
        deleteItem: (itemID: string) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {

                    return {
                        ...menu, categories: menu.categories.map((category) => {
                            if (category.id === get(appStateStore).categoryIdSelected) {
                                category.items = category.items.filter(item => item.id !== itemID)
                                console.log("new categoryToUpdate", category)
                            }
                            return category
                        })
                    }
                }
                return menu
            })
        }),
        duplicateItem: (itemID: string, menuItem: MenuItemType) => update(state => {
            return state.map(menu => {
                if (menu.id === itemID) {
                    // return {
                    //     ...menu, categories: menu.categories.map((category) => {
                    //         if (category.id === get(appStateStore).categoryIdSelected) {
                    //             const itemToDuplicate = category.items.find(item => item.id === itemID)
                    //             const itemToDuplicateIndex = category.items.findIndex(item => item.id === itemID)

                    //             category.items.splice(itemToDuplicateIndex, 0, { ...itemToDuplicate!, id: newItemID })
                    //             console.log(" category with duplicated item", category)
                    //         }
                    //         return category
                    //     })
                    // }

                    console.log('duplicate: ', menu.menuItems)

                    return {
                        ...menu,
                        menuItems: menu.menuItems.concat(menuItem)
                    }
                }
                return menu
            })
        }),
        updateEditedItem: () => update((state) => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    return {
                        ...menu, categories: menu.categories.map((category) => {
                            if (category.id === get(appStateStore).localItemBelongsToCategoryId) {
                                const localItem = get(localItemStore)
                                let itemToUpdate = category.items.find(item => item.id === localItem.id)
                                itemToUpdate = get(localItemStore)
                                console.log("category with edited item", category)
                            }
                            return category
                        })
                    }
                }
                return menu
            })
        }),
        saveNewItem: () => update((state) => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    return {
                        ...menu, categories: menu.categories.map((category) => {
                            if (category.id === get(appStateStore).localItemBelongsToCategoryId) {
                                category.items = category.items.concat(get(localItemStore))
                                console.log("category with saved Item:", category)
                            }
                            return category
                        })
                    }
                }
                return menu
            })
        }),
        deleteOptionSet: (itemID: string, optionSetID: string) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    console.log("menuid", menu.id)
                    return {
                        ...menu, categories: menu.categories.map((category) => {
                            if (category.id === get(appStateStore).categoryIdSelected) {
                                return {
                                    ...category, items: category.items.map((item) => {
                                        if (item.id === itemID) {

                                            item.options = item.options.filter(optionSet => optionSet.id !== optionSetID)
                                            console.log("updated item", item)
                                        }
                                        return item
                                    })
                                }
                            }
                            return category
                        })
                    }
                }
                return menu
            })

        }),
        toggleCategoryActive: (active: boolean) => update(state => {
            return state.map(menu => {
                if (menu.id === get(appStateStore).menuIdSelected) {
                    menu.categories.find(category => (category.id === get(appStateStore).categoryIdSelected)) ? menu.categories.find(category => (category.id === get(appStateStore).categoryIdSelected))!.active = active : null
                }
                return menu
            })
        }),
    }
}

const menuStore = createMenus();




// menuStore.addCategory = (category: CategoryType) => 
// update(state => {

//     // const MenuId = get(appStateStore).menuIdSelected


//     O.modify(categoriesOptic)(( ))(state)
//     let added
//     return { ...state, added }

// }),

export default menuStore;