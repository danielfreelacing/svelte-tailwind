<script lang="ts">
	import type { TagType } from '../types';
	import CheckBox from '$lib/icons/Checkbox.svg';

	export let tag: TagType;

	console.log("tag", tag)
	function handleToggle() {
		tag.active = !tag.active
	}
</script>

<button class="justify-start items-start gap-1 inline-flex" on:click={handleToggle}>
	{#if tag.active}
		<div class="w-6 h-6 relative">
			<img src={CheckBox} alt="check mark" />
		</div>
	{:else}
		<div class="w-6 h-6 relative">
			<div
				class="w-[18px] h-[18px] left-[3px] top-[3px] absolute rounded-xsm border-[2px] border-text-text-on-surface-secondary"
			/>
		</div>
	{/if}
	<div class="text-neutral-950 text-base font-normal font-['Poppins'] leading-normal">
		{tag.name?.charAt(0).toUpperCase() + tag.name?.slice(1)}
	</div>
</button>
