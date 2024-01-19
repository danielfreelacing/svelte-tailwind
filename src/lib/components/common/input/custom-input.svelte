<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	export let className: string = '';
	export let label: string = '';
	export let type: HTMLInputTypeAttribute | null | undefined = 'text';
	export let name: string = '';
	export let value: string | number = '';
	export let disabled: boolean = false;
	export let placeholder: string = '';
	export let error: any = undefined;
	export let constraints: any = {};

	const onInput = (e: any) => {
		if (type) {
			value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
		}
	};
</script>

<div
	class="relative h-fit flex flex-col px-4 py-1 font-normal border rounded-lg border-on-surface-placeholder font-poppins {className}"
>
	<div class="text-xs text-on-surface-placeholder">{label}</div>
	<input
		class="text-base w-full {disabled ? 'text-on-surface-secondary' : 'text-on-surface-primary'}"
		{type}
		{name}
		{value}
		{disabled}
		{placeholder}
		aria-invalid={error?.length ? 'true' : undefined}
		{...constraints}
		on:input={onInput}
	/>
	{#if error?.length}
		<div class="absolute text-xs text-red-500 top-1 right-4 whitespace-nowrap">{error[0]}</div>
	{/if}
	<div />
</div>
