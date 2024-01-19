<script lang="ts">
	import Toggle from 'svelte-switcher';
	export let className: string = '';
	export let label: string;
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let error: any = undefined;
</script>

<div class="flex h-fit gap-4 font-semibold font-poppins items-center {className}">
	<Toggle ariaLabel={label} bind:checked {disabled} />
	<div>{label}</div>
	{#if error?.length}
		<div class="text-xs text-red-500 whitespace-nowrap">{error[0]}</div>
	{/if}
</div>
