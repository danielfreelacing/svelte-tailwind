<script lang="ts">
	import { getContextClient } from '@urql/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import H4 from '$lib/components/typography/h4.svelte';
	import H1 from '$lib/components/typography/h1.svelte';
	import ExitBlack from '$lib/icons/exit_black.svg';
	import Watch from '$lib/icons/watch.svg';
	import DayButton from './dayButton.svelte';
	import menuStore from '$lib/stores/menustore';
	import DatePicker from '$lib/components/particles/date_picker.svelte';
	import TimePicker from '$lib/components/particles/time_picker.svelte';
	import appStateStore from '$lib/stores/appStateStore';
	import { CreateMenuMutation } from '$lib/schemas/items/mutations';

	export let closeModalFunction: () => void;

	const graphqlClient = getContextClient();
	const { placeList, addMenuForm } = $page.data;

	const { form, errors, constraints, enhance } = superForm(addMenuForm, {
		validationMethod: 'submit-only',
		defaultValidator: 'clear'
	});

	let cmpDatePicker;
	let localMenuItem: any = {
		name: '',
		categories: [],
		isSeasonal: true,
		seasonalFrom: '',
		seasonalTo: '',
		daysFilter: [false, false, false, false, false, false, false],
		isTimeLimited: true,
		timeFrom: '',
		timeTo: '',
		position: 0
	};
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	async function saveMenu() {
		const weekDays = localMenuItem.daysFilter
			.map((dayActive: boolean, index: number) => (dayActive ? daysOfWeek[index] : undefined))
			.filter((days: string|undefined) => days !== undefined)

		const results = await graphqlClient.mutation(CreateMenuMutation, {
			"req": {
				"placeId": placeList[$appStateStore.activeEstablishmentIndex].id,
				"name": localMenuItem.name,
				"position": localMenuItem.position,
				"availableFromDate": localMenuItem.isSeasonal ? localMenuItem.seasonalFrom : null,
				"availableTillDate": localMenuItem.isSeasonal ? localMenuItem.seasonalTo : null,
				"availableFromTime": localMenuItem.isTimeLimited ? localMenuItem.timeFrom : null,
				"availableTillTime": localMenuItem.isTimeLimited ? localMenuItem.timeTo : null,
				"availableOnWeekdays": weekDays
			}
		});

		if (!results.data) {
			// TODO: replace the error with API response
			toast.push('Unable to create a menu!');
		} else {
			menuStore.addMenu({ ...localMenuItem, id: results.data.menuCreate.menu.id });
			closeModalFunction();
		}

	}

	function datepickedFrom(e: CustomEvent) {
		localMenuItem.seasonalFrom = e.detail.datepicked;
	}

	function datepickedTo(e: CustomEvent) {
		localMenuItem.seasonalTo = e.detail.datepicked;
	}

</script>

<form
	method="post"
	use:enhance
	enctype="multipart/form-data"
>
	<div class="flex flex-row justify-center">
		<div
			class="absolute mx-auto w-[518px] h-[536px] p-6 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
		>
			<div class="self-stretch h-6 justify-between items-center inline-flex">
				<H1>Add menu</H1>
				<button on:click={closeModalFunction} class="w-6 h-6 justify-center items-center flex">
					<div class="w-6 h-6 relative">
						<img src={ExitBlack} alt="exit icon" />
					</div>
				</button>
			</div>
			<div class="self-stretch h-[352px] flex-col justify-start items-start gap-4 flex">
				<div class="self-stretch h-[352px] flex-col justify-start items-start gap-4 flex">
					<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
						<div
							class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
								{#if localMenuItem.name !== '' && localMenuItem.name !== undefined}
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
										bind:value={localMenuItem.name}
										name="name"
										aria-invalid={$errors.name ? 'true' : undefined}
										placeholder="Menu name"
										class=" w-full self-stretch {$errors.name
											? 'text-text-text-on-surface-accent'
											: 'text-zinc-900'} text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										{...$constraints.name}
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="justify-start items-center gap-2 inline-flex">
						<Switch bind:checked={localMenuItem.isSeasonal} />
						<H4>Make seasonal</H4>
					</div>
					{#if localMenuItem.isSeasonal}
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div class="self-stretch justify-start items-start gap-2 inline-flex">
								<DatePicker
									bind:this={cmpDatePicker}
									on:datepicked={datepickedFrom}
									placeholderText="From"
									inputTxt={localMenuItem.seasonalFrom}
								/>

								<DatePicker
									bind:this={cmpDatePicker}
									on:datepicked={datepickedTo}
									placeholderText="To"
									inputTxt={localMenuItem.seasonalTo}
								/>
							</div>
						</div>
					{/if}
					<div class="justify-start items-start gap-2 inline-flex">
						<DayButton dayText="Mo" bind:activated={localMenuItem.daysFilter[0]} />
						<DayButton dayText="Tu" bind:activated={localMenuItem.daysFilter[1]} />
						<DayButton dayText="We" bind:activated={localMenuItem.daysFilter[2]} />
						<DayButton dayText="Th" bind:activated={localMenuItem.daysFilter[3]} />
						<DayButton dayText="Fr" bind:activated={localMenuItem.daysFilter[4]} />
						<DayButton dayText="St" bind:activated={localMenuItem.daysFilter[5]} />
						<DayButton dayText="Su" bind:activated={localMenuItem.daysFilter[6]} />
					</div>
					<div class="justify-start items-center gap-2 inline-flex">
						<Switch bind:checked={localMenuItem.isTimeLimited} />
						<div class="text-zinc-900 text-sm font-semibold font-['Poppins'] leading-tight">
							Make time limited
						</div>
					</div>
					{#if localMenuItem.isTimeLimited}
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div class="self-stretch justify-start items-start gap-2 inline-flex">
								<div
									class="grow shrink basis-[199px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 flex"
								>
									<div class="w-5 h-5 p-[1.67px] justify-center items-center flex">
										<img src={Watch} alt="watch icon" />
									</div>
									<div
										class="grow shrink basis-0 flex-row justify-between items-start gap-4 inline-flex"
									>
										<TimePicker name="timeFrom" placeholder="From" bind:value={localMenuItem.timeFrom} />
									</div>
								</div>
								<div
									class="grow shrink basis-[199px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 flex"
								>
									<div class="w-5 h-5 p-[1.67px] justify-center items-center flex">
										<img src={Watch} alt="watch icon" />
									</div>
									<div
										class="grow shrink basis-0 flex-row justify-between items-start gap-4 inline-flex"
									>
										<TimePicker name="timeTo" placeholder="To" bind:value={localMenuItem.timeTo} />
									</div>
								</div>
							</div>
						</div>
					{/if}
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
					type="submit"
					on:click={saveMenu}
					class="px-10 py-3 {localMenuItem.name.length > 2
						? 'bg-button-primary-default'
						: 'bg-surface-surface-accent-subtle'} rounded-xl justify-center items-center gap-2 flex"
					disabled={localMenuItem.name.length > 2 && localMenuItem.name.length > 0 ? false : true}
				>
					<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
						Save
					</div>
				</button>
			</div>
		</div>
	</div>
</form>