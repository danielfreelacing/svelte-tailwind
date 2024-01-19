<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import { UpdateCategoryMutation } from '$lib/schemas/items/mutations';
	import ExitBlack from '$lib/icons/exit_black.svg';
	import type { CategoryType } from '$lib/types/items';

	export let closeModalFunction: () => void;
	export let categoryIdSelected: string;
	export let category: CategoryType | undefined;

	const { placeList } = $page.data;

	const graphqlClient = getContextClient();

	let categoryName: string = category && category.name || '';
	$: categoryNameLocal = categoryName;

	const handleCategoryEdit = async () => {
		const results = await graphqlClient.mutation(UpdateCategoryMutation, {
			"req": {
				id: categoryIdSelected,
				name: categoryNameLocal,
				menuId: category?.menuId,
				placeId: placeList[$appStateStore.activeEstablishmentIndex].id,
				position: category?.position,
				isAvailable: category?.isAvailable
			}
		});

		if (!results.data) {
			// TODO: replace the error with API response
			toast.push('Unable to update a category!');
		} else {
			menuStore.editCategory(categoryIdSelected, categoryNameLocal);
			closeModalFunction()
		}
	};

	$: console.log('category ', category, categoryIdSelected)
</script>

<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] h-60 p-6 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
	>
		<div class="self-stretch h-6 justify-between items-center inline-flex">
			<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
				Edit category
			</div>
			<button class="w-6 h-6 justify-center items-center flex" on:click={closeModalFunction}>
				<div class="w-6 h-6 relative">
					<img src={ExitBlack} alt="exit icon" />
				</div>
			</button>
		</div>
		<div class="self-stretch h-14 flex-col justify-start items-start gap-4 flex">
			<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
				<div
					class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						<div class="w-full">
							<input
								type="text"
								bind:value={categoryNameLocal}
								placeholder="New name"
								class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="self-stretch justify-end items-start gap-4 inline-flex">
			<button
				on:click={closeModalFunction}
				class="px-10 py-3 bg-white rounded-xl border border-gray-200 justify-center items-center gap-2 flex"
			>
				<div
					class="text-center text-zinc-900 text-base font-semibold font-['Poppins'] leading-normal"
				>
					Cancel
				</div>
			</button>
			<button
				on:click={handleCategoryEdit}
				class="px-10 py-3 {categoryNameLocal.length > 2
					? 'bg-button-primary-default'
					: 'bg-surface-surface-accent-subtle'} rounded-xl justify-center items-center gap-2 flex"
				disabled={categoryNameLocal.length > 2 ? false : true}
			>
				<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
					Save
				</div>
			</button>
		</div>
	</div>
</div>

<!-- 
<style lang="postcss">
    :global(html) {
      background-color: theme(colors.surface-surface-3);
    }
    </style> -->
