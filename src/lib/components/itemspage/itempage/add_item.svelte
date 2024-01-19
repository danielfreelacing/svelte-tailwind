<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Description from './description.svelte';
	import Extras from './extras.svelte';
	import Options from './options.svelte';
	import Status from './status.svelte';
	import Tags from './tags.svelte';
	import Headline from './headline.svelte';
	import NewOptionSet from './option/new_option_set.svelte';
	import EditOptionSet from './option/edit_option_set.svelte';
	import appStateStore from '$lib/stores/appStateStore';
	import menuStore from '$lib/stores/menustore';
	import localItemStore from '$lib/stores/localItemStore';
	import { CreateMenuItemMutation } from '$lib/schemas/items/mutations';
	import type { MenuItemType, OptionType } from '$lib/types/items';

	const graphqlClient = getContextClient();
	const { params, data } = $page;

	let showNewOptionModal = false;
	let showEditOptionModal = false;

	function handleOptionModal() {
		showNewOptionModal = !showNewOptionModal;
	}

	function handleEditOptionModal() {
		showEditOptionModal = !showEditOptionModal;
	}

	let menuItem: MenuItemType = {
    name: '',
    optionSets: [],
    price: undefined,
    extras: [],
    isAvailable: true,
    description: '',
    weight: undefined,
    weightUnit: 'Gram',
    cookingTime: 15,
    cookingTimeUnit: 'Minute',
    tags: []
	};

	let defaultMenuIdSelected = $menuStore && $menuStore.length > 0 && $menuStore[0].id || 0;
	let menuIdSelected = $appStateStore.menuIdSelected || defaultMenuIdSelected;
	
	$: currentMenu = $menuStore.find((menuStore) => menuStore.id === menuIdSelected);

	let categoryIdSelected: string;

	onMount(() => {
		if ($appStateStore.menuIdSelected === undefined) {
			appStateStore.setMenuIdSelected(defaultMenuIdSelected.toString());
		}

		$localItemStore.id = new Date().getTime();
	});

	const onChangeCategory = (categoryId: string) => {
		categoryIdSelected = categoryId;
	}

	// TODO: replace data type with proper one later
	const onCreateMenuItem = async (event: { isUpdate: boolean, data: any }) => {
		const { data } = event;

		if (!categoryIdSelected ||  categoryIdSelected === '0') {
			toast.push('Please select category!');
			return;
		}

		const results = await graphqlClient.mutation(CreateMenuItemMutation, {
			"req": {
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
				categoryIds: [categoryIdSelected],
				tagIds: menuItem.tags && menuItem.tags.map((item: any) => item.id) || [], // TODO: Menu-Tags-create-update-listing-delete-UI
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
			$localItemStore.price === undefined ? ($localItemStore.price = 0) : null;
			$localItemStore.weight === undefined ? ($localItemStore.weight = 0) : null;
			
			// menuStore.saveNewItem();
			$localItemStore =  { ...data, id: results.data.menuItemCreate.item.id };
			goto('/items');
		}
	}
</script>

{#if showNewOptionModal}
	<div class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-30" />

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
	<Headline isEditedItem={false} onSubmit={onCreateMenuItem} />

	<div class=" px-4 py-8 w-full h-full gap-8 flex flex-col bg-surface-surface-3">
		<div class="flex flex-row gap-6 border-none">
			<div class="flex flex-col gap-8 grow">
				<div class="flex flex-col rounded-xl">
					<Status />
					<Description menu={data.menu} bind:menuItem={menuItem} onChangeCategory={onChangeCategory} />
				</div>
				<Options {handleOptionModal} {handleEditOptionModal} />
				<Extras />
			</div>
			<Tags />
		</div>
	</div>
</div>
