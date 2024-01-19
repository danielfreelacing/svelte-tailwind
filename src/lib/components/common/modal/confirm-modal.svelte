<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CustomModal from './custom-modal.svelte';
	import GrayButton from '../button/gray-button.svelte';
	import RedButton from '../button/red-button.svelte';
	export let className: string = '';
	export let show: boolean = false;
	export let onClose: MouseEventHandler<HTMLDivElement> | undefined = undefined;
	export let yesLabel: string = 'Yes';
	export let onYes: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
	export let noLabel: string = 'No';
	export let onNo: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<CustomModal {show} {onClose}>
	<div class="flex flex-col gap-4 {className}">
		<slot />
		<div class="flex justify-end gap-4">
			<GrayButton name={noLabel} onClick={onNo} />
			<RedButton name={yesLabel} onClick={onYes} />
		</div>
	</div>
</CustomModal>
