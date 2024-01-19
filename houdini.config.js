export default {
    // ...
    plugins: {
        'houdini-svelte': {
            client: "./src/lib/utilities/gqllclient.ts",
        }
    },
    watchSchema: {
		url: 'http://localhost:4000/graphql',
		headers: {
			Authentication(env) {
				return `Bearer ${env.AUTH_TOKEN}`
			}
		}
	}

}