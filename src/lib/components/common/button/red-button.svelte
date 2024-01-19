<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CustomButton from './custom-button.svelte';
	export let className: string = '';
	export let name: string;
	export let formaction: string | undefined = undefined;
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<CustomButton
	className="bg-button-primary-default text-on-invert-primary {className}"
	{name}
	{formaction}
	{onClick}
/>
