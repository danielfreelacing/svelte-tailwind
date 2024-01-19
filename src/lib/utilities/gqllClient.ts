import { Client, cacheExchange, fetchExchange } from '@urql/core';

function getClient(authToken: string | undefined) {

  
  let options = {
    url: "https://dev-api.nsuna.com/query",
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