<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import  appStateStore  from '$lib/stores/appStateStore';
	import menuStore from '$lib/stores/menustore';
	import ExitBlack from '$lib/icons/exit_black.svg';
	import { DeleteMenuMutation } from '$lib/schemas/items/mutations';

	export let closeModalFunction: () => void;
	export let menuIdSelected: string;
	export let menuName: string;

	const graphqlClient = getContextClient();

	const { placeList } = $page.data;

	const handleMenuDelete = async () => {
		const result = await graphqlClient.mutation(DeleteMenuMutation, {
			"req": {
				"placeId": placeList[$appStateStore.activeEstablishmentIndex].id,
				"id": menuIdSelected
			}
		});

		if (result.data && result.data.menuDelete.isSuccess) {
			// TODO: replace the error with API response
			menuStore.deleteMenu(menuIdSelected);
			appStateStore.setMenuIdSelected($menuStore.find( menu => menu.id === $appStateStore.menuIdSelected)?.id || $menuStore[0].id)
			closeModalFunction()
		} else {
			toast.push('Unable to delete a menu!');
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] p-6 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
	>
		<div class="w-full h-14 flex-col justify-start items-start gap-2 inline-flex">
			<div class="w-full self-stretch h-6 justify-between items-center inline-flex">
				<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
					Delete menu
				</div>
				<button class="w-6 h-6 justify-center items-center flex" on:click={closeModalFunction}>
					<div class="w-6 h-6 relative">
						<img src={ExitBlack} alt="exit icon" />
					</div>
				</button>
			</div>

			<div class="text-zinc-900 mt-2 text-base font-normal font-['Poppins'] leading-normal">
				Are you sure you want to delete '{menuName.charAt(0).toUpperCase() + menuName.slice(1)}'?
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
				on:click={handleMenuDelete}
				class="px-10 py-3 bg-button-primary-default rounded-xl justify-center items-center gap-2 flex"
			>
				<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
					Delete
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
