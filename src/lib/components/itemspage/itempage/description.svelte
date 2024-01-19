<script lang="ts">
	import Upload from '$lib/icons/upload.svg';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import ArrowDown from '$lib/icons/arrow-down-s-line.svg';
	import appStateStore from '$lib/stores/appStateStore';
	import localItemStore from '$lib/stores/localItemStore';
	import type { CategoryType, MenuItemType, MenuType } from '$lib/components/itemspage/types.ts';
	import { onMount } from 'svelte';

	export let menu: MenuType
	export let menuItem: MenuItemType | null = null
	export let onChangeCategory: (id: string) => void

	let currentItem =  menuItem || {
    name: '',
    options: [],
    price: undefined,
    extras: [],
    isAvailable: true,
    description: '',
    weight: undefined,
    weightUnit: 'Gram',
    cookingTime: 15,
    cookingTimeUnit: 'Minute',
    tags: []
	};;

	let categoryComponentWidth = 0;
	let servingComponentWidth = 0;
	let unitComponentWidth = 0;
	let categories = menu && menu.categories as CategoryType[] || [];
	
	let belongsToCategoryIndex = categories.findIndex(category => category.id === $appStateStore.localItemBelongsToCategoryId) 
	$: category = categories[belongsToCategoryIndex]

	const servingTimeSelection = [1, 2, 5, 8, 10, 15, 20, 25, 30];
	const unitSelection = ['Kg', 'Gram'];

	function moveToNewCategory(categoryId: string, categoryIndex: number) {
		appStateStore.setLocalItemBelongsToCategoryId(categoryId);
		$localItemStore.extrasIds = [];

		belongsToCategoryIndex = categoryIndex;
		onChangeCategory(categoryId);
	}

	onMount(() => {
		if (belongsToCategoryIndex > -1) {
			onChangeCategory(categories[belongsToCategoryIndex].id);
		}
	})
</script>

<div class=" h-[338px] p-4 justify-start items-start gap-6 inline-flex bg-white">
	<div
		class="max-w-[203px] h-[203px] px-40 py-[68px] bg-stone-50 rounded-lg border-2 border-gray-200 flex-col justify-center items-center gap-4 inline-flex"
	>
		<div
			class="p-2 bg-red-600 bg-opacity-10 rounded-[70px] justify-start items-start gap-2.5 inline-flex"
		>
			<div class="w-6 h-6 relative">
				<img src={Upload} alt="upload icon" />
			</div>
		</div>
		<div class="w-44 h-14 flex-col justify-start items-center gap-1 flex">
			<div
				class="text-center font-semibold text-text-on-surface-primary text-sm font-['Poppins'] leading-none"
			>
				drag and drop a file or
				<span style="text-theme-red text-sm font-semibold font-['Poppins'] leading-none">
					click
				</span>
				to upload
			</div>
			<div class="text-center text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
				Maximum file size 3 Mb.
			</div>
		</div>
	</div>
	<div class="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
		<div class="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 py-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				bind:clientWidth={categoryComponentWidth}
			>
				<DropdownMenu.Root >
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
									{category ? `${category.name.charAt(0).toUpperCase()}${category.name.slice(1)}` : ''}
								</div>
							</div>

							<div class="w-6 h-6 justify-center items-center flex">
								<div class="w-6 h-6 relative">
									<img src={ArrowDown} alt="down arrow/ open dropdown" />
								</div>
							</div>
						</div></DropdownMenu.Trigger
					>
					<DropdownMenu.Content class="bg-white " style={`width: ${categoryComponentWidth}px;`}>
						<DropdownMenu.Group>
							{#each categories as category, categoryIndex}
								<DropdownMenu.Item>
									<button
										on:click|capture={() => moveToNewCategory(category.id, categoryIndex)}
										class="w-full h-8 hover:bg-surface-border rounded-xsm  text-left px-2 text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button
									></DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					{#if currentItem.name.length > 0}
						<div
							class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
						>
							Item name
						</div>
					{/if}
					<div class="w-full grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						<input
							type="text"
							bind:value={currentItem.name}
							placeholder="Item name"
							class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="self-stretch h-[90px] flex-col justify-start items-start gap-1 flex">
			<div
				class="w-full self-stretch h-[90px] px-4 py-2 bg-white rounded-xl border border-gray-200 justify-start items-start gap-5 inline-flex"
			>
				<div class="grow shrink basis-0 flex-row justify-start items-start gap-px inline-flex">
					<div
						class="grow shrink basis-0 pt-2 flex-col w-full justify-start items-start gap-px inline-flex"
					>
						{#if currentItem.description.length > 0}
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Descriptions
							</div>
						{/if}

						<textarea
							bind:value={currentItem.description}
							placeholder="Descriptions"
							class=" w-[690px] text-text-text-on-surface-primary text-xs font-normal font-['Poppins'] leading-tight"
							maxlength="100"
							style="overflow: hidden; resize: none;"
						/>
					</div>

					<div class="w-9 self-stretch justify-end items-start flex">
						<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
							{currentItem.description.length}/100
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-row w-full justify-between gap-4">
			<div
				class=" basis-[180.25px] self-stretch justify-start items-start gap-4 inline-flex"
				bind:clientWidth={servingComponentWidth}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="h-14 px-4 py-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
					>
						<div class="w-[112.25px] flex-col justify-start items-start inline-flex">
							<div class="self-stretch justify-start items-start gap-1 inline-flex">
								<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
									Serving time
								</div>
							</div>
							<div
								class="self-stretch text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							>
								{currentItem.cookingTime} min
							</div>
						</div>

						<div class="w-6 h-6 justify-center items-center flex">
							<div class="w-6 h-6 relative">
								<img src={ArrowDown} alt="down arrow/ open dropdown" />
							</div>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="bg-white " style={`width: ${servingComponentWidth}px;`}>
						<DropdownMenu.Group>
							{#each servingTimeSelection as servingtime}
								<DropdownMenu.Item
									><button
										on:click={() => (currentItem.cookingTime = servingtime)}
										class="w-full text-left px-2 h-8 hover:bg-surface-border rounded-xsm  text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										>{servingtime} min</button
									></DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<div
				class="basis-[180.25px] h-14 rounded-lg flex-col justify-start items-start gap-1 inline-flex"
				bind:clientWidth={unitComponentWidth}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class=" h-14 px-4 py-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
					>
						<div class="w-[112.25px] flex-col justify-start items-start inline-flex">
							<div class="self-stretch justify-start items-start gap-1 inline-flex">
								<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
									Units
								</div>
							</div>
							<div
								class="self-stretch text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							>
								{currentItem.weightUnit}
							</div>
						</div>

						<div class="w-6 h-6 justify-center items-center flex">
							<div class="w-6 h-6 relative">
								<img src={ArrowDown} alt="down arrow/ open dropdown" />
							</div>
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="bg-white" style={`width: ${unitComponentWidth}px;`}>
						<DropdownMenu.Group>
							{#each unitSelection as units}
								<DropdownMenu.Item
									><button
										on:click={() => (currentItem.weightUnit = units)}
										class="w-full text-left px-2 h-8 hover:bg-surface-border rounded-xsm  text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										>{units}</button
									></DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			{#key currentItem.weightUnit}
				<div class="basis-[184.25px] h-14 flex-col justify-start items-start gap-1 inline-flex">
					<div
						class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
					>
						<div
							class="w-[150px] grow shrink basis-0 flex-col justify-start items-start inline-flex"
						>
							{#if  currentItem.weight >= 0}
								<div
									class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
								>
									Weight
								</div>
							{/if}
							<div class=" flex flex-row w-full">
								<div class="shrink grow-0">
									<input
										type="number"
										bind:value={currentItem.weight}
										placeholder="Weight"
										class="{ currentItem.weight >= 0
											? 'w-[44px] text-center'
											: 'w-[150px] text-left'}  text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										maxlength="4"
									/>
								</div>
								{#if  currentItem.weight >= 0 && currentItem.weightUnit !== ''}
									<div
										class=" grow text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
									>
										<span />{currentItem.weightUnit}
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/key}
			<div class="basis-[184px] h-14 flex-col justify-start items-start gap-1 inline-flex">
				<div
					class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						{#if  currentItem.price >= 0}
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Price
							</div>
						{/if}
						<div class="self-stretch flex flex-row">
							{#if  currentItem.price >= 0}
								<span
									class="text-text-text-on-surface-secondary text-base font-normal font-['Poppins'] leading-normal"
									>$
								</span>
							{/if}
							<input
								type="number"
								bind:value={currentItem.price}
								placeholder={currentItem.price === undefined ? 'Price' : ''}
								class="self-stretch w-[150px] text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
