<script>
	import Header from '$lib/components/header/header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';

	export let data;
</script>

<div class="w-full h-full bg-white">
	<Header {data} />

	<slot />
</div>

<SvelteToast />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.surface-surface-3);
	}
</style>
