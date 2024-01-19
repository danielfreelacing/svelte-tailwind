<script lang="ts">
	/**
	 * INSTALL
	 * yarn add dayjs
	 *
	 * USAGE
	 * import DatePicker from './DatePicker.svelte'
	 * function datepicked (e) { console.log(e.detail.datepicked) }
	 *
	 * <DatePicker
	 *  on:datepicked={datepicked}
	 *  customclass=""                  (facultative) css class
	 * />
	 */

	import { createEventDispatcher, onMount } from 'svelte';
	import dayjs from 'dayjs';
	import 'dayjs/locale/fr';
	import Calendar from '$lib/icons/calendar.svg';

	// data
	const dispatch = createEventDispatcher();
	let elModal: HTMLDivElement; // HTMLElement
	/**
	 * @type {string}
	 */
	export let inputTxt: string; // string, défault date = now
	let isOpenCalendar = false; // true: show calendar
	const arrDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	const currentDay = +dayjs().format('D'); // 1..31
	const currentMonth = +dayjs().format('M'); // 1..12
	const currentYear = +dayjs().format('YYYY'); // 2021...
	let selectedMonth = +dayjs().format('M'); // 1..12
	let selectedYear = +dayjs().format('YYYY'); // 2021...
	let rows = initRows();

	// props
	export let placeholderText: string;
	// export let customclass = '';

	// reactivity, on inputTxt changes
	$: dispatch('datepicked', {
		datepicked: inputTxt
	});

	// life cycle
	onMount(() => {
		dayjs.locale('en'); // use locale
		inputTxt = inputTxt;
		// dayjs().format('YYYY-MM-DD'); // current day month year in input
		affecteRows();
	});

	// functions
	/**
	 * Click outside of the modal will close it
	 * @param e
	 */
	function handleClickModal(e) {
		if (e.target === elModal) {
			isOpenCalendar = false;
		}
	}

	function initRows() {
		return [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0]
		];
	}

	function affecteRows() {
		rows = initRows();
		const firstDayOfCurrentMonth = ucFirst(
			dayjs(selectedYear + '-' + selectedMonth)
				.startOf('month')
				.format('dd')
		); // 'Lu'
		const lastDayOfCurrentMonth = +dayjs(selectedYear + '-' + selectedMonth)
			.endOf('month')
			.format('D'); // 31
		let iRow = 0;
		let iCol = 0;
		let start = false;
		let cpt = 0;
		for (iRow = 0; iRow < 6; iRow++) {
			arrDays.forEach((daystr) => {
				if (cpt > lastDayOfCurrentMonth) {
					return;
				}
				if (!start && daystr === firstDayOfCurrentMonth) {
					cpt++;
					start = true;
				}
				rows[iRow][iCol] = cpt;
				iCol++;
				if (start) {
					cpt++;
				}
			});
			iCol = 0;
		}
	}

	function ucFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function previousMonth() {
		selectedMonth--;
		if (selectedMonth <= 0) {
			selectedMonth = 12;
			selectedYear--;
		}
		affecteRows();
	}

	function nextMonth() {
		selectedMonth++;
		if (selectedMonth > 12) {
			selectedMonth = 1;
			selectedYear++;
		}
		affecteRows();
	}

	function selectDate(y, m, d) {
		inputTxt = dayjs(y + '-' + m + '-' + d).format('YYYY/MM/DD');
		isOpenCalendar = false;
	}
</script>

{#if isOpenCalendar}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed z-40 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40"
		bind:this={elModal}
		on:click={handleClickModal}
		on:keydown={handleClickModal}
	>
		<div class="container mx-auto mt-[200px] max-w-sm w-full shadow-lg rounded-sm">
			<div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-sm">
				<div class="px-4 flex items-center justify-between">
					<!-- Month year -->
					<span class="focus:outline-none text-base font-bold text-gray-800"
						>{ucFirst(dayjs(selectedYear + '-' + selectedMonth).format('MMMM YYYY'))}</span
					>
					<div class="flex items-center">
						<!-- bnt previous -->
						<button on:click={previousMonth} aria-label="calendar backward" class="text-gray-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-left"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="15 6 9 12 15 18" />
							</svg>
						</button>
						<!-- bnt next -->
						<button on:click={nextMonth} aria-label="calendar forward" class="ml-3 text-gray-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-chevron-right"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>
				<div class="flex items-center justify-between pt-12 overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr>
								{#each arrDays as day}
									<th>
										<div class="w-full flex justify-center">
											<p class="text-base font-medium text-center text-gray-800">
												{day}
											</p>
										</div>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each rows as col}
								<tr>
									{#each col as i}
										<td class="pt-4">
											{#if i > 0}
												{#if i === currentDay && selectedMonth === currentMonth && selectedYear === currentYear}
													<button
														class=" cursor-pointer flex w-full justify-center rounded-sm hover:bg-button-primary-default hover:white text-base  items-center font-medium"
														on:click={() => {
															selectDate(selectedYear, selectedMonth, i);
														}}
													>
														<p class="px-2 py-2 w-full h-full text-base text-gray-500 hover:text-white font-medium">{i}</p>
										
													</button>
												{:else}
													<button
														class="cursor-pointer flex w-full justify-center rounded-sm hover:bg-button-primary-default hover:white"
														on:click={() => {
															selectDate(selectedYear, selectedMonth, i);
														}}
													>
														<p class=" px-2 py-2  w-full h-full text-base hover:text-white text-gray-500 font-medium ">
															{i}
														</p>
													</button>
												{/if}
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
{/if}

<button
	on:click={() => {
		isOpenCalendar = true;
	}}
	class="grow shrink basis-[199px] h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 flex"
>
	<div class="w-5 h-5 px-[1.67px] pt-[0.83px] pb-[2.50px] justify-center items-center flex">
		<img src={Calendar} alt="calendar icon" />
	</div>
	<!-- <div
    class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
>
    <div
        class="self-stretch h-4 text-zinc-500 text-base font-normal font-['Poppins'] leading-normal"
    >
        From
    </div>
</div> -->
	<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
		<input
			type="text"
			bind:value={inputTxt}
			placeholder={placeholderText}
			class=" w-[167px] self-stretch h-4 text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal cursor-pointer"
		/>
	</div>
</button>
