import '$lib/schemas/settings/queries'

import type {Actions, PageServerLoad} from './$types';
import {message, superValidate} from 'sveltekit-superforms/server';
import {mutationAddressUpdate, mutationUserChangePassword, mutationUserUpdate} from '../../../lib/schemas/settings/mutations';

import {fail} from '@sveltejs/kit';
import getClient from '$lib/server/utilities/gqllClient.js';
import {queryUserMe} from '$lib/schemas/settings/queries';
import {settingsAccountSchema} from '$lib/schemas/settings/zods';

export const load: PageServerLoad = async (req) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Settings Load @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  let settingsAccountForm

  if (!req.locals.client && req.locals.authToken) {
    req.locals.client = getClient(req.locals.authToken)
  }

  if (req.locals.client) {
    const queryUserMeRes = await req.locals.client.query(queryUserMe)
    const user = queryUserMeRes?.data?.userMe?.user

    if (user) {
      settingsAccountForm = await superValidate(user, settingsAccountSchema);
    }
  }

  return {
    settingsAccountForm,
  }
}

export const actions: Actions = {
  user: async (pageData) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Settings Action User @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    const request = pageData.request
    let client = pageData.locals.client
    const authToken = pageData.locals.authToken || pageData.cookies.get('session')
    console.log('authToken: ', authToken)
    const settingsAccountForm = await superValidate(request, settingsAccountSchema);
    console.log('settingsAccountForm: ', settingsAccountForm)

    if (!settingsAccountForm.valid) {
      return fail(400, {settingsAccountForm})
    }

    if (!client) {
      if (!authToken) {
        return message(settingsAccountForm, 'Auth token not exist.')
      }

      client = getClient(authToken)
    }

    if (settingsAccountForm.data.currentPassword && settingsAccountForm.data.newPassword && settingsAccountForm.data.confirmNewPassword) {
      const cond = {
        "req": {
          "currentPassword": settingsAccountForm.data.currentPassword,
          "newPassword": settingsAccountForm.data.newPassword,
          "confirmNewPassword": settingsAccountForm.data.confirmNewPassword
        }
      }
      const userChangePasswordRes = await client.mutation(mutationUserChangePassword, cond);
      console.log('userChangePasswordRes: ', userChangePasswordRes)

      if (!userChangePasswordRes?.data?.userChangePassword?.isSuccess) {
        return message(settingsAccountForm, 'Password is incorrect.')
      }
    }

    const addressUpdateRes = await client.mutation(mutationAddressUpdate, {
      "req": {
        "id": settingsAccountForm.data.address?.id,
        "addressLine1": settingsAccountForm.data.address?.addressLine1,
        "addressLine2": settingsAccountForm.data.address?.addressLine2,
        "city": settingsAccountForm.data.address?.city,
        "country": settingsAccountForm.data.address?.country,
        "postcode": settingsAccountForm.data.address?.postcode
      }
    });
    console.log('addressUpdateRes: ', addressUpdateRes.data)

    if (!addressUpdateRes.data) {
      return message(settingsAccountForm, 'Database connection failed.')
    }

    const userUpdateRes = await client.mutation(mutationUserUpdate, {
      "req": {
        "firstName": settingsAccountForm.data.firstName,
        "lastName": settingsAccountForm.data.lastName,
        "phoneNumber": settingsAccountForm.data.phoneNumber,
        "addressId": settingsAccountForm.data.address?.id,
        "identificationNumber": settingsAccountForm.data.identificationNumber,
      }
    });
    console.log('userUpdateRes: ', userUpdateRes.data)

    if (!userUpdateRes.data) {
      return message(settingsAccountForm, 'Database connection failed.')
    }

    return message(settingsAccountForm, 'Saved successfully.')
  }
};