import { Client, cacheExchange, fetchExchange } from '@urql/core';
import  { env } from '$env/dynamic/public';
function getClient(authToken: string | undefined) {

  
  let options = {
    url: env.PUBLIC_GRAPHQL_ENDPOINT,
    exchanges: [fetchExchange],
    fetchOptions: {}
  }

  if (authToken !== undefined) {
    options.fetchOptions = () => {
      // const token = getToken();
      const token = true
      return {
        headers: { "auth-token": authToken },
      };
    }
  }

  return new Client(options);

}


export default getClient