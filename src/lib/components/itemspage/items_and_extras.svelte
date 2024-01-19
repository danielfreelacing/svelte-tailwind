<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Item from './item.svelte';
	import Extra from './extras_item.svelte';
	import { Switch } from '$lib/components/shadcn/ui/switch';
	import type { MenuItemType, CategoryType, MenuType, OptionType } from '$lib/types/items';
	import ActionButton from '../particles/action_button.svelte';
	import DeleteExtraModal from '$lib/components/itemspage/modals/delete_extra_item.svelte';
	import appStateStore from '$lib/stores/appStateStore';
	import menuStore from '$lib/stores/menustore';
	import ItemsAreMissing from './items_are_missing.svelte';
	import SmallMenu from '$lib/icons/icon_small_menu.svg';
	import EditCategoryIcon from '$lib/icons/edit.svg';
	import DeleteCategoryIcon from '$lib/icons/empty_can.svg';
	import DeleteCategoryModal from './modals/delete_category.svelte';
	import EditCategoryModal from './modals/edit_category.svelte';
	import { DropdownMenu } from 'bits-ui';
	import ExtrasAreMissing from './extras_are_missing.svelte';
	import { CreateMenuItemMutation } from '$lib/schemas/items/mutations';
	import { handleError } from '$lib/utilities/errorHandlers';

	const graphqlClient = getContextClient();
	const { data } = $page;

	let showDeleteCategoryModal = false;
	let showEditCategoryModal = false;
	let showDeleteExtraModal = false;

	let defaultMenuIdSelected = $menuStore[0] && $menuStore[0].id || '0';
	$: menuIdSelected = $appStateStore.menuIdSelected || defaultMenuIdSelected;

	$: menu = $menuStore.find((menuStore) => menuStore.id === menuIdSelected) as MenuType;
	$: categories = menu?.categories as CategoryType[];

	$: categoryIdSelected =
		$appStateStore.categoryIdSelected ||
		 categories && categories[0] && categories[0].id ||
		'0';

	$: items = (menu && menu.menuItems || []) as MenuItemType[];

	$: localActive = categories && categories.find((category) => category.id === categoryIdSelected)?.active as boolean || false;

	$: categoryIndex = categories && categories.findIndex((category) => category.id === categoryIdSelected) || 0;
	$: currentCategory =  categories && categories.findIndex((category) => category.id === categoryIdSelected) || null
	
	let extraName = '';
	let extraId = 0;
	let activeSelector = 'items';
	let active_class = 'active  border-surface-surface-accent';
	let passive_class = ' border-transparent';

	const handleSwitch = (localActive: boolean) => {
		console.log(' was in localActive active iIS ', localActive);
		menuStore.toggleCategoryActive(localActive);
	};

	$: handleSwitch(localActive);

	async function duplicateItem(menuItem: MenuItemType) {
		let newName: string;

		const regex = /-\([0-9]+\)/g;
		const arr = regex.exec(menuItem.name);
		if (arr) {
			const nameIndex = parseInt(arr[0].replace('-(', '').replace(')', '').trim()) + 1
			newName = menuItem.name.replace(arr[0], `-(${nameIndex})`)
		} else {
			newName = `${menuItem.name}-(1)`
		}

		const req = {
			name: newName,
			description: menuItem.description,
			price: menuItem.price,
			bannerUrl: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY', // menuItem.bannerUrl,
			isAvailable: menuItem.isAvailable,
			cookingTime: menuItem.cookingTime,
			cookingTimeUnit: menuItem.cookingTimeUnit,
			weight: menuItem.weight,
			weightUnit: menuItem.weightUnit,
			menuId: $appStateStore.menuIdSelected?.toString(),
			placeId: data.placeList[$appStateStore.activeEstablishmentIndex].id,
		}

		const results = await graphqlClient.mutation(CreateMenuItemMutation, {
			"req": {
				...req,
				categoryIds: menuItem.categories.map((item: any) => item.id),
				tagIds: menuItem.tags && menuItem.tags.map((item: any) => item.id) || [],
				optionIds: menuItem.optionSets.map(
					(item: any) => item.options
						? item.options.map((option: OptionType) => option.id)
						: []
				), // TODO: replace this with option later
				extraIds: menuItem.extras.map((item: any) => item.id), // TODO: Menu-Extra-create-update-listing-delete-UI
			}
		});

		if (!results.data) {
			handleError(results.error?.graphQLErrors);
		} else {
			menuStore.duplicateItem(
				req.menuId as string,
				{
					...req,
					id: results.data.menuItemCreate.item.id,
					categories: menuItem.categories,
					optionSets: menuItem.optionSets,
					extras: menuItem.extras
				} as MenuItemType
			);
		}
	}


	function handleExtraDelete(event: { detail: { id: any; name: any } }) {
		console.log('extra to be deleted has name and id:', event.detail.id, event.detail.name);
		extraId = event.detail.id;
		extraName = event.detail.name;
		showDeleteExtraModal = true;
	}

	const addItemToCategory = () => {
		if (menu.categories.length > 0) {
			goto(`/items/${$appStateStore.placeId}/${menu.id}/add-item`);
		} else {
			toast.push('Please add one category at least before adding item!')
		}
	}

	$: console.log($menuStore)
</script>

{#if showDeleteExtraModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0">
		<DeleteExtraModal
			closeModalFunction={() => (showDeleteExtraModal = false)}
			categoryIdSelected={categories[categoryIndex]?.id}
			{extraName}
			{extraId}
		/>
	</div>
{:else if showDeleteCategoryModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0">
		<DeleteCategoryModal
			closeModalFunction={() => (showDeleteCategoryModal = false)}
			{categoryIdSelected}
			categoryName={categories[categoryIndex]?.name}
		/>
	</div>
{:else if showEditCategoryModal}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0 p-0 m-0">
		<EditCategoryModal
			closeModalFunction={() => (showEditCategoryModal = false)}
			category={categories && categories[categoryIndex]}
			{categoryIdSelected}
		/>
	</div>
{/if}

<div class=" grow flex-col justify-start items-start gap-4 inline-flex">
	<div class="self-stretch justify-between items-center inline-flex">
		{#if categories && categories[categoryIndex] !== undefined}
			<div class="h-6 justify-start items-center gap-2 flex">
				<div class="w-9 h-6 relative">
					<Switch bind:checked={localActive} />
				</div>
				<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
					{ categories[categoryIndex]?.name.charAt(0).toUpperCase() +
						categories[categoryIndex]?.name.slice(1) }
				</div>
			</div>
		
			<div class="justify-start items-center gap-2 flex relative">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="w-full">
						<div class="w-5 h-5 justify-center items-center flex">
							<div class="w-5 h-5 relative">
								<img src={SmallMenu} alt="menu icon" />
							</div>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-52 relative bg-white z-10  ">
						<DropdownMenu.Group>
							<div
								class="w-52 h-24 bg-white rounded-lg shadow flex-col justify-start items-start inline-flex"
							>
								<DropdownMenu.Item class="w-full">
									<button
										on:click={() => (showEditCategoryModal = true)}
										class="w-full self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
									>
										<div class="w-6 h-6 justify-center items-center flex">
											<div class="w-6 h-6 relative">
												<img src={EditCategoryIcon} height={24} width={24} alt="edit icon" />
											</div>
										</div>
										<div
											class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
										>
											Edit category
										</div>
									</button>
								</DropdownMenu.Item>
								<DropdownMenu.Item class="w-full">
									<button
										on:click={() => (showDeleteCategoryModal = true)}
										class="w-full self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
									>
										<div class="w-6 h-6 justify-center items-center flex">
											<div class="w-6 h-6 relative">
												<img src={DeleteCategoryIcon} alt="delete icon" />
											</div>
										</div>
										<div
											class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
										>
											Delete category
										</div>
									</button>
								</DropdownMenu.Item>
							</div>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				
			</div>
		{/if}
	</div>
	<div class="self-stretch flex-col justify-start items-start flex">
		<div
			class="self-stretch pr-4 justify-between items-center inline-flex border-b border-gray-200"
		>
			<div class="h-[52px] justify-start items-center gap-6 flex z-[1]">
				<button
					on:click={() => (activeSelector = 'items')}
					class="pt-4 pb-3 {activeSelector === 'items'
						? active_class
						: passive_class}  border-b-4 justify-start items-start gap-1 flex"
				>
					<div class=" {activeSelector === 'items' ? 'text-zinc-900' : 'text-zinc-500'} text-base font-semibold font-['Poppins'] leading-tight">
						Items
					</div>
				</button>
				<button
					on:click={() => (activeSelector = 'extras')}
					class="pt-4 pb-3 {activeSelector === 'extras'
						? active_class
						: passive_class} border-b-4 justify-start items-start gap-1 flex"
				>
					<div class="{activeSelector === 'extras' ? 'text-zinc-900' : 'text-zinc-500'} text-base font-semibold font-['Poppins'] leading-tight">
						Extras
					</div>
				</button>
			</div>
			<ActionButton buttonText="Add item" onclickfunction={addItemToCategory} />
		</div>
		<div class="sm:bg-white sm:rounded-xl sm:border border-gray-200 mt-4 w-full">
			{#if activeSelector === 'items'}
				{#if items?.length > 0}
					<div class="flex flex-col sm:block">
						{#each items as item}
							<Item {item} duplicateItemFunction={duplicateItem} />
						{/each}
					</div>
				{:else}
					<ItemsAreMissing on:click={addItemToCategory} />
				{/if}
			{:else if (activeSelector = 'extras')}
				{#if currentCategory?.extras?.length > 0}
					<div class="flex flex-col sm:block">
						{#each currentCategory?.extras as extrasItem}
							<Extra on:removeExtra={handleExtraDelete} {extrasItem}  />
						{/each}
					</div>
				{:else}
					<ExtrasAreMissing />
				{/if}
			{/if}
		</div>
	</div>
</div>
