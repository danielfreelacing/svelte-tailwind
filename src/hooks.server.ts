import type { error, Handle } from '@sveltejs/kit';
import getClient from '$lib/server/utilities/gqllClient';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
  const { url, locals, request, cookies } = event;

  let authToken
  let cookieContent = cookies.get('session')
  
  if (cookieContent) {
    authToken = JSON.parse(cookieContent);
  }

  locals.authToken = authToken;
  locals.client = getClient(authToken)

  console.log("Auth token:", locals.authToken)
  locals.data = {}
  locals.data.placeList = []
  locals.data.merchant = {}
      
  if (!authToken &&
    (
      url.pathname.startsWith('/items') || url.pathname.startsWith('/orders') ||
      url.pathname.startsWith('/staff') || url.pathname.startsWith('/stats') ||
      url.pathname.startsWith('/zones') || url.pathname.startsWith('/about-you') ||
      url.pathname.startsWith('/about-your-business') || url.pathname.startsWith('/about-your-places') ||
      url.pathname === '/'
    )
  ) {
    console.log("no", url, authToken)
    throw redirect(302, '/signin');
  }

  // TODO: change the default route to '/'
  if(authToken && url.pathname === '/') {
    throw redirect(302, '/items');
  }
  
  const response = await resolve(event);

  return response;
};
