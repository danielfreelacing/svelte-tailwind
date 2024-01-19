<script lang="ts">
	import AddPlus from '$lib/icons/add_plus.svg';
	import MenuItem from './menu_item.svelte';
	import type { MenuType } from '$lib/types/items';
	import AddMenuModal from './add_menu/add_menu.svelte';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import SortableList from '../particles/sortableList.svelte';
	import { onMount } from 'svelte';

	let showAddMenuModal = false;
	$: menuIdSelected = $appStateStore.menuIdSelected || 
		( $menuStore && $menuStore.length > 0 ? $menuStore[0].id : undefined );

	onMount(() => {
		if ($appStateStore.menuIdSelected !== menuIdSelected) {
			appStateStore.setMenuIdSelected($menuStore[0].id);
		}
	});

	function handleClick(id: MenuType['id']) {
		appStateStore.setMenuIdSelected(id);
	}

	function handleSort(e: CustomEvent) {
		$menuStore = e.detail;
	}
</script>

<div
	class="flex-wrap sm:flex-nowrap w-full h-[52px] px-4 border-b border-gray-200 justify-between items-center inline-flex"
>
	<div class="justify-center items-center gap-4 flex">
		<!-- {#each $menuStore as menuItem, i} -->
		<SortableList list={$menuStore} on:sort={handleSort} let:item let:index directionRow={true}>
			<button on:click={() => handleClick(item.id)}>
				<MenuItem menuItem={item} selected={item.id === menuIdSelected} />
			</button>
		</SortableList>
		<!-- {/each} -->
	</div>
	<button
		class="rounded-[999px] justify-center items-center gap-2 flex"
		on:click={() => (showAddMenuModal = !showAddMenuModal)}
	>
		<div class="w-6 h-6 justify-center items-center flex">
			<div class="w-6 h-6 relative">
				<img src={AddPlus} alt="add item" />
			</div>
		</div>
		<div class="text-center text-blue-800 text-base font-semibold font-['Poppins'] leading-normal">
			Add menu
		</div>
	</button>
</div>

{#if showAddMenuModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>
	<div class="absolute w-full mx-auto left-0">
		<AddMenuModal
			closeModalFunction={() => {showAddMenuModal = false}}
		/>
	</div>
{/if}
