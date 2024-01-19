<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	export let classes: ClassValue | null = null;
</script>

<h4
	class={cn('text-text-text-on-surface-primary text-sm font-semibold font-[poppins] leading-tight tracking-normal', classes)}
>
	<slot />
</h4>
