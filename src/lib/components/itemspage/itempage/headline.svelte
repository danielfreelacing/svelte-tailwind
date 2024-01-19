<script lang="ts">
	import { goto } from '$app/navigation';
	import { localInitItem } from '$lib/stores/localItemStore';
	import ArrowLeft from '$lib/icons/arrow_left.svg';

	export let isEditedItem: boolean;
	export let onSubmit: (params: { isUpdate: boolean, data: any }) => void; // TODO: replace data type with proper one later

	function handleSaveItem() {
		onSubmit({
			isUpdate: isEditedItem,
			data: localInitItem
		});
	}
</script>

<div
	class="h-16 px-4 py-2 bg-stone-50 border-b border-gray-200 justify-between items-center inline-flex"
>
	<button
		class="rounded-[999px] justify-center items-center gap-2 flex"
		on:click={() => goto('/items')}
	>
		<div class="w-6 h-6 justify-center items-center flex">
			<div class="w-6 h-6 relative">
				<img src={ArrowLeft} alt="back arrow" />
			</div>
		</div>
		<div class="text-center text-zinc-500 text-base font-semibold font-['Poppins'] leading-normal">
			Back
		</div>
	</button>
	<div class="justify-end items-start gap-4 flex">
		<button
			class="px-10 py-3 bg-white rounded-xl border border-gray-200 justify-center items-center gap-2 flex"
			on:click={() => goto('/items')}
		>
			<div
				class="text-center text-zinc-900 text-base font-semibold font-['Poppins'] leading-normal"
			>
				Cancel
			</div>
		</button>
		<button
			class="px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 flex"
			on:click={handleSaveItem}
		>
			<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
				{isEditedItem ? 'Update' :  'Save'}
			</div>
		</button>
	</div>
</div>
