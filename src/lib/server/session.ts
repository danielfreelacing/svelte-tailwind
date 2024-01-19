import { Temporal } from '@js-temporal/polyfill';
import type { Cookies } from '@sveltejs/kit';
import type { TokenType } from '../../routes/(auth)/signin/proxy+page.server';
import  { ENVIRONMENT } from '$env/static/private';
export function createSession(cookies: Cookies, accessToken: TokenType['accessToken']) {
console.log(" Creating new session by setting cookie with access token:", accessToken)

try {
		cookies.set('session', JSON.stringify( accessToken ), {
			path: '/',
			expires: new Date(Temporal.Now.plainDateTimeISO().add({ hours: 24 }).toString()),
			sameSite: 'lax',
			httpOnly: true,
			secure: ENVIRONMENT === 'dev' ? false : true,
		});


	} catch {
		throw new Error('cookie was not set in session.ts')
	}

	return true
}