<script lang="ts">
	import appStateStore from '$lib/stores/appStateStore';
	import menuStore from '$lib/stores/menustore';
	import EditMenuModal from './add_menu/edit_menu.svelte';
	import DeleteMenuModal from './modals/delete_menu.svelte';
	import type { MenuType } from '$lib/types/items';
	import IconDragDrop from '$lib/icons/icon_drag_drop.svg';
	import IconSmallMenu from '$lib/icons/icon_small_menu.svg';
	import DeleteItemIcon from '$lib/icons/empty_can.svg';
	import DuplicateItemIcon from '$lib/icons/copy.svg';
	import EditItemIcon from '$lib/icons/edit.svg';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	let active_class = 'active  border-surface-surface-accent';
	let passive_class = ' border-transparent';

	export let menuItem: MenuType;
	export let selected: boolean = false;

	let showEditMenuModal = false;
	let showDeleteMenuModal = false;
    // $: console.log("menuItem", menuItem)

</script>

{#if showDeleteMenuModal && $appStateStore.menuIdSelected}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0 p-0 m-0">
		<DeleteMenuModal
			bind:menuName={menuItem.name}
			closeModalFunction={() => (showDeleteMenuModal = false)}
			bind:menuIdSelected={menuItem.id}
		/>
	</div>
{:else if showEditMenuModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0 p-0 m-0">
		<EditMenuModal
			bind:localMenuItem={menuItem}
			closeModalFunction={() => (showEditMenuModal = false)}
		/>
	</div>
{/if}

<div
	class=" py-4 border-b-4 {selected
		? active_class
		: passive_class} justify-start items-start gap-1 flex"
>
	<div class="w-5 h-5 relative">
		<img src={IconDragDrop} alt="add item" />
	</div>
	<div class="text-on-surface-primary text-base font-semibold font-['Poppins'] leading-tight whitespace-nowrap">
		{menuItem.name.charAt(0).toUpperCase() + menuItem.name.slice(1)}
	</div>

	<div class="justify-start items-center gap-2 flex">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="w-full">
				<div class="w-5 h-5 justify-center items-center flex">
					<div class="w-5 h-5 relative">
						<img src={IconSmallMenu} alt="add item" />
					</div>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="bg-white p-0 rounded-lg">
				<DropdownMenu.Group>
					<div
						class="w-52 bg-white rounded-lg shadow flex-col justify-start items-start inline-flex"
					>
						<DropdownMenu.Item class="w-full p-0">
							<button
								on:click={() => (showEditMenuModal = !showEditMenuModal)}
								class="self-stretch hover:bg-surface-border p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex w-full"
							>
								<div class="w-6 h-6 justify-center items-center flex">
									<div class="w-6 h-6 relative">
										<img src={EditItemIcon} height={24} width={24} alt="edit icon" />
									</div>
								</div>
								<div
									class="grow shrink basis-0 h-6 text-left text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
								>
									Edit Item
								</div>
							</button>
						</DropdownMenu.Item>

						<DropdownMenu.Item class="w-full p-0">
							<button
								on:click={() => (showDeleteMenuModal = !showDeleteMenuModal)}
								class="self-stretch hover:bg-surface-border p-3 justify-start items-center gap-2 inline-flex w-full"
							>
								<div class="w-6 h-6 justify-center items-center flex">
									<div class="w-6 h-6 relative">
										<img src={DeleteItemIcon} alt="delete icon" />
									</div>
								</div>
								<div
									class="grow shrink basis-0 h-6 text-left text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
								>
									Delete item
								</div>
							</button>
						</DropdownMenu.Item>
					</div>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
