<script lang="ts">
	import type { OptionType } from '../../types';
	import Can from '$lib/icons/can.svg';

	export let localOption: OptionType;
	export let optionIndex: number;
    export let handleRemoveOption: (id: number) => void
</script>

<div class="self-stretch h-[148px] flex-col justify-start items-start gap-2 flex ">
	<div class="self-stretch justify-between items-start inline-flex">
		<div class="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
			Option {optionIndex + 1}
		</div>
		<button class="w-5 h-5 justify-center items-center flex"
        on:click={()=> handleRemoveOption(localOption.id)}>
			<div class="w-5 h-5 relative">
				<img src={Can} alt="" />
			</div>
		</button>
	</div>
	<div class="self-stretch h-14 flex-col justify-start items-start gap-4 flex">
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					<input
						type="text"
						bind:value={localOption.name}
						placeholder="Option name"
						class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="self-stretch h-14 flex-col justify-start items-start gap-4 flex">
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					<input
						type="number"
						bind:value={localOption.price}
						placeholder="Price"
						class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
