<script>
  import { Client, setContextClient, fetchExchange } from '@urql/svelte';
  import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public'

	export let data;

  const client = new Client({
    url: PUBLIC_GRAPHQL_ENDPOINT,
    exchanges: [fetchExchange],
		fetchOptions: () => {
      return {
        headers: { "auth-token": data?.authToken },
      };
    }
  });

  setContextClient(client);
</script>

<slot/>