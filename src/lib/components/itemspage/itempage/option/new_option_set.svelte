<script lang="ts">
	import AddPlus from '$lib/icons/add_plus.svg';
	import type { OptionsSetType } from '$lib/types/items';
	import localItemStore from '$lib/stores/localItemStore';
	import OptionItemNew from './new_option_item.svelte';

	export let closeModalFunction: () => void;

	console.log(' testing', $localItemStore.options, $localItemStore.options.length);

	const optionSet: OptionsSetType = {
		id: $localItemStore.options[$localItemStore.options.length - 1].id + 1 || 1,
		name: '',
		active: true,
		optionList: []
	};

	$: localOptionSet = optionSet;

	function handleSaveMenu() {
		$localItemStore.options = $localItemStore.options.concat(localOptionSet);
		closeModalFunction();
	}

	function handleAddOption() {
		localOptionSet = {
			...localOptionSet,
			optionList: localOptionSet.optionList.concat({ id: 123, name: '', price: null, active: true })
		};
	}

	function handleRemoveOption(id: number) {
		localOptionSet.optionList = localOptionSet.optionList.filter((option) => option.id !== id);
	}

	const styles = {
		position: 'fixed',
		overflow: 'hidden'
	};
</script>

<!-- <svelte:body use:classList={classes}  /> -->


<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] top-[200px] bg-white rounded-xl border border-gray-200 flex-col justify-start items-start flex z-40"
	>
		<div class="self-stretch p-6 bg-white justify-between items-center inline-flex rounded-xl">
			<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
				New option
			</div>
			<div class="w-6 h-6 justify-center items-center flex">
				<div class="w-6 h-6 relative" />
			</div>
		</div>
		<div class="self-stretch px-6 pt-6 pb-10 flex-col justify-start items-start gap-6 flex">
			<div class="self-stretch h-14 flex-col justify-start items-start gap-4 flex">
				<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
					<div
						class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
					>
						<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
							<input
								type="text"
								bind:value={localOptionSet.name}
								placeholder="Option set name"
								class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
							/>
						</div>
					</div>
				</div>
			</div>
			{#each localOptionSet.optionList as optionItem, i}
				<OptionItemNew optionIndex={i} localOption={optionItem} {handleRemoveOption} />
			{/each}
			<button
				class="w-[111px] rounded-[999px] justify-center items-center gap-2 flex"
				on:click={handleAddOption}
			>
				<div class="w-6 h-6 justify-center items-center flex">
					<div class="w-6 h-6 relative">
						<img src={AddPlus} alt="add plus icon" />
					</div>
				</div>
				<div
					class="text-center text-blue-800 text-sm font-semibold font-['Poppins'] leading-normal"
				>
					Add option
				</div>
			</button>
		</div>
		<div
			class="self-stretch p-6 bg-white border-t border-gray-200 justify-end items-start gap-4 inline-flex rounded"
		>
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
					on:click={() => handleSaveMenu()}
					class="px-10 py-3 {localOptionSet.name.length > 2 && localOptionSet.optionList.length > 0
						? 'bg-button-primary-default'
						: 'bg-surface-surface-accent-subtle'} rounded-xl justify-center items-center gap-2 flex"
					disabled={localOptionSet.name.length > 2 && localOptionSet.optionList.length > 0
						? false
						: true}
				>
					<div
						class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal"
					>
						Save
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
