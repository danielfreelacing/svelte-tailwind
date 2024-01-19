<script lang="ts">
	export let className: string = '';
	export let label: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
	export let error: any = undefined;
</script>

<div class="relative h-fit">
	<textarea
		class="text-base px-4 py-1 font-normal border rounded-lg border-on-surface-placeholder font-poppins grow
			{className}
			{disabled ? 'text-on-surface-secondary' : 'text-on-surface-primary'}"
		bind:value
		{disabled}
		placeholder={label}
	/>
	{#if error?.length}
		<div class="absolute top-0 text-xs text-red-500 -translate-y-full right-4">{error[0]}</div>
	{/if}
</div>
