<script lang="ts">
	import Tablerow from "./tablerow.svelte";


</script>

<div
	class="w-full  h-[656px] bg-white rounded-xl border border-gray-200 flex-col justify-start items-start inline-flex"
>
	<div class="self-stretch px-4 py-2 justify-start items-center gap-8 inline-flex">
		<div class="basis-[120px] text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Tab number
		</div>
		<div class="text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Table number
		</div>
		<div class="basis-[200px] text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Serving staff
		</div>
		<div
			class="basis-[400px] grow shrink  text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight"
		>
			Items
		</div>
		<div class="basis-24 text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Total amount
		</div>
		<div class="basis-[88px] text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Status
		</div>
		<div class="basis-24 text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			Status Duration
		</div>
		<div class="basis-5 opacity-0 text-zinc-500 text-xs font-semibold font-['Poppins'] leading-tight">
			1
		</div>
	</div>
<Tablerow />


</div>

<div class="w-[1408px] h-20 px-4 py-3 justify-start items-center gap-8 inline-flex">
	<div class="justify-start items-center gap-4 flex">
		<div class="text-center text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
			1-8 of 1420
		</div>
		<div class="justify-start items-start gap-2 flex">
			<div
				class="p-3 bg-white rounded-xl border border-gray-200 justify-center items-center gap-1 flex"
			>
				<div class="w-4 h-4 justify-center items-center flex">
					<div class="w-4 h-4 relative" />
				</div>
			</div>
			<div
				class="p-3 bg-white rounded-xl border border-gray-200 justify-center items-center gap-1 flex"
			>
				<div class="w-4 h-4 justify-center items-center flex">
					<div class="w-4 h-4 relative" />
				</div>
			</div>
		</div>
	</div>
</div>
