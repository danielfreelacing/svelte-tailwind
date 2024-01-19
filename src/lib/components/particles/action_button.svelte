<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	// export let classes: ClassValue | null = null;
	import SmallAddPlus from '$lib/icons/small_add_plus.svg';

	export let onclickfunction: () => void;
	export let buttonText: string;
	export let disabled: boolean = false
</script>

<!-- class={cn('text-right text-white text-base font-semibold font-[poppins] leading-tight', classes)} -->
<button
	class=" h-8  px-3  p-2 {disabled ? 'bg-button-primary-disabled' : 'bg-button-primary-default'} rounded-xl inline-flex  items-center"
	on:click={onclickfunction}
	{disabled}
>
<div class='inline-flex align-middle  '>
	<div class="w-4 flex flex-row justify-center items-center">
		<div class="w-4 ">
			<img src={SmallAddPlus} alt="small add item" />
		</div>
	</div>
	<div class=" text-white text-sm font-semibold font-['Poppins'] ">
		<p class=" leading-tight mt-[1px]">{buttonText}</p>
	</div>
</div>
</button>
 