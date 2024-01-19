import type { LayoutServerLoad } from "./$types";
import getClient from '$lib/server/utilities/gqllClient.js';

export const load: LayoutServerLoad = async ({ params, locals, cookies, parent }) => {

  
    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }
  
  
    let placeList
    let merchant
    let contentHostUrl

    const ContentHostUrlQUERY = `
  query thisConfig{
    config {
      config {
        contentHostUrl
      }
    }
  }`

  const QUERY_USER_MERCHANT =
    `query userMerchant {
      userMerchant {
        merchant {
          id
          merchantType {
            id
            name
          }
          name
          description
          logoUrl
          address {
            id
            addressLine1
            addressLine2
            city
            county
            country
            postcode
          }
        }
      }
    }`
    
  const QUERY_MERCHANT_PLACELIST =
    `query PlaceList($req: ReqPlaceList!) {
    placeList(req: $req) {
      places { 
      id
      name
      logoUrl
      description
      address {
        id 
        addressLine1
        addressLine2
        city
        county
        postcode
        country
      }
      establishmentType {
        id
        name
      }
      }
    }
  }`

    const contentHostUrlresults = await locals.client.query(ContentHostUrlQUERY);
  
  
    if (contentHostUrlresults.data === null) {
      console.log("error", contentHostUrlresults.error)
      if (results?.error?.graphQLErrors[0].message === "409002") {
        throw redirect( 302, '/signin');
      }
      console.log("graphQL error message", contentHostUrlresults.error.graphQLErrors[0].message)
      console.log("graphQL error path", contentHostUrlresults.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", contentHostUrlresults.error.graphQLErrors[0].extensions)
  
    } else {
      // console.log("response content host url", contentHostUrlresults.data.config.config.contentHostUrl)
      contentHostUrl = contentHostUrlresults.data.config.config.contentHostUrl
    }
  
    const merchantResults = await locals.client.query(QUERY_USER_MERCHANT);
  
    if (merchantResults.data === null) {
      console.log("error", merchantResults.error)
      console.log("graphQL error message", merchantResults.error.graphQLErrors[0].message)
      console.log("graphQL error path", merchantResults.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", merchantResults.error.graphQLErrors[0].extensions)
  
    } else {
      // console.log("response, get merchant :", merchantResults.data)
      // console.log("response, get merchant :", merchantResults.data.userMerchant.merchant.id)
  
      const placeListResults = await locals.client.query(QUERY_MERCHANT_PLACELIST,
        {
          "req": {
            "merchantId": merchantResults.data.userMerchant.merchant.id
          }
        }
      );
  
      if (placeListResults.data === null) {
        console.log("error", placeListResults.error)
        console.log("graphQL error message", placeListResults.error.graphQLErrors[0].message)
        console.log("graphQL error path", placeListResults.error.graphQLErrors[0].path)
        console.log("graphQL error extensions", placeListResults.error.graphQLErrors[0].extensions)
  
      } else {
        // console.log("response, get placeList:", placeListResults.data)
        placeList = placeListResults.data.placeList.places
      }
  
      merchant = merchantResults.data.userMerchant.merchant
    }
  
    locals.data.placeList = placeList
    locals.data.merchant = merchant

    let authToken;
    let cookieContent = cookies.get('session')
    if (cookieContent) {
      authToken = JSON.parse(cookieContent);
    }
  
    return {
      placeList,
      merchant,
      contentHostUrl,
      authToken
    };
  };