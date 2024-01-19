<script lang="ts">
	import Icon from '@iconify/svelte';

	export let show: boolean = false;
	export let onClose: any = undefined;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if show}
	<div
		class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-gray-500 bg-opacity-50 CustomModal"
	>
		<div
			class="relative p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg border-on-surface-secondary max-w-[80%] max-h-[80%]"
		>
			{#if onClose}
				<div class="absolute cursor-pointer right-4 top-4" on:click={onClose}>
					<Icon icon="mdi:close" />
				</div>
			{/if}
			<slot />
		</div>
	</div>
{/if}
