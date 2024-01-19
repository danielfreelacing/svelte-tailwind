import type { LayoutServerLoad } from './$types';
import getClient from '$lib/utilities/gqllClient';


const ContentHostUrlQUERY = `
query thisConfig{
  config {
    config {
      contentHostUrl
    }
  }
}`


export const load: LayoutServerLoad = async ({locals, data}) => {
    if (!locals.client) {
        locals.client = getClient(locals.authToken)
      }

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

  return {
    contentHostUrl,
  }

}