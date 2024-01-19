<script lang="ts">
	import Table from './table.svelte';
	import Tag from './tags/tag.svelte';
	import Tab from './tabs/tab.svelte';
</script>

<div class="mx-4 mt-8 flex-col justify-start items-start gap-4 inline-flex">
	<div class="w-[1408px] h-6 justify-start items-center gap-2 inline-flex">
		<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">Orders</div>
	</div>
	<div class="w-[782px] h-8 justify-start items-start gap-2 inline-flex">
		<Tab text="all" number={239} active={true} indicatorcolor={'gray'} />
        <Tab text="open" number={14} active={false} indicatorcolor={'blue'} />
		<Tab text="preparing" number={10} active={false} indicatorcolor={'yellow'} />
		<Tab text="served" number={21} active={false} indicatorcolor={'darkblue'} />
		<Tab text="completed" number={185} active={false} indicatorcolor={'green'} />
		<Tab text="cancelled" number={9} active={false} indicatorcolor={'red'} />
	</div>
	<Table />
</div>
