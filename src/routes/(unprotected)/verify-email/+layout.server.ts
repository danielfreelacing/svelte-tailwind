import type { LayoutLoad, LayoutServerLoad } from './$types';
import getClient from '$lib/server/utilities/gqllClient';

const UserVerifyEmailMutation = `mutation VerifyEmail($req: ReqUserVerifyEmail!) {
    userVerifyEmail(req: $req) {
      isSuccess
    }
  }`

export const load: LayoutServerLoad = async ({ locals, url }) => {
  console.log("url in verify email", url)


  console.log("params in verify email", url)
  const token = url.search.replace('?token=', '')
//   let convertedToken 

//   if (typeof Buffer.from === "function") {
//     // Node 5.10+
//     convertedToken = Buffer.from(token, 'base64').toString('ascii');; // Ta-da
// } 


  console.log(" token in verify-email", token)
  const client = getClient("")



  const results = await client.mutation(UserVerifyEmailMutation, {
    "req": { "token": token }
  });

  console.log("results", results)

  if (results.data === null) {
    console.log("error", results.error)
    console.log("graphQL error message", results.error.graphQLErrors[0].message)
    console.log("graphQL error path", results.error.graphQLErrors[0].path)
    console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)
    return { type: "fail", number: 500, data: "user is NOT verified" }
} else {
    console.log("response, in EMAIL server:", results.data)
    if (results.data.userVerifyEmail.isSuccess) {
      return { type: "success", number: 200, data: "user is verified" }
    } else {
      return { type: "fail", number: 500, data: "user is NOT verified" }
    }
    
  }







};