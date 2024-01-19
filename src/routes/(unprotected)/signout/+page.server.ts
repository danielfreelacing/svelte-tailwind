import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals, cookies, parent }) => {
	const session = cookies.get('session');
	if (session) {
		cookies.delete('session', { path: '/' });
	}
	locals.authToken = undefined;

	await parent()
	throw redirect(303, '/signin');

};


export const actions = {
	signout: (event) => {
		const session = event.cookies.get('session');
		if (session) {
			event.cookies.delete('session', { path: '/' });
		}
		event.locals.authToken = undefined;
		throw redirect(303, '/');
	}
} satisfies Actions;