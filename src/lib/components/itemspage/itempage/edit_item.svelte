<script lang="ts">
	import Description from './description.svelte';
	import Extras from './extras.svelte';
	import Options from './options.svelte';
	import Status from './status.svelte';
	import Tags from './tags.svelte';
	import Headline from './headline.svelte';
	import NewOptionSet from './option/new_option_set.svelte';
	import EditOptionSet from './option/edit_option_set.svelte';
	import menuStore from '$lib/stores/menustore';
	import localItemStore from '$lib/stores/localItemStore';
	import appStateStore from '$lib/stores/appStateStore';
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { MenuType, OptionType } from '$lib/types/items';
	import { UpdateMenuItemMutation } from '$lib/schemas/items/mutations';

	const graphqlClient = getContextClient();
	const { data, params } = $page;

	let showNewOptionModal = false;
	let showEditOptionModal = false;

	function handleOptionModal() {
		showNewOptionModal = !showNewOptionModal;
	}

	function handleEditOptionModal() {
		showEditOptionModal = !showEditOptionModal;
	}

	let menuItem = data.menuItem;

	let defaultMenuIdSelected = $menuStore && $menuStore.length > 0 && $menuStore[0].id || '0';
	
	let menuIdSelected = $appStateStore.menuIdSelected || defaultMenuIdSelected;

	$: currentMenu = $menuStore.find((menuStore) => menuStore.id === menuIdSelected) as MenuType;

	let categoryIdSelected =
		$appStateStore.categoryIdSelected ||
		currentMenu && currentMenu.categories.length > 0 && currentMenu.categories[0].id || 0;

	onMount(() => {
		if($appStateStore.menuIdSelected === undefined) {
			appStateStore.setMenuIdSelected(defaultMenuIdSelected);
		}

		if($appStateStore.categoryIdSelected == undefined) {
			appStateStore.setCategoryIdSelected(
				currentMenu && currentMenu?.categories.length > 0 && currentMenu.categories[0].id || '0'
			);
		}
	});

	const onChangeCategory = (categoryId: string) => {
		categoryIdSelected = categoryId;
	}

	const onEditMenuItem = async (event: { isUpdate: boolean, data: any }) => {
		const { isUpdate, data } = event;

		console.log(data, menuItem);

		const results = await graphqlClient.mutation(UpdateMenuItemMutation, {
			"req": {
				id: menuItem.id,
				name: menuItem.name,
				description: menuItem.description,
				price: menuItem.price,
				bannerUrl: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY', // menuItem.bannerUrl,
				isAvailable: menuItem.isAvailable,
				cookingTime: menuItem.cookingTime,
				cookingTimeUnit: menuItem.cookingTimeUnit,
				weight: menuItem.weight,
				weightUnit: menuItem.weightUnit,
				placeId: params.placeId,
				menuId: params.menuId,
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
			// TODO: replace the error with API response
			toast.push('Unable to create a menu item!');
		} else {
			// menuStore.updateEditedItem();
			$localItemStore = menuItem;
			goto('/items');
		}
	}
</script>

{#if showNewOptionModal}

<div class=" bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-30 fixed " />

	<div class="container mx-auto">
		<NewOptionSet closeModalFunction={() => (showNewOptionModal = false)} />
	</div>

{:else if showEditOptionModal}
	<div class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-30" />

	<div class="container mx-auto">
		<EditOptionSet closeModalFunction={() => (showEditOptionModal = false)} />
	</div>
{/if}

<div class="relative z-20 left-0 top-0 flex flex-col w-full">
	<Headline isEditedItem={true} onSubmit={onEditMenuItem} />

	<div class=" px-4 py-8 w-full h-full gap-8 flex flex-col bg-surface-surface-3">
		<div class="flex flex-row gap-6 border-none">
			<div class="flex flex-col gap-8 grow">
				<div class="flex flex-col rounded-xl">
					<Status />
					<Description menu={currentMenu} bind:menuItem={menuItem} onChangeCategory={onChangeCategory} />
				</div>
				<Options {handleOptionModal} {handleEditOptionModal}  />
				<Extras />
			</div>
			<Tags />
		</div>
	</div>
</div>
