<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DragnDrop from '$lib/icons/icon_drag_drop.svg';
	import ExtraItem from './extra/extra_item.svelte';
	import ActionButton from '$lib/components/particles/action_button.svelte';
	import type { CategoryType, ExtrasType, ItemType } from '../types';
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import localItemStore from '$lib/stores/localItemStore';
	import DeleteExtraModal from '../modals/delete_extra_item.svelte';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import { CreateMenuExtraMutation, DeleteMenuExtraMutation } from '$lib/schemas/items/mutations';
	import { handleError } from '$lib/utilities/errorHandlers';

	const graphqlClient = getContextClient();
	const { params, data } = $page;

	$: currentMenu = $menuStore.findIndex((menu) => menu.id === $appStateStore.menuIdSelected)
	$: category =
		$menuStore[currentMenu]?.categories.find((item) => item.id === $appStateStore.localItemBelongsToCategoryId)
		|| $menuStore[currentMenu]?.categories[0]
		|| $menuStore && $menuStore.length > 0 && $menuStore[0]!.categories[0]
		|| undefined;

	let showExtraInsert = false;
	let showDeleteExtraModal = false;

	$: extraSelected = false;
	$: extraName = '';
	$: extraPrice = 0;
	$: extraId = 0


	function handleExtraInsert() {
		showExtraInsert = !showExtraInsert;
	}

	async function addExtra() {
		if (!params.itemId) {
			handleError(null, 'Please create a menu item first and then create extra item');
			return;
		}

		const req = {
			name: extraName,
			price: extraPrice,
			isAvailable: extraSelected,
		}

		const results = await graphqlClient.mutation(CreateMenuExtraMutation, {
			req: {
				...req,
				menuId: params.menuId
			}
		});

		if (!results.data) {
			handleError(results.error?.graphQLErrors);
		} else {
			menuStore.addExtraToCategory(
				params.itemId,
				{ ...req, id: results.data.menuExtraCreate.menuExtra.id }
			);

			$localItemStore.extrasIds = $localItemStore.extrasIds.concat(extraId);
			showExtraInsert = false;

			extraName = '';
			extraPrice = 0;
			extraSelected = false;	
		}
	}

	async function handleExtraDelete(event: { detail: { id: any; name: any } }) {
		const results = await graphqlClient.mutation(DeleteMenuExtraMutation, {
			req: {
				id: event.detail.id,
				menuId: params.menuId
			}
		});

		if (!results.data) {
			handleError(results.error?.graphQLErrors);
		} else {
			menuStore.deleteExtraFromCategory(
				params.itemId,
				results.data.menuExtraCreate.menuExtra.id
			);

			extraId = event.detail.id;
			showDeleteExtraModal = true;
			extraName = event.detail.name;
		}
	}
</script>

{#if showDeleteExtraModal && category !== undefined}
	<div
		class="absolute bg-text-text-on-surface-primary w-full h-full top-0 opacity-70 z-10 left-0"
	/>

	<div class="mx-auto w-full absolute left-0">
		<DeleteExtraModal
			closeModalFunction={() => (showDeleteExtraModal = false)}
			categoryIdSelected={category.id}
			{extraName}
			{extraId}
		/>
	</div>
{/if}
<div class=" flex-col justify-center items-start gap-4 inline-flex">
	<div class="self-stretch justify-between items-center inline-flex">
		<div
			class="text-text-text-on-surface-primary text-2xl font-semibold font-['Poppins'] leading-normal"
		>
			Category’s Extras
		</div>
		<ActionButton
			buttonText="Add extra"
			onclickfunction={handleExtraInsert}
			disabled={showExtraInsert === true}
		/>
	</div>
	<div
		class="self-stretch bg-white rounded-xl border border-gray-200 flex-col justify-start items-start flex"
	>
		{#if showExtraInsert}
			<div
				class="self-stretch px-4 py-3 border-t border-gray-200 justify-start items-center gap-4 inline-flex"
			>
				<div class="grow shrink basis-0 h-10 justify-start items-center gap-4 flex">
					<div class="justify-start items-center gap-2 flex">
						<div class="w-6 h-6 relative">
							<img src={DragnDrop} alt="" />
						</div>
						<div class="w-9 h-6 relative">
							<Switch bind:checked={extraSelected} />
						</div>
					</div>
					<div
						class="grow shrink basis-[448px] flex-col justify-start items-start gap-1 inline-flex"
					>
						<div
							class="w-full p-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								<input
									type="text"
									bind:value={extraName}
									placeholder="Name"
									class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								/>
							</div>
						</div>
					</div>
					<div class="w-[200px] flex-col justify-start items-start gap-1 inline-flex">
						<div
							class="self-stretch p-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								<div class="self-stretch flex flex-row">
									<span
										class="text-text-text-on-surface-secondary text-base font-normal font-['Poppins'] leading-normal"
										>$
									</span>
									<input
										type="number"
										bind:value={extraPrice}
										class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-[248px] justify-center items-start gap-2 flex">
					<button
						class="w-[120px] h-8 px-3 py-2 bg-red-600 rounded-xl justify-center items-center gap-1 flex"
						on:click={addExtra}
					>
						<div class="text-center text-white text-sm font-semibold font-['Poppins'] leading-none">
							Save
						</div>
					</button>
					<div
						class="w-[120px] h-8 px-3 py-2 bg-white rounded-xl border border-gray-200 justify-center items-center gap-1 flex"
					>
						<div
							class="text-center text-text-text-on-surface-primary text-sm font-semibold font-['Poppins'] leading-none"
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		{/if}
		<!-- TODO: revert it later -->
		<!-- {#if category != null || category != undefined}
			{#key category}
				{#each category.extras as extraItem}
					<ExtraItem {extraItem} {removeExtra} isIncluded={extrasLocal.find( (extraId) => extraId === extraItem.id )} handleToggle={() => handleToggleActive(extraItem.id)}/>
					<ExtraItem
						{extraItem}
						on:removeExtra={handleExtraDelete}
					/>
				{/each}
			{/key}
		{/if} -->
	</div>
</div>
