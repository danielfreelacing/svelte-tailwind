<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	type $$Props = SelectPrimitive.TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;
	type $$PrimitiveProps = SelectPrimitive.Props;

	let selected: $$PrimitiveProps['selected'] = undefined;
	let className: $$Props['class'] = undefined;
	export { className as class };
	export { selected as valueasd };
</script>

<SelectPrimitive.Trigger
	class={cn(
		'flex relative h-14 w-full pt-[30px] items-center justify-between rounded-md border border-input bg-transparent px-3 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 aria-selected:pt-8 group focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<slot {builder} />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50 group-aria-selected:-mt-4" />
	</div>
</SelectPrimitive.Trigger>

<style>
	/* If child has aria selected, apply mt-3*/
</style>
