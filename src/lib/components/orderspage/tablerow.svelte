<script lang="ts">
	import SmallMenu from '$lib/icons/icon_small_menu.svg';
	import Tag from './tags/tag.svelte';
	import DavidJohnson from '$lib/icons/DavidJohnson.png';
	const totalAmount = 16.97;
	const statusDuration = '15:12';
	const tabNumber = 12345;
	const tableNumber = 10;
	const servingStaff = 'David Johnson';
</script>

<div class="w-full self-stretch p-4 border-t border-gray-200 justify-start items-center gap-8 inline-flex">
	<div class="basis-[120px] text-zinc-500 text-base font-normal font-['Poppins'] leading-normal">
		#{tabNumber}
	</div>
	<div
		class="basis-[86px] text-center text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
	>
		{tableNumber}
	</div>
	<div class="h-6 justify-start items-center gap-2 flex">
		<div class="w-6 h-6 justify-center items-center flex">
			<img src={DavidJohnson} alt="avatar" />
		</div>
		<div class="basis-40 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
			{servingStaff}
		</div>
	</div>
	<div class="grow shrink basis-[400px]">
		<span style="text-red-500 text-base font-normal font-['Poppins'] leading-normal"> 1x</span><span
			style="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
		>
			Beef tartare with smoked tomato sauce,</span
		>
		<span style="text-red-500 text-base font-normal font-['Poppins'] leading-normal">1x</span>
		<span style="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
			Caesar for Banksy with crispy chicken, bacon and crackers</span
		>
	</div>
	<div class="basis-24 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
		{totalAmount}
	</div>
	<div class="basis-[88px] flex-col justify-start items-start gap-2 inline-flex">
		<Tag type="open" />
	</div>
	<div class="h-6 justify-start items-center gap-1 flex">
		<div class="basis-5 h-5 justify-center items-center flex">
			<div class="w-5 h-5 relative" />
		</div>
		<div class="basis-[72px] text-red-500 text-base font-normal font-['Poppins'] leading-normal">
			{statusDuration}
		</div>
	</div>
	<div class="w-5 h-5 justify-center items-center flex">
		<div class="w-5 h-5 relative">
			<img src={SmallMenu} alt="menu dropdown icon" />
		</div>
	</div>
</div>
