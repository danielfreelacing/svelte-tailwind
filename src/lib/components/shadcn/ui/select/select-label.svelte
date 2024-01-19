<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type $$Props = SelectPrimitive.LabelProps;
	type $$SelectPrimitiveProps = SelectPrimitive.Props;
	let className: $$Props['class'] = undefined;
	let selected = undefined;
	export { className as class };
</script>

<SelectPrimitive.Label
	class={cn(
		'text-sm mr-auto transition-all font-semibold aria-selected:absolute aria-selected:left-1 aria-selected:top-4 aria-selected:translate-x-[0] aria-selected:translate-y-[-0.6rem] aria-selected:scale-[0.8]',
		className
	)}
	{...$$restProps}
>
	<slot />
</SelectPrimitive.Label>
