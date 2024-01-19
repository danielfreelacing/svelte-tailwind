<script lang="ts">
	import ActionButton from '$lib/components/particles/action_button.svelte';
	import ButtonLabelBig from '$lib/components/typography/button_label_big.svelte';
	import type { ItemType, OptionsSetType } from '$lib/types/items';
	import OptionItem from './option/option_item.svelte';
	import Edit from '$lib/icons/edit.svg';
	import Can from '$lib/icons/can.svg';
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import menuStore from '$lib/stores/menustore';
	import localItemStore from '$lib/stores/localItemStore';

	export let handleOptionModal: () => void;
	export let handleEditOptionModal: () => void;

	// $: optionsSetsLocal = $localItemStore.options;

	function removeOption(optionId: number, optionSetId: number) {	
		let optionSetToEditIndexOf = $localItemStore.options.findIndex(
			(optionSetLocal) => optionSetLocal.id === optionSetId
		);

		$localItemStore.options[optionSetToEditIndexOf] = {
			...$localItemStore.options[optionSetToEditIndexOf],
			optionList: $localItemStore.options[optionSetToEditIndexOf].optionList.filter(
				(option) => option.id !== optionId
			)
		};

	}


	function deleteOptionSet(optionSetId: number) {
		$localItemStore.options = $localItemStore.options.filter(
				(optionSet) => optionSet.id !== optionSetId
			)	
	}
</script>

<div class="  flex-col justify-center items-start gap-4 inline-flex">
	<div class="self-stretch justify-start items-center gap-4 inline-flex">
		<div
			class="grow shrink basis-0 text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal"
		>
			Options
		</div>

		<ActionButton buttonText="Add option" onclickfunction={handleOptionModal} />
	</div>

	{#if $localItemStore.options.length > 0}
		{#each $localItemStore.options as optionsSetLocal}
			<div class="bg-white flex flex-col w-full rounded-xl">
				<div
					class="h-16 px-4 py-5 border-t border-gray-200 rounded-xl justify-start items-center gap-6 inline-flex"
				>
					<div class="grow shrink basis-0 h-6 justify-start items-center gap-4 flex">
						<div class="justify-start items-center gap-2 flex">
							<div class="w-9 h-6 relative">
								<Switch bind:checked={optionsSetLocal.active} />
							</div>
						</div>
						<div
							class="grow shrink basis-0 text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight"
						>
							{optionsSetLocal.name.charAt(0).toUpperCase() + optionsSetLocal.name.slice(1)}
						</div>
					</div>
					<div class="h-5 justify-end items-cen ter gap-4 flex">
						<button
							class="w-5 h-5 justify-center items-center flex"
							on:click={handleEditOptionModal}
						>
							<div class="w-5 h-5 relative">
								<img src={Edit} alt="" />
							</div>
						</button>
						<button
							class="w-5 h-5 justify-center items-center flex"
							on:click={() => deleteOptionSet(optionsSetLocal.id)}
						>
							<div class="w-5 h-5 relative">
								<img src={Can} alt="" />
							</div>
						</button>
					</div>
				</div>
				{#each optionsSetLocal.optionList as optionItem, i}
					<OptionItem {optionItem} {removeOption} optionsSetId={optionsSetLocal.id} />
				{/each}
			</div>
		{/each}
	{:else}
		<div
			class="self-stretch h-[72px] py-6 bg-white rounded-xl border border-gray-200 flex-col justify-center items-center flex"
		>
			<div class="text-center text-zinc-500 text-base font-normal font-['Poppins'] leading-normal">
				No options added yet
			</div>
		</div>
	{/if}
</div>
