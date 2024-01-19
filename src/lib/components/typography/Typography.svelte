<script lang="ts">
	import { tv, type VariantProps } from 'tailwind-variants';
	import { cn } from '$lib/utils';

	const typographyVariants = tv({
		base: 'text-foreground',
		variants: {
			variant: {
				h1: 'text-[40px] leading-[40px] font-semibold',
				h2: 'text-[24px] leading-[24px] font-semibold',
				h3: 'text-[28px] leading-[35px]',
				h4: 'text-[20px] leading-[25px]',
				p: 'text-[16px] leading-[24px]',
				p_bold: 'text-[16px] leading-[24px] font-semibold',
				button: 'text-[14px] leading-[24px] font-medium',
			}
		},
		defaultVariants: {
			variant: 'p'
		}
	});
	let className: string = '';
	export { className as class };
	export let variant: any = 'p';
</script>

<div class={cn(typographyVariants({ variant, className}))}>
	<slot />
</div>
