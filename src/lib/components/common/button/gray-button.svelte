<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CustomButton from './custom-button.svelte';
	export let className: string = '';
	export let name: string;
	export let formaction: string | undefined = undefined;
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<CustomButton
	className="text-text-text-on-surface-primary bg-white border border-surface-border {className}"
	{name}
	{formaction}
	{onClick}
/>
