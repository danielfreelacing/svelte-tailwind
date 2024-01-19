// import fetch from 'node-fetch';
// import { ApolloClient } from '@apollo/client/core';
// import { HttpLink } from '@apollo/client/link/http';
// import { InMemoryCache } from '@apollo/client/cache';
// import { setContext } from '@apollo/client/link/context';

 

//     const link = new HttpLink({
//       uri: "http://51.20.89.233:8280/query",
//       fetch
//     });

//     const authLink = setContext((_, { headers }) => {
//       return {
//         headers: {
//           ...headers,
//            "auth-token": "SmrhN6zbxdFoYLNihhMMlUjvYJVCUSHZlBaoGsf8TG6PRl7dcrYhq+sUp/I17W4ixtAeWfkyFkw0d3GI22DemehXkh+YjiquN1bCjbK0kta3HQOlCERqqTJYLrzl95VVXq/QrFnXRwugJKZqy5SoAtyXT6WEGMmBbnZNSZR0TtUPv9NMHvzljiLQGCKFJFleg1rqdhPVAeuGDv+/ndnmFoEv+y50giwZZ8SjbEJEL/BY81nkr4wYFjEiJeteSysj0SLXTSSY/fML8Q1YZg8Kcpltsaa9P+OLwLpiGpi5xIg="
//         }
//       };
//     });
    
//     export const client = new ApolloClient({
//       credentials: 'include',
//       link: authLink.concat(link),
//       cache: new InMemoryCache()
//     });
    

