<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	// export let classes: ClassValue | null = null;
	import SmallAddPlus from '$lib/icons/small_add_plus.svg';
	import AddPlusRed from '$lib/icons/add_plus_red.svg';
	export let onclickfunction: () => void;
	export let buttonText: string;
	export let disabled: boolean = false;
	export let textColorTailwind: string = 'text-white';
	export let iconColor: string;
</script>

<!-- class={cn('text-right text-white text-base font-semibold font-[poppins] leading-tight', classes)} -->
<button
	class=" h-8  py-2 {disabled
		? ''
		: ''} rounded-xl justify-center items-center gap-1 inline-flex"
	on:click={onclickfunction}
	{disabled}
>
	<div class="w-6 h-6 justify-center items-center flex">
		<div class="w-6 h-6 relative">
			{#if iconColor === 'blue'}
				<img src={SmallAddPlus} alt="small add item" />
			{:else if iconColor === 'white'}
				<img src={SmallAddPlus} alt="small add item" />
			{:else if iconColor === 'red'}
				<img src={AddPlusRed} alt="small add item" />
			{:else}
				<img src={SmallAddPlus} alt="small add item" />
			{/if}
		</div>
	</div>
	<div class="text-center {textColorTailwind}  text-base font-normal font-['Poppins'] leading-none">
		{buttonText}
	</div>
</button>
