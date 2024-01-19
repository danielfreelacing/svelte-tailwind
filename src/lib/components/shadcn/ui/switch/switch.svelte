<script lang="ts">
	import { Switch as SwitchPrimitive, type CustomEventHandler } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = SwitchPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = false;
	export { className as class };
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		"peer inline-flex h-[24px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-text-text-on-surface-text-success data-[state=unchecked]:bg-gray-300",
		className
	)}

	{...$$restProps}
>
	<SwitchPrimitive.Thumb
		class={cn(
			"pointer-events-none block h-5 w-5  rounded-full bg-text-text-on-invert-primary shadow ring-0 transition-transform data-[state=checked]:translate-x-[14px] data-[state=unchecked]:translate-x-[2px]"
		)}
	/>
</SwitchPrimitive.Root>
