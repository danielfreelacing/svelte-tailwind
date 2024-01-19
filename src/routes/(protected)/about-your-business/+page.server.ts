import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
// import { client } from '$lib/utilities/apolloClient';
import getClient from '$lib/server/utilities/gqllClient.js';
import gql from 'graphql-tag';
import { createSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';


import { writeFileSync } from 'fs';



const CreateMerchantMutation = 
`mutation MerchantCreate($req: ReqMerchantCreate!) {
  merchantCreate(req: $req) {
    merchant {
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


const QUERY_MERCHANT_TYPE_LIST =
  `query merchantTypeList {
    merchantTypeList {
      types {
        id
        name
      }
    }
  }`

const schema = z.object({
  merchantTypeId: z.string(),
  merchantName: z.string().min(1, { message: "Please fill in the merchant name" }),
  description: z.string().min(1, { message: "Please fill in the description" }),
  address1: z.string().min(1, { message: "Please fill in the merchant address" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "Please fill in the merchant city" }),
  country: z.string().min(1, { message: "Please fill in the merchant country" }),
  postcode: z.string().regex(/^\d+$/).min(1, { message: "Please fill in the postcode" }),
  avatarImageUrl: z.string().min(1, { message: "Upload your avatar" }),
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const avatarSchema = z.object({
  merchantAvatar: z.any()
  // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
})


export const load: PageServerLoad = async (event) => {
  // console.log(" events locals", event.locals)
  if (!event.locals.client) {
    event.locals.client = getClient(event.locals.authToken)
  }


  const uploadMerchantDataForm = await superValidate(schema);

  console.log("in load function for /about-your-business, event.locals is", event.locals)

  const results = await event.locals.client.query(QUERY_MERCHANT_TYPE_LIST);


  if (results.data === null) {
    console.log("error", results.error)
    console.log("graphQL error message", results.error.graphQLErrors[0].message)
    console.log("graphQL error path", results.error.graphQLErrors[0].path)
    console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)

  } else {
    console.log("response, get merchant type list:", results.data.merchantTypeList.types)
  }

  return {
    merchantTypeList: results.data.merchantTypeList.types,
    uploadMerchantDataForm,
    uploadMerchantData: ""
  };
};


export const actions = {

  uploadMerchantData: async ({ cookies, request, locals }) => {


    const uploadMerchantDataForm = await superValidate(request, schema);


    if (!uploadMerchantDataForm.valid) {
      return fail(400, { uploadMerchantDataForm });
    }

    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }

    const addressResults = await locals.client.mutation(CreateAddressMutation, {
      "req": {
        "addressLine1": uploadMerchantDataForm.data.address1,
        "addressLine2": uploadMerchantDataForm.data.address2,
        "city": uploadMerchantDataForm.data.city,
        "country": uploadMerchantDataForm.data.country,
        "postcode": uploadMerchantDataForm.data.postcode,
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

    console.log("sending this", JSON.stringify({"merchantTypeId": uploadMerchantDataForm.data.merchantTypeId, "name": uploadMerchantDataForm.data.merchantName,  "description": uploadMerchantDataForm.data.description, "addressId": addressResults.data.id, "logoUrl": uploadMerchantDataForm.data.avatarImageUrl})
        )

    const results = await locals.client.mutation(CreateMerchantMutation, {
      "req": {
        "merchantTypeId": uploadMerchantDataForm.data.merchantTypeId,
        "name": uploadMerchantDataForm.data.merchantName,
        "description": uploadMerchantDataForm.data.description,
        "addressId": addressResults.data.addressCreate.address.id,
        "logoUrl": uploadMerchantDataForm.data.avatarImageUrl
      }
    });


    if (results.data === null) {
      console.log("error", results.error)
      console.log("graphQL error message", results.error.graphQLErrors[0].message)
      console.log("graphQL error path", results.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", results.error.graphQLErrors[0].extensions)

    } else {
      console.log("response", results.data)
      throw redirect(302, '/your-places');
    }

  
    return message(uploadMerchantDataForm, 'Merchant form submitted');
  },
  merchantAvatarImageUrl: async ({ cookies, request, locals }) => {

    const formData = Object.fromEntries(await request.formData());
    console.log("avatarin backend", formData)


    if (

      !(formData.merchantAvatar as File).name ||
      (formData.merchantAvatar as File).name === 'undefined' 

    ) {

      return fail(400, {

        error: true,

        message: 'You must provide a file to upload'

      });

    }

    const { merchantAvatar } = formData as { merchantAvatar: File };

    const AvatarFileBuffer = Buffer.from(await merchantAvatar.arrayBuffer())

    // writeFileSync(`static/${merchantAvatar.name}`, AvatarFileBuffer);


    if (!locals.client) {
      locals.client = getClient(cookies.get('session'))
    }


    const ContentUploadMutation =
      `mutation ReqUploadContent($req: ReqUploadContent!) {
      contentUpload(content: $req) {
        url
      }
    }`

//     let imgData = new Blob([AvatarFileBuffer as BlobPart], { type: "image/jpeg"});
//     let imgFile = new File([AvatarFileBuffer], 'test.jspb',{ type: "image/jpeg"} )
// imgData.lastModifiedDate = new Date()
// imgData.name = 'ttestname'

//     let imgDataUpdated = new Blob([imgData], { type: "image/jpeg" });
//                       blob2.lastModifiedDate = new Date();
//                       blob2.name = fileName;

//     console.log("image imgData", imgData)
//     console.log("image imgfile", imgFile)
//     console.log("image mercahntAvatar", merchantAvatar)
    const secondResults = await locals.client.mutation(ContentUploadMutation, { "req": { "file": merchantAvatar } });


    if (secondResults.data === null) {
      console.log("error", secondResults.error)
      console.log("graphQL error message", secondResults.error.graphQLErrors[0].message)
      console.log("graphQL error path", secondResults.error.graphQLErrors[0].path)
      console.log("graphQL error extensions", secondResults.error.graphQLErrors[0].extensions)

    } else {
      console.log("response content host url", secondResults?.data?.contentUpload.url)
    }

    console.log("sending this url to frontend as avatarImageUrl",  secondResults?.data.contentUpload.url)

    return { type: "success", status: 200, data: { avatarImageUrl: secondResults?.data.contentUpload.url } }


 },
} satisfies Actions;


// function writeFileSync(arg0: string, arg1: Buffer) {
//   throw new Error('Function not implemented.');
// }

