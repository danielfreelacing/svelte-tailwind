<script lang="ts">
	import { page } from '$app/stores';
	import EditItem from "$lib/components/itemspage/itempage/edit_item.svelte";
</script>

{#if $page.params.itemId && $page.params.itemId !== undefined}
	<EditItem/>
{/if}