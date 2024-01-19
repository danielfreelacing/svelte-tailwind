<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	export let classes: ClassValue | null = null;
</script>

<h3
	class={cn('text-text-text-on-surface-primary text-base font-semibold font-[poppins] leading-tight', classes)}
>
	<slot />
</h3>
