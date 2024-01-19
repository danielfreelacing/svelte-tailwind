<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import { CreateCategoryMutation } from '$lib/schemas/items/mutations';
	import ExitBlack from '$lib/icons/exit_black.svg';
	import { page } from '$app/stores';
	import type { CategoryType } from '../types';
	import { handleError } from '$lib/utilities/errorHandlers';

	export let newCategoryName;
	export let errors;
	export let constraints;
	export let form;
	export let formRef: HTMLFormElement

	export let closeModalFunction: () => void;

	const graphqlClient = getContextClient();

	const { placeList } = $page.data;

	let categoryName: string = '';
	$: categoryNameLocal = categoryName;
	$: newCategoryName = categoryName;

	async function saveMenu() {
		const params = {
			menuId: $appStateStore.menuIdSelected?.toString(),
			placeId: placeList[$appStateStore.activeEstablishmentIndex].id,
			name: categoryName,
			position: 0,
			isAvailable: true,
			items: [],
			extras: [],
		};

		const results = await graphqlClient.mutation(CreateCategoryMutation, {
			"req": {
				menuId: $appStateStore.menuIdSelected,
				placeId: placeList[$appStateStore.activeEstablishmentIndex].id,
				name: categoryName,
				position: 0,
				isAvailable: true
			}
		});

		if (!results.data) {
			// TODO: replace the error with API response
			handleError(results.error?.graphQLErrors);
		} else {
			menuStore.addCategory({...params, id:results.data.categoryCreate.category.id} as CategoryType);
			closeModalFunction();
			formRef.requestSubmit();
		}

		
	}
</script>

<div class="h-full flex flex-row bg-whites justify-center">
	<div
		class="w-[518px] h-60 p-6 m-auto bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
	>
		<div class="self-stretch h-6 justify-between items-center inline-flex">
			<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
				Add category
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
						{#if $form.name !== '' && $form.name !== undefined}
							<div class="flex flex-row justify-between w-full">
								<div
									class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
								>
									Establishment Name
								</div>
								{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
							</div>
						{/if}

						<div class="w-full">
							<input
								type="text"
								bind:value={categoryName}
								placeholder="Category name"
								name="name"
								aria-invalid={$errors.name ? 'true' : undefined}
								class=" w-full h-[54px] {$errors.name
									? 'text-text-text-on-surface-accent'
									: 'text-zinc-900'}  self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								{...$constraints.name}
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
				on:click={saveMenu}
				class="px-10 py-3 {categoryNameLocal.length > 2
					? 'bg-button-primary-default'
					: 'bg-surface-surface-accent-subtle'} rounded-xl justify-center items-center gap-2 flex"
				disabled={categoryNameLocal.length > 2 ? false : true}
				type="submit"
			>
				<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
					Save
				</div>
			</button>
		</div>
	</div>
</div>
