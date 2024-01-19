<script lang="ts">
	import IconDragDrop from '$lib/icons/icon_drag_drop.svg';
	import type { CategoryType } from '$lib/types/items';

	export let category: CategoryType;
	export let selected: boolean;
</script>

<div class="flex flex-row w-full border-t border-gray-200">
	{#if selected}
		<div class="w-[3px] h-12 bg-theme-red" />
	{:else}
		<div class="w-[3px] h-12 bg-transparent" />
	{/if}

	<div
		class="w-full self-stretch p-3 h-12 {selected ? 'bg-gray-selected' : 'bg-white'} bg-opacity-5  justify-start items-center gap-2 inline-flex"
	>
		<div class="w-5 h-5 relative">
			<img src={IconDragDrop} alt="add item" />
		</div>
		<div class="w-2 h-2 {category.isAvailable ? 'bg-text-text-on-surface-text-success' : 'bg-text-text-on-surface-text-error'} rounded-full" />

		<div class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
			{category.name.charAt(0).toUpperCase() + category.name.slice(1)}
		</div>
	</div>
</div>
