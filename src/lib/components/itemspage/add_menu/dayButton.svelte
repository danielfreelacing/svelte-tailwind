<script lang="ts">
	export let dayText: string;
	export let activated: boolean = false;
    import Blb from '$lib/components/typography/button_label_big.svelte'

</script>

<button 
	class="w-[60px] h-14 px-4 {activated ? 'bg-surface-surface-accent-subtle border-surface-surface-accent' : 'border-surface-border'} border bg-opacity-10 rounded-xl  justify-start items-center gap-3 inline-flex"
    on:click={() => activated = !activated}
>
	<div class="w-7 flex-col justify-center items-center gap-px inline-flex">
		<Blb classes="{activated ? 'text-text-text-on-surface-accent' : ''} ">
			{dayText}
		</Blb>
	</div>
</button>
