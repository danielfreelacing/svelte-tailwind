import { z } from 'zod';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
  email:   z
  .string()
  .min(1, { message: "Please fill in the email." })
  .email("This is not a valid email."),
  password: z.string().min(4, { message: "Please fill in the password, with min. 4 characters." }),
  confirmPassword: z.string(),
  tag: z.literal('on', { errorMap: () => ({ message: "Please acccept the conditions."}) })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const MUTATION = `mutation ReqUserRegister($req: ReqUserRegister!) {
  userRegister(req: $req) {
    user {
      id
      email
    }
  }
  }`



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
  
    // else if(form.valid && form.data.tag === false) {
    //   return fail(400, { form });
    // }

    if (locals.client) {
      const results = await locals.client.mutation(MUTATION, {
        "req": {
          "email": form.data.email,
          "password": form.data.password,
          "confirmPassword": form.data.confirmPassword
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

      if (results?.error?.graphQLErrors[0].message === '409001') {
        return setError(form, 'email', 'Email is already registered');
      }
      
      if (results?.data?.userRegister.user) {
        // console.log(" redirects to verify-email")
        throw redirect(302, `/reply-email-to-verify/?email=${results?.data?.userRegister.user.email}`);
      }

    } else {
      throw new Error('urql Client not initialized, check setup.')
    }

    // Yep, return { form } here too
    return { form };
  }
} satisfies Actions;