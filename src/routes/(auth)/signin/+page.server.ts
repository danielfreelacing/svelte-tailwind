import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
// import { client } from '$lib/utilities/apolloClient';
import getClient from '$lib/server/utilities/gqllClient.js';
import gql from 'graphql-tag';
import { createSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';




const MUTATION = `
mutation userLogin($req: ReqUserLogin!) {
  userLogin(req: $req) {
    token {
      accessToken
      refreshToken
      generatedAt
      expireAt
    }
  }
  }
`

// const QUERY = `
// query establishmentTypeList {
//   establishmentTypeList {
//     types {
//       id
//       name
//     }
//   }
// }`

export type TokenType = {
  accessToken: string
  refreshToken: string
  generatedAt: Date
  expireAt: Date
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Please fill in the password." }),
});

export const load: PageServerLoad = async (event) => {
  return {

  };
};

export const actions = {
  default: async ({ cookies, request, locals }) => {


    const form = await superValidate(request, schema);


    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }
    if (!locals.client) {
      locals.client =    getClient(cookies.get('session'))
    }

    
    if (locals.client) {
      const results = await locals.client.mutation(MUTATION, {
        "req": {
          "email": form.data.email,
          "password": form.data.password
        }
      });
      if (results.data === null) {
        console.log("error", results.error)
        console.log("graphQL error message", results.error.graphQLErrors[0].message)
        console.log("graphQL error path", results.error.graphQLErrors[0].path)
        console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)
    
        if (results.error.graphQLErrors[0].extensions.password === 'mismatched') {
          return setError(form, 'password', 'Password is incorrect');
        } else if (results.error.graphQLErrors[0].extensions.email === 'is not registered') {
          return setError(form, 'email', 'Email is not registered');
        }

      } else {
        console.log("response", results.data)
        const authToken: TokenType['accessToken'] = results.data.userLogin.token.accessToken

        console.log("authToken in signin", authToken)
  
  
        if (authToken !== '') {
          locals.authToken = authToken
          locals.client = getClient(authToken)
          const sessionCreated = createSession(cookies, authToken)
          if (sessionCreated) {
            throw redirect(302, '/items');
          }
        }
      }

   
    } else {
      throw new Error('urql Client not initialized, check setup.')
    }

    // Yep, return { form } here too
    return { form };
  }
} satisfies Actions;





