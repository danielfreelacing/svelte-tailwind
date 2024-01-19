import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import getClient from '$lib/server/utilities/gqllClient.js';
import {
  QUERY_MENUS,
  QUERY_CATEGORIES,
  QUERY_MERCHANT_PLACELIST,
  QUERY_USER_MERCHANT,
  ContentHostUrlQUERY,
} from '$lib/schemas/items/queries';

const addMenuSchema = z.object({
  placeId: z.string(),
  name: z.string().min(1, { message: "Menu name missing" }),
  position: z.number(),
  seasonalFrom: z.string().optional(),
  seasonalTo: z.string().optional(),
  timeFrom: z.string().optional(),
  timeTo: z.string().optional(),
  daysFilter: z.string().array()
});

const addCategorySchema = z.object({ 
  menuId: z.string(),
  name: z.string().min(1, { message: "Category name missing" }),
  position: z.number(),
  isAvailable: z.boolean(),
  placeId: z.string()
});

export const load: PageServerLoad = async ({ cookies, request, locals }) => {

  console.log("in items pageserverload")
  if (!locals.client) {
    locals.client = getClient(locals.authToken)
  }

  let menus = []
  let categories = []
  let placeList = []
  let merchant
  let contentHostUrl

  try {
    const contentHostUrlresults = await locals.client.query(ContentHostUrlQUERY);
  
    if (contentHostUrlresults.data === null) {
      console.log("contentHostUrlresults error", contentHostUrlresults.error)
    } else {
      if (contentHostUrlresults.data.config) {
        contentHostUrl = contentHostUrlresults.data.config.config.contentHostUrl
      }
    }
  } catch (error) {
    console.log("Unable to get contentHostUrlresults: ", error)
  }

  try {
    const merchantResults = await locals.client.query(QUERY_USER_MERCHANT);
  
    if (merchantResults.data === null) {
      console.log("merchantResults error", merchantResults.error)
    } else {
      // console.log("response, get merchant :", merchantResults.data)
      // console.log("response, get merchant :", merchantResults.data.userMerchant.merchant.id)
      merchant = merchantResults.data.userMerchant.merchant
  
      const placeListResults = await locals.client.query(QUERY_MERCHANT_PLACELIST,
        {
          "req": {
            "merchantId": merchant.id
          }
        }
      );
  
      if (placeListResults.data === null) {
        console.log("placeListResults error", placeListResults.error)
      } else {
        // console.log("response, get placeList:", placeListResults.data)
        placeList = placeListResults.data.placeList.places
      }
    }
  } catch (error) {
    console.log("Unable to get placeListResults: ", error)
  }

  const addMenuForm = await superValidate(addMenuSchema, {
    id: "123123"
  });

  const addCategoryForm = await superValidate(addCategorySchema, {
    id: "addCategoryForm"
  });

  try {
    const menusResults = await locals.client.query(QUERY_MENUS,
      {
        "req": {
          "placeId": placeList[0].id,   //TO BE UPDATED
        }
      }
    )
  
    if (menusResults.data === null) {
      console.log("menusResults error", menusResults.error)
    } else {
      // console.log("response, got menu list:", menusResults.data.menus.menus)
      menus = menusResults.data.menus.menus
  
      const categoriesResults = await locals.client.query(QUERY_CATEGORIES,
        {
          "req": {
            "placeId": placeList[0].id,
            "menuId": merchant.id
          }
        })
      if (categoriesResults.data === null) {
        console.log("categoriesResults error", categoriesResults.error)
      } else {
        // console.log("response, get categories list:", categoriesResults.data.menuCategories.categories)
        categories = categoriesResults.data.menuCategories.categories
      }
    }
  } catch (error) {
    console.log("Unable to get categoriesResults: ", error)
  }

  console.log("contentHostUrl", contentHostUrl)
  return {
    addMenuForm,
    addCategoryForm,
    menus,
    categories,
    placeList,
    merchant,
    contentHostUrl,
  };
};


export const actions = {
  addMenu: async ({ cookies, request, locals }) => {
    // console.log("was in addMenu ")
    const addMenuForm = await superValidate(request, addMenuSchema);

    if (!addMenuForm.valid) {
      return fail(400, { addMenuForm });
    }

    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }

    console.log("addMenuForm", request, addMenuForm.data)

    // const AddMenuResults = await locals.client.mutation(CreateMenuMutation, {
    //   "req": {
    //     "placeId": addMenuForm.data.placeId,
    //     "name": addMenuForm.data.menuName,
    //     "position": addMenuForm.data.position,
    //     "availableFromDate": addMenuForm.data.seasonalFrom,
    //     "availableTillDate": addMenuForm.data.seasonalTo,
    //     "availableFromTime": addMenuForm.data.timeFrom,
    //     "availableTillTime": addMenuForm.data.timeTo,
    //     "availableOnWeekdays": addMenuForm.data.daysFilter
    //   }
    // });

    // console.log("response3: ", AddMenuResults)
    // if (AddMenuResults.data === null) {
    //   console.log("error", AddMenuResults.error)
    //   console.log("graphQL error message", AddMenuResults.error.graphQLErrors[0].message)
    //   console.log("graphQL error path", AddMenuResults.error.graphQLErrors[0].path)
    //   console.log("graphQL error extensions", AddMenuResults.error.graphQLErrors[0].extensions)

    // } else {
    //   console.log("response: ", AddMenuResults.data)
    // }

    // return message(addMenuForm, 'Add Menu form submitted');

    return { addMenuForm }
  },

  addCategory: async ({ cookies, request, locals }) => {
    console.log("was in addCategory ")
    const addCategoryForm = await superValidate(request, addCategorySchema);

    console.log("sending this", addCategoryForm.data)
    if (!addCategoryForm.valid) {
      return fail(400, { addCategoryForm });
    }

    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }

    // const addCategoryResults = await locals.client.mutation(CreateCategoryMutation, {
    //   "req": {
    //     "placeId": addCategoryForm.data.placeId,
    //     "menuId": addCategoryForm.data.menuId,
    //     "position": addCategoryForm.data.position,
    //     "name": addCategoryForm.data.name,
    //     "isAvailable": addCategoryForm.data.isAvailable
    //   }
    // });

    // if (addCategoryResults.data === null) {
    //   console.log("error", addCategoryResults.error)
    //   console.log("graphQL error message", addCategoryResults.error.graphQLErrors[0].message)
    //   console.log("graphQL error path", addCategoryResults.error.graphQLErrors[0].path)
    //   console.log("graphQL error extensions", addCategoryResults.error.graphQLErrors[0].extensions)

    // } else {
    //   // console.log("response", addCategoryResults.data)
    // }

    // return message(addCategoryForm, 'Add category form submitted');

    return { addCategoryForm }
  }

} satisfies Actions;
