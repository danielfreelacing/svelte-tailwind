<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import CustomModal from './custom-modal.svelte';
	import RedButton from '../button/red-button.svelte';
	export let className: string = '';
	export let show: boolean = false;
	export let onClose: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

<CustomModal {show}>
	<div class="flex flex-col gap-4 {className}">
		<slot />
		<div class="flex justify-center">
			<RedButton name="Ok" onClick={onClose} />
		</div>
	</div>
</CustomModal>
