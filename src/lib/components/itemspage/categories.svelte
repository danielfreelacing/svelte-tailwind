<script lang="ts">
	import ActionButton from '../particles/action_button.svelte';
	import ActionButtonHollow from '../particles/action_button_hollow.svelte';
	import Category from './category.svelte';
	import Watch from '$lib/icons/watch.svg';
	import ArrowDown from '$lib/icons/arrow-down-s-line.svg';
	import type { CategoryType, MenuType } from '$lib/types/items';
	import { category_item_init, menu_item_init } from '$lib/stores/menustore';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import AddCategoryModal from './modals/add_category.svelte';
	import { onMount } from 'svelte';
	import * as DropdownMenu from '../shadcn/ui/dropdown-menu';
	import SortableList from '../particles/sortableList.svelte';
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	const { form, errors, constraints, enhance } = superForm($page.data.addCategoryForm, {
		validationMethod: 'oninput',
		defaultValidator: 'clear'
	});

	let defaultMenuIdSelected = $menuStore && $menuStore.length > 0 && $menuStore[0] && $menuStore[0].id || '0';
	let categoryComponentWidth = 0;
	let newCategoryName: string;
	let formRef: HTMLFormElement;

	$: menuIdSelected = $appStateStore.menuIdSelected || defaultMenuIdSelected;
	$: menu = $menuStore.find((menuStore) => menuStore.id === menuIdSelected) as MenuType;
	$: showAddCategoryModal = false;

	onMount(() => {
		if ($appStateStore.categoryIdSelected === undefined || 0) {
			appStateStore.setCategoryIdSelected(
				$menuStore
				&& $menuStore.length > 0
				&& $menuStore[0]?.categories
				&& $menuStore[0]?.categories.length > 0
				&& $menuStore[0].categories[0].id
			);
		}
	});

	function handleClick(id: CategoryType['id']) {
		appStateStore.setCategoryIdSelected(id);
	}

	$: categories = menu?.categories as CategoryType[];

	$: categoryMobile =
		categories?.find((category) => category.id === $appStateStore.categoryIdSelected) ||
		categories?.length > 0
			? categories[0]
			: category_item_init;

	function handleSort(e) {
		console.log('in sort function', e.detail);
		menu.categories = e.detail;
	}

	const arrDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

	$: hasDayFilter = menu && menu.daysFilter?.some((day) => day === true);
	$: dayFilterStrings =
		(hasDayFilter &&
			menu.daysFilter
				.map((dayActive, index) => {
					if (dayActive) {
						return arrDays[index];
					} else {
						return undefined;
					}
				})
				.filter((entry) => entry !== undefined)) ||
		[];
</script>

<div class="min-w-[343px] flex-col justify-start items-start gap-4 inline-flex">
	<form
		method="post"
		bind:this={formRef}
		use:enhance
		action="items?/addCategory"
		enctype="multipart/form-data"
	>
		<input
			type="hidden"
			id="customId"
			name="placeId"
			value={$page.data.placeList[$appStateStore.activeEstablishmentIndex].id}
		/>
	
		<input
			type="hidden"
			id="customId1"
			name="menuId"
			value={menuIdSelected}
		/>
	
		<input type="hidden" id="customId2" name="position" value={$page.data.placeList.length} />
		<input type="hidden" id="customId3" name="name" value={newCategoryName} />
		{#if showAddCategoryModal}
			<div
				class="absolute bg-text-text-on-surface-primary w-full h-full top-0 b-0 opacity-70 z-10 left-0"
			>
				<AddCategoryModal
					closeModalFunction={() => (showAddCategoryModal = false)}
					bind:newCategoryName
					{errors}
					{constraints}
					{form}
					{formRef}
				/>
			</div>
		{/if}
	</form>

	{#if menu?.isSeasonal || hasDayFilter || menu?.isTimeLimited}
		<div class="justify-start items-center gap-2 inline-flex w-full">
			<div class="w-5 h-5 justify-center items-center flex">
				<div class="w-5 h-5 relative">
					<img src={Watch} alt="add item" />
				</div>
			</div>

			<div class="flex flex-row basis-0 grow shrink flex-wrap">
				{#if menu?.isSeasonal && menu?.seasonalFrom !== '' && menu?.seasonalTo !== ''}
					<div
						class="text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal flex-nowrap text-center"
					>
						{dayjs(menu?.seasonalFrom).format('D MMM')} - {dayjs(menu?.seasonalTo).format(
							'D MMM'
						)}{#if hasDayFilter},&nbsp{:else if menu?.isTimeLimited && menu?.timeFrom !== '' && menu?.timeTo !== ''},&nbsp{/if}
					</div>
				{/if}
				{#if hasDayFilter}
					<div
						class="text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal flex-nowrap text-center"
					>
						{dayFilterStrings.join(
							' - '
						)}{#if menu?.isTimeLimited && menu?.timeFrom !== '' && menu?.timeTo !== ''},&nbsp{/if}
					</div>
				{/if}
				{#if menu?.isTimeLimited && menu?.timeFrom !== '' && menu?.timeTo !== ''}
					<div
						class="text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal flex-nowrap text-center"
					>
						{menu?.timeFrom} - {menu?.timeTo}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div
		class=" w-full sm: bg-white rounded-lg border border-gray-200 flex-col justify-start items-start flex"
	>
		<div class="hidden sm:inline-flex self-stretch p-4 justify-between items-center">
			<div class="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
				Categories
			</div>
			<ActionButton
				buttonText="Add category"
				onclickfunction={() => (showAddCategoryModal = !showAddCategoryModal)}
			/>
		</div>
		<div class=" sm:hidden w-[343px]">
			<div
				class="self-stretch h-14 px-4 py-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				bind:clientWidth={categoryComponentWidth}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="w-full">
						<div class="w-full basis-0 flex-row justify-between items-center inline-flex">
							<div class="flex flex-col w-full justify-between">
								<div class="self-stretch justify-start items-start gap-1 inline-flex">
									<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
										Category
									</div>
								</div>
								<div
									class="self-stretch text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								>
									{categoryMobile.name?.charAt(0).toUpperCase() + categoryMobile.name?.slice(1)}
								</div>
							</div>

							<div class="w-6 h-6 justify-center items-center flex">
								<div class="w-6 h-6 relative">
									<img src={ArrowDown} alt="down arrow/ open dropdown" />
								</div>
							</div>
						</div></DropdownMenu.Trigger
					>
					<DropdownMenu.Content
						class="bg-white  w-[343px] rounded-none z-10 bg-surface-surface-3 p-0"
						style={`width: ${categoryComponentWidth}px;`}
					>
						<DropdownMenu.Group>
							{#each categories as category}
								<DropdownMenu.Item>
									<button
										on:click|capture={() =>
											(categoryMobile =
												categories.find((thiscategory) => thiscategory.id === category.id) ||
												categories[0])}
										class="w-full h-8 hover:bg-surface-border rounded-xsm text-left px-2 text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button
									></DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					class="w-full self-stretch h-14 px-4 bg-white rounded-xl border border-blue-800 justify-start items-center gap-3 inline-flex"
				>
					<div class="w-full flex-row justify-between items-center inline-flex">
						<div class="flex flex-col w-full justify-between">
							<div class="self-stretch justify-start items-start gap-1 inline-flex">
								<div
									class="text-text-text-on-surface-primary text-xs font-normal font-['Poppins'] leading-tight"
								>
									Categories
								</div>
							</div>
							<div
								class="self-stretch text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							>
								Soups
							</div>
						</div>

						<div class="w-6 h-6 justify-center items-center flex">
							<div class="w-6 h-6 relative">
								<img src={ArrowDown} alt="down arrow/ open dropdown" />
							</div>
						</div>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content class=" w-[343px] rounded-none z-10 bg-surface-surface-3 p-0">
					<DropdownMenu.Group class="w-full ">
						{#each categories as category}
							<div class="flex flex-col lex-col gap-[2px]">
								<DropdownMenu.Item
									class="rounded-none text-base font-['Poppins'] h-[50px] mb-[2px] bg-white"
									>{category.name.charAt(0).toUpperCase() +
										category.name.slice(1)}</DropdownMenu.Item
								>
							</div>
						{/each}
						<DropdownMenu.Item class="bg-white rounded-none">
							<ActionButtonHollow
								buttonText="Add category"
								onclickfunction={() => (showAddCategoryModal = !showAddCategoryModal)}
								textColorTailwind={'text-text-text-on-surface-accent'}
								iconColor="red"
							/>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<div class="hidden sm:flex self-stretch flex-col justify-start items-start mt-2">
			<SortableList
				list={categories}
				on:sort={handleSort}
				let:item
				let:index
				directionRow={false}
				listClasses={'h-[48px]'}
				itemNamePlural="categories"
			>
				<!-- {#each categories as category, i} -->
				<button class="w-full" on:click={() => handleClick(item.id)}>
					<Category
						category={item}
						selected={$appStateStore.categoryIdSelected === item.id ? true : false}
					/>
				</button>
				<!-- {/each} -->
			</SortableList>
		</div>
	</div>
</div>
