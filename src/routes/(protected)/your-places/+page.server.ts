import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
// import { client } from '$lib/utilities/apolloClient';
import getClient from '$lib/server/utilities/gqllClient.js';
import gql from 'graphql-tag';
import { createSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';




const CreatePlaceMutation =
  `mutation CreatePlace($req: ReqPlaceCreate!) {
  placeCreate(req: $req) {
    place {
      id
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
      country
      postcode
      country
    }
  }
}`



const QUERY_ESTABLISHMENT_TYPE_LIST =
  `query establishmentTypeList {
    establishmentTypeList {
      types {
        id
        name
      } 
    }
  }`

const QUERY_USER_MERCHANT =
  `query userMerchant {
    userMerchant {
     merchant {
      id
     }
    }
  }`



const schema = z.object({
  establishmentTypeId: z.string(),
  establishmentName: z.string().min(1, { message: "Fill in the establishment name" }),
  description: z.string().min(1, { message: "Fill in the description" }),
  address1: z.string().min(1, { message: "Fill in the establishment address" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "Fill in the establishment city" }),
  country: z.string().min(1, { message: "Fill in the establishment country" }),
  postcode: z.string().regex(/^\d+$/).min(1, { message: "Fill in the postcode" }),
  avatarImageUrl: z.string().min(1, { message: "Upload your logo" }),
  addAnotherEstablishment: z.boolean()
});


export const load: PageServerLoad = async (event) => {
  // console.log(" events locals", event.locals)

  // get the updated placeslist
  await event.parent()

  if (!event.locals.client) {
    event.locals.client = getClient(event.cookies.get('session'))
  }

  const uploadEstablishmentDataForm = await superValidate(schema);

  console.log("in load function for /your-places")

  const results = await event.locals.client.query(QUERY_ESTABLISHMENT_TYPE_LIST);

  if (results.data === null) {
    console.log("error", results.error)

    if (results.error?.graphQLErrors[0].message === "403002") {
      throw redirect(302, '/signin');
    }
    console.log("graphQL error message", results.error.graphQLErrors[0].message)
    console.log("graphQL error path", results.error.graphQLErrors[0].path)
    console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)

  } else {
    console.log("response, get merchant type list:", results.data)
  }

  return {
    establishmentTypeList: results.data.establishmentTypeList.types,
    uploadEstablishmentDataForm,
    uploadEstablishmentData: ""
  };

};

export const actions = {

  uploadEstablishmentData: async ({ cookies, request, locals }) => {



    const uploadEstablishmentDataForm = await superValidate(request, schema);

    if (uploadEstablishmentDataForm.data.avatarImageUrl === "undefined") {
      return setError(uploadEstablishmentDataForm, 'avatarImageUrl', 'Upload and submit avatar');
    }

    if (!uploadEstablishmentDataForm.valid) {

      return fail(400, { uploadEstablishmentDataForm });
    }


    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }

  
    const addressResults = await locals.client.mutation(CreateAddressMutation, {
      "req": {
        "addressLine1": uploadEstablishmentDataForm.data.address1,
        "addressLine2": uploadEstablishmentDataForm.data.address2,
        "city": uploadEstablishmentDataForm.data.city,
        "country": uploadEstablishmentDataForm.data.country,
        "postcode": uploadEstablishmentDataForm.data.postcode,
      }
    });




    if (addressResults.data === null) {
      console.log("error", addressResults.error)
      console.log("graphQL error message", addressResults.error.graphQLErrors[0].message)
      console.log("graphQL error path", addressResults.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", addressResults.error.graphQLErrors[0].extensions)

    } else {
      console.log("response", addressResults.data)
    }

    const merchantResults = await locals.client.query(QUERY_USER_MERCHANT);
    const merchantId = merchantResults.data.userMerchant.merchant.id


    console.log("sending this", JSON.stringify({ "merchantId": merchantId, "establishmentTypeId": uploadEstablishmentDataForm.data.establishmentTypeId, "addressId": addressResults.data.addressCreate.address.id, "name": uploadEstablishmentDataForm.data.establishmentName, "description": uploadEstablishmentDataForm.data.description, "logoUrl": uploadEstablishmentDataForm.data.avatarImageUrl })
    )

    const results = await locals.client.mutation(CreatePlaceMutation, {
      "req": {
        "merchantId": merchantId,
        "establishmentTypeId": uploadEstablishmentDataForm.data.establishmentTypeId,
        "name": uploadEstablishmentDataForm.data.establishmentName,
        "description": uploadEstablishmentDataForm.data.description,
        "addressId": addressResults.data.addressCreate.address.id,
        "logoUrl": uploadEstablishmentDataForm.data.avatarImageUrl
      }
    });

    if (results.data === null) {
      console.log("error", results.error)

      if (results.error?.graphQLErrors[0].message === "409003") {
        return setError(uploadEstablishmentDataForm, 'establishmentName', 'This establishment name already exists');
      }

      console.log("graphQL error message", results.error.graphQLErrors[0].message)
      console.log("graphQL error path", results.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)



    } else {
      console.log("response", results.data, uploadEstablishmentDataForm.data.addAnotherEstablishment)
      if (!uploadEstablishmentDataForm.data.addAnotherEstablishment) {
        throw redirect(302, '/items');
      } else {
        // throw redirect(302, '/your-places');
      }
    }

    // Yep, return { form } here too
    return message(uploadEstablishmentDataForm, 'Establishment form submitted');
  },
  establishmentAvatarImageUrl: async ({ cookies, request, locals }) => {

    const formData = Object.fromEntries(await request.formData());
    console.log("avatarin backend", formData)


    if (

      !(formData.establishmentAvatar as File).name ||
      (formData.establishmentAvatar as File).name === 'undefined'

    ) {

      return fail(400, {
        error: true,
        message: 'You must provide a file to upload'
      });

    }

    const { establishmentAvatar } = formData as { establishmentAvatar: File };

    // const AvatarFileBuffer = Buffer.from(await establishmentAvatar.arrayBuffer())

    // writeFileSync(`static/${establishmentAvatar.name}`, AvatarFileBuffer);


    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }


    const ContentHostUrlQUERY = `
    query thisConfig{
      config {
        config {
          contentHostUrl
        }
      }
    }`

    const results = await locals.client.query(ContentHostUrlQUERY);


    if (results.data === null) {
      console.log("error", results.error)
      console.log("graphQL error message", results.error.graphQLErrors[0].message)
      console.log("graphQL error path", results.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)

    } else {
      console.log("response content host url", results.data.config.config.contentHostUrl)
    }



    const ContentUploadMutation =
      `mutation ReqUploadContent($req: ReqUploadContent!) {
      contentUpload(content: $req) {
        url
      }
    }`

    // let imgData = new Blob([AvatarFileBuffer as BlobPart], { type: 'application/octet-binary' });

    console.log("image data uploading this:", establishmentAvatar)
    const secondResults = await locals.client.mutation(ContentUploadMutation, { "req": { "file": establishmentAvatar } });



    if (secondResults.data === null) {
      console.log("error", secondResults.error)

      console.log("graphQL error message", secondResults.error.graphQLErrors[0].message)
      console.log("graphQL error path", secondResults.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", secondResults.error.graphQLErrors[0].extensions)

    } else {
      console.log("response content host url", secondResults?.data.contentUpload.url)
    }

    console.log("sending this url to frontend as avatarImageUrl", secondResults?.data.contentUpload.url)

    return { type: "success", status: 200, data: { avatarImageUrl: secondResults?.data.contentUpload.url } }


  },
} satisfies Actions;
