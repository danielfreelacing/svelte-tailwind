<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	export let classes: ClassValue | null = null;
</script>

<h1
	class={cn('text-text-text-on-surface-primary text-2xl font-semibold font-[poppins] leading-tight', classes)}
>
	<slot />
</h1>

