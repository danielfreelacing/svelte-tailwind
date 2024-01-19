<script lang="ts">
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import type { ItemType } from '../types';
	import localItemStore from '$lib/stores/localItemStore';
</script>

<div
	class=" h-14 p-4 border-b border-gray-200 justify-start items-center inline-flex bg-white w-full"
>
	<div class="justify-start items-center gap-2 flex">
		<div class="w-9 h-6 relative">
			<Switch bind:checked={$localItemStore.isAvailable} />
		</div>
		<div class="text-zinc-900 text-sm font-semibold font-['Poppins'] leading-tight">
			Status: {$localItemStore.isAvailable ? 'Active' : 'Disabled'}
		</div>
	</div>
</div>
