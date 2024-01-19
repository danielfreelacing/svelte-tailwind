import type { PageServerLoad } from './$types';
import getClient from '$lib/server/utilities/gqllClient.js';
import { QUERY_MENU_ITEM } from '$lib/schemas/items/queries';
import { MenuItemType } from '$lib/components/itemspage/types';


export const load: PageServerLoad = async ({ locals, url, params }) => {
  if (!locals.client) {
    locals.client = getClient(locals.authToken)
  }

  let menuItem: MenuItemType | undefined

  if (params.itemId && params.itemId !== undefined) {
    const results = await locals.client.query(QUERY_MENU_ITEM,
      {
        "req": {
          "placeId": params.placeId,
          "menuId": params.menuId,
          "menuItemId": params.itemId
        }
      }
    )
  
    if (results.data === null) {
      console.log("Unable to get menu: ", results.error)
    } else {
      menuItem = results.data.menuItem.item
    }
  }

  return {
    menuItem
  }
}
