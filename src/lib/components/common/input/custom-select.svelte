<script lang="ts">
	import type { SelectItemType } from '$lib/types/common';
	import Select from 'svelte-select';
	export let className: string = '';
	export let itemArr: SelectItemType[] = [];
	export let label: string;
	export let value: string = '';
	export let disabled: boolean = false;
	export let error: any = undefined;

	const onChange = (e: any) => {
		console.log('custom-select#onChange: e.detail.value: ', e.detail.value);
		value = e.detail.value;
	};

	const onClear = () => {
		value = ''
	};
</script>

<div
	class="relative h-fit flex flex-col px-4 py-1 font-normal border rounded-lg border-on-surface-placeholder font-poppins {className}"
>
	<div class="text-xs text-on-surface-placeholder">{label}</div>
	<Select
		class="CustomSelect"
		items={itemArr}
		{value}
		{disabled}
		placeholder=""
		on:change={onChange}
		on:clear={onClear}
	/>
	{#if error?.length}
		<div class="absolute text-xs text-red-500 top-1 right-4 whitespace-nowrap">{error[0]}</div>
	{/if}
</div>

<style>
	:global(.CustomSelect) {
		padding: 0 !important;
		min-height: 1.5rem !important;
		border-radius: 0 !important;
	}
	:global(.CustomSelect .value-container) {
		padding: 0 !important;
		border-radius: 0 !important;
	}
</style>
