<script lang="ts">
	import AddPlus from '$lib/icons/add_plus.svg';
	import type { OptionsSetType } from '$lib/types/items';
	// import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	// import H4 from '$lib/components/typography/h4.svelte';
	// import H1 from '$lib/components/typography/h1.svelte';
	// import ExitBlack from '$lib/icons/exit_black.svg';
	// import Watch from '$lib/icons/watch.svg';
	// import DayButton from './dayButton.svelte';
	import menuStore from '$lib/stores/menustore';
	import OptionItemNew from './new_option_item.svelte';
	import { Edit } from 'lucide-svelte';
	import EditOptionItem from './edit_option.svelte';
	// const daysOfWeekToggle = [false, false, false, false, false, false, false];

	// import DatePicker from '$lib/components/particles/date_picker.svelte';
	// import TimePicker from '$lib/components/particles/time_picker.svelte';
	// let cmpDatePicker;

	export let closeModalFunction: () => void;

	let optionSetName: string = '';
	$: optionSetNameLocal = optionSetName;

	const optionSet: OptionsSetType = {
		id: 1,
		name: '',
		active: true,
		optionList: [
			// { id: 1, name: 'sauce', price: 0.99, active: true },
			// { id: 2, name: 'extra cheese', price: 1.25, active: true }
		]
	};

	$: localOptionSet = optionSet;

	// function saveMenu() {
	// 	menuStore.addOptionSet({ id: 1234, name: optionSetNameLocal, options: [], active: false });
	// 	closeModalFunction();
	// }

	function handleAddOption() {
		localOptionSet = {
			...localOptionSet,
			optionList: localOptionSet.optionList.concat({ id: 123, name: '', price: 0, active: false })
		};
	}

	function handleRemoveOption(id: number) {
		localOptionSet.optionList = localOptionSet.optionList.filter((option) => option.id !== id);

		console.log('EWRWE', localOptionSet.name.length > 2, localOptionSet.optionList.length > 0);
	}
</script>

<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] top-[200px] bg-white rounded-xl border border-gray-200 flex-col justify-start items-start flex z-40"
	>

		<div class="self-stretch p-6 bg-white justify-between items-center inline-flex rounded-xl">
			<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
				Edit option
			</div>
			<div class="w-6 h-6 justify-center items-center flex">
				<div class="w-6 h-6 relative" />
			</div>
		</div>

		<div
			class="overflow-y-scroll right-0 self-stretch px-6 pt-6 pb-10 flex-col justify-start items-start gap-6 flex "
		>
			<div class="self-stretch flex-col justify-start items-start gap-4 flex">
				<div class=" h-14 flex-col justify-start items-start gap-1 inline-flex">
					<div
						class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
					>
						<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
							<div
								class="self-stretch h-4 text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Option set name
							</div>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								<input
									type="text"
									bind:value={localOptionSet.name}
									placeholder=""
									class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								/>
							</div>
						</div>
					</div>
				</div>

				{#each localOptionSet.optionList as optionItem, i}
					<EditOptionItem optionIndex={i} localOption={optionItem} {handleRemoveOption} />
				{/each}
			</div>

			<div class="w-[111px] rounded-[999px] justify-center items-center gap-2 flex">
				<div class="w-6 h-6 justify-center items-center flex">
					<div class="w-6 h-6 relative">
						<img src={AddPlus} alt="add plus icon" />
					</div>
				</div>
				<button
					class="text-center text-blue-800 text-sm font-semibold font-['Poppins'] leading-normal"
					on:click={handleAddOption}
				>
					Add option
				</button>
			</div>
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
					on:click={() => closeModalFunction()}
					class="px-10 py-3 {localOptionSet.name.length > 2
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
