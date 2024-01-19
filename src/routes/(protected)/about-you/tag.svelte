<script lang="ts">
	import type { TagType } from './types';
	import CheckBox from '$lib/icons/Checkbox.svg';

	let tag: TagType = { name: 'terms', active: false };

	$: console.log('tag', tag);
	function handleToggle() {
		tag.active = !tag.active;
	}
</script>

<label class="switch justify-start items-start gap-1 inline-flex">
	<input type="checkbox" name="tag" on:change={handleToggle} />

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
</label>

<style>
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>
