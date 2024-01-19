import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
// import { client } from '$lib/utilities/apolloClient';
import getClient from '$lib/server/utilities/gqllClient.js';
import gql from 'graphql-tag';
import { createSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';





const schema = z.object({
  firstName: z.string().min(1, { message: "Please fill in your name" }),
  lastName: z.string().min(1, { message: "Please fill in your last name" }),
  phone: z.string().regex(/^\d+$/).min(1, { message: "Please fill in your phone (only numbers)" }),
  idNumber: z.string().regex(/^\d+$/).min(1, { message: "Please fill in your id." }),
  address1: z.string().min(4, { message: "Please fill your the address, with min. 4 characters." }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "Please fill in your city" }),
  country: z.string().min(1, { message: "Please fill in your country" }),
  postcode: z.string().regex(/^\d+$/).min(1, { message: "Please fill in your postcode" })
});


const UserUpdateMutation = `mutation UserUpdate($req: ReqUserUpdate!) {
  userUpdate(req: $req) {
    user {
      firstName
      lastName
      phoneNumber
      identificationNumber
      email
      address {
        id 
        addressLine1
      }
    }
  }
}`

const CreateAddressMutation = `
mutation AddressCreate($req: ReqAddressCreate!) {
  addressCreate(req: $req) {
    address {
      id
      addressLine1
      addressLine2
      city
      county
      postcode
      country
    }
  }
}
`


export const actions = {
  default: async ({ cookies, request, locals }) => {


    const form = await superValidate(request, schema);


    if (!form.valid) {
      return fail(400, { form });
    }

    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }


    const results = await locals.client.mutation(CreateAddressMutation, {
      "req": {
        "addressLine1": form.data.address1,
        "addressLine2": form.data.address2,
        "city": form.data.city,
        "country": form.data.country,
        "postcode": form.data.postcode,
      }
    });

    if (results.data === null) {
      console.log("error", results.error)
      console.log("graphQL error message", results.error.graphQLErrors[0].message)
      console.log("graphQL error path", results.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)

    } else {
      console.log("response", results.data)
    }

    const user_mutation_results = await locals.client.mutation(UserUpdateMutation, {
      "req": {
        "firstName": form.data.firstName,
        "lastName": form.data.lastName,
        "phoneNumber": form.data.phone,
        "addressId": "a8eed4ee-921e-4621-a90f-7efda01b0cdc",  
        // results.data.userid,
        "identificationNumber": form.data.idNumber,
      }
    });

    if (user_mutation_results.data === null) {
      console.log("error", user_mutation_results.error)
      console.log("graphQL error message", user_mutation_results.error.graphQLErrors[0].message)
      console.log("graphQL error path", user_mutation_results.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", user_mutation_results.error.graphQLErrors[0].extensions)

    } else {
      console.log("response", user_mutation_results.data)
      throw redirect(302, '/about-your-business');
    }




    return { form };
  }
} satisfies Actions;
