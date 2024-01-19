<script>
  import { Client, setContextClient, cacheExchange, fetchExchange } from '@urql/svelte';

  const client = new Client({
    url: 'https://dev-api.nsuna.com/query',
    exchanges: [cacheExchange, fetchExchange],
  });

  setContextClient(client);
</script>

