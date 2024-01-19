<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	export let className: string = '';
	export let name: string;
	export let formaction: string | undefined = undefined;
	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<button
	class="flex h-fit items-center justify-center px-10 py-3 text-base font-semibold leading-6 text-center cursor-pointer rounded-xl font-poppins {className}"
	{formaction}
	on:click={onClick}
>
	{name}
</button>
