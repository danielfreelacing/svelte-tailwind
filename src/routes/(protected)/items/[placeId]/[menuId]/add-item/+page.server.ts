import type { PageServerLoad } from './$typesem/$types';
import getClient from '$lib/server/utilities/gqllClient.js';
import { QUERY_MENUS } from '$lib/schemas/items/queries';
import { MenuType } from '$lib/components/itemspage/types';


export const load: PageServerLoad = async ({ locals, url, params }) => {
  if (!locals.client) {
    locals.client = getClient(locals.authToken)
  }

  let menus: MenuType[] = [];
  let menu: MenuType | undefined;

  const menusResults = await locals.client.query(QUERY_MENUS,
    {
      "req": {
        "placeId": params.placeId
      }
    }
  )

  if (menusResults.data === null) {
    console.log("Unable to get menus: ", menusResults.error)
  } else {
    menus = menusResults.data.menus.menus
    menu = menus.filter((item) => item.id === params.menuId)[0];
  }

  return {
    menu
  }
}
