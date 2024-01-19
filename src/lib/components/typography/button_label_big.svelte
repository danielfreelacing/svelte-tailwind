<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ClassValue } from 'clsx';
	export let classes: ClassValue | null = null;
</script>

<p
	class={cn('text-text-text-on-surface-primary text-base font-semibold font-[poppins] tracking-normal', classes)}
>
	<slot />
</p>
