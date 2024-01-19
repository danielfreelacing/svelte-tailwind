<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import  appStateStore  from '$lib/stores/appStateStore';
	import menuStore from '$lib/stores/menustore';
	import ExitBlack from '$lib/icons/exit_black.svg';
	import { DeleteCategoryMutation } from '$lib/schemas/items/mutations';


	export let closeModalFunction: () => void;
	export let itemIdSelected: string;
	export let itemName: string;

	const graphqlClient = getContextClient();

	const { placeList } = $page.data;

	const handleCategoryDelete = () => {
		// const result = await graphqlClient.mutation(DeleteCategoryMutation, {
		// 	"req": {
		// 		"placeId": placeList[$appStateStore.activeEstablishmentIndex].id,
		// 		"id": categoryIdSelected,
		// 		"menuId": $appStateStore.menuIdSelected,
		// 	}
		// });

		// if (result.data && result.data.categoryDelete?.isSuccess) {
		// 	// TODO: replace the error with API response
		// 	menuStore.deleteItem(itemIdSelected);
		// 	closeModalFunction()
		// } else {
		// 	toast.push('Unable to delete a menu!');
		// }
	};
</script>

<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] p-6 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
	>
		<div class="w-[423px] h-14 flex-col justify-start items-start gap-2 inline-flex">
			<div class="self-stretch h-6 justify-between items-center inline-flex">
				<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
					Delete item?
				</div>
				<button class="w-6 h-6 justify-center items-center flex" on:click={closeModalFunction}>
					<div class="w-6 h-6 relative">
						<img src={ExitBlack} alt="exit icon" />
					</div>
				</button>
			</div>

			<div class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
				Are you sure you want to delete {itemName.charAt(0).toUpperCase() + itemName.slice(1)}?
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
				on:click={handleCategoryDelete}
				class="px-10 py-3 bg-button-primary-default rounded-xl justify-center items-center gap-2 flex"
			>
				<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
					Delete
				</div>
			</button>
		</div>
	</div>
</div>
