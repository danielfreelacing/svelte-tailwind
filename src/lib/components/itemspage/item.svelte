<script lang="ts">
	import Soup from '$lib/icons/soup.png';
	import { Switch } from '$lib/components/shadcn/ui/switch';
	import IconSmallMenu from '$lib/icons/icon_small_menu.svg';
	import type { MenuItemType } from '$lib/types/items';
	import DeleteItemModal from './delete_item.svelte';
	import DeleteItemIcon from '$lib/icons/empty_can.svg';
	import DuplicateItemIcon from '$lib/icons/copy.svg';
	import EditItemIcon from '$lib/icons/edit.svg';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import appStateStore from '$lib/stores/appStateStore';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';

	export let item: MenuItemType;
	export let duplicateItemFunction: (id: MenuItemType) => void;

	const { placeList } = $page.data;

	let showDeleteItemModal = false;

	const gotoDetail = (itemId: string) => {
		goto(`/items/${placeList[$appStateStore.activeEstablishmentIndex].id}/${$appStateStore.menuIdSelected?.toString()}/${itemId}`);
	}

</script>

{#if showDeleteItemModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0">
		<DeleteItemModal
			closeModalFunction={() => (showDeleteItemModal = false)}
			itemIdSelected={item.id || ''}
			itemName={item.name}
		/>
	</div>
{/if}

<div
	class="self-stretch w-[343px] sm:border-t sm:border-l-transparent sm:border-r-transparent sm:border-b-transparent sm:first:border-none sm:w-full rounded-xl sm:rounded-none sm:first:rounded-t-xl sm:last:rounded-b-xl bg-white sm:bg-none p-4 border mb-2 sm:mb-0 border-gray-200 justify-start items-center gap-6 flex-row inline-flex flex-wrap"
>
	<div
		class="whitespace-nowrap grow-2 shrink basis-0 h-10 justify-start items-center gap-3 flex order-1"
	>
		<img class="w-10 h-10 rounde" src={Soup} alt="exit icon" />
		<div
			class="grow shrink basis-0 text-zinc-900 text-sm font-semibold font-['Poppins'] leading-tight"
		>
			{item && item.name ? `${item.name.charAt(0).toUpperCase()}${item.name.slice(1)}` : ''}
		</div>
	</div>

	<div
		class="grow text-zinc-900 text-base font-normal font-['Poppins'] leading-normal order-3 sm:order-2"
	>
		<div class="w-[195px] flex-col justify-start items-start inline-flex">
			<div
				class="sm:hidden self-stretch h-5 text-text-text-on-surface-secondary text-xs font-semibold font-['Poppins'] leading-tight"
			>
				Option
			</div>
			<div
				class="w-[140px] sm:w-full text-zinc-900 text-base font-normal font-['Poppins'] leading-normal sm:whitespace-nowrap"
			>
				{#each item.optionSets as optionSet, i}
						{#if i > 0},{/if}
						{#each optionSet.options as option, i}
							{#if i > 0},{/if}
							{option.name.charAt(0).toUpperCase() + option.name.slice(1)}
						{/each}
					{/each}
			</div>
		</div>
	</div>

	<div
		class="w-20 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal order-4 sm:order-3"
	>
		<div class="w-[195px] flex-col justify-start items-start inline-flex">
			<div
				class="sm:hidden self-stretch h-5 text-text-text-on-surface-secondary text-xs font-semibold font-['Poppins'] leading-tight"
			>
				Price
			</div>
			${item.price && item.price.toFixed(2)}
		</div>
	</div>

	<div class="justify-start items-center gap-2 flex order-2 sm:order-4">
		<div class="w-9 h-6 relative">
			<Switch bind:checked={item.isAvailable} />
		</div>
		<div class="justify-start items-center gap-2 flex">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="w-full">
					<div class="w-5 h-5 justify-center items-center flex">
						<div class="w-5 h-5 relative">
							<img src={IconSmallMenu} alt="menu icon" />
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
									on:click={() => gotoDetail(item.id)}
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
									on:click={() => duplicateItemFunction(item)}
									class="self-stretch hover:bg-surface-border p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex w-full"
								>
									<div class="w-6 h-6 justify-center items-center flex">
										<div class="w-6 h-6 relative">
											<img src={DuplicateItemIcon} alt="delete icon" />
										</div>
									</div>
									<div
										class="grow shrink basis-0 h-6 text-left text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									>
										Duplicate item
									</div>
								</button>
							</DropdownMenu.Item>
							<DropdownMenu.Item class="w-full p-0">
								<button
									on:click={() => (showDeleteItemModal = true)}
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
</div>
