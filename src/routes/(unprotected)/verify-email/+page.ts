import type { PageServerLoad, Actions, PageLoad } from './$types';




export const load: PageLoad = async ({params, data, request}) => {
    // console.log(" events locals", event.locals)
    // if (!event.locals.client) {
    //   event.locals.client = getClient(event.locals.authToken)
    // }
  
  
    // console.log("params in load", params)
    // console.log("data in load", data)
   
    // const results = await event.locals.client.mutation(UserVerifyEmailMutation, {
    //     "req":{"token": "sdggweg"}
    // });
  
  
    // if (results.data === null) {
    //   console.log("error", results.error)
    //   console.log("graphQL error message", results.error.graphQLErrors[0].message)
    //   console.log("graphQL error path", results.error.graphQLErrors[0].path)
    //   console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)
  
    // } else {
    //   console.log("response, get merchant type list:", results.data.merchantTypeList.types)
    // }
  
    return {

    };
  }; 