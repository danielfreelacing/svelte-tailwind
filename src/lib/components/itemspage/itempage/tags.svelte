<script lang="ts">
	import type { ItemType, TagType } from '../types';
	import Tag from './tag.svelte';
	import localItemStore from '$lib/stores/localItemStore';
</script>

<div class="w-[340px] h-36 flex-col justify-start items-start gap-4 inline-flex">
	<div class="text-zinc-900 text-lg font-semibold font-['Poppins'] leading-normal">Tag items</div>
	{#each $localItemStore.tags as tag, i}
		<Tag bind:tag />
	{/each}
</div>
