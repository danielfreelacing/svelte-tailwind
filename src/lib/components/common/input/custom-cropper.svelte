<script lang="ts">
	import { getCroppedImg } from '$lib/utilities/canvasUtils';
	import Cropper from 'svelte-easy-crop';
	import SvgUserAvatarOutline from '$lib/icons/user_avatar_outline.svg';

	export let image: any; // bind
	export let edit: boolean = false;
	export let enableEdit: boolean = true;
	export let inputFile: any = undefined; // bind
	export let width: string = '100%';
	export let height: string = '100%';
	export let error: any = undefined;

	let pixelCrop: any;

	const onFileSelected = (e: any) => {
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			image = e?.target?.result;
			// console.log('custom-cropper#onFileSelected: image: ', image);
			edit = true;
		};
		reader.readAsDataURL(imageFile);
	};

	const onCropComplete = async (e: any) => {
		pixelCrop = e.detail.pixels;
	};

	const onEdit = () => {
		if (image) {
			edit = true;
		}
	};

	const onReset = () => {
		image = null;
	};

	const onBack = () => {
		edit = false;
	};

	const onApply = async () => {
		if (pixelCrop) {
			image = await getCroppedImg(image, pixelCrop);
		}

		edit = false;
	};
</script>

<div
	class="relative flex items-center justify-center w-full h-full"
	style="width: {width}; height: {height}"
>
	{#if edit}
		{#if image}
			<Cropper {image} on:cropcomplete={onCropComplete} aspect={1} cropShape="round" />
		{/if}
		{#if pixelCrop}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="absolute px-2 border rounded-lg cursor-pointer left-1 bottom-1 bg-on-surface-secondary border-on-invert-secondary text-on-invert-primary"
				on:click={onApply}
			>
				Apply
			</div>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="absolute px-2 border rounded-lg cursor-pointer right-1 bottom-1 bg-on-surface-secondary border-on-invert-secondary text-on-invert-primary"
			on:click={onBack}
		>
			Back
		</div>
	{:else}
		{#if image}
			<img class="max-w-full max-h-full rounded-full" src={image} alt="" />
			{#if enableEdit}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="absolute px-2 border rounded-lg cursor-pointer left-1 bottom-1 bg-on-surface-secondary border-on-invert-secondary text-on-invert-primary"
					on:click={onReset}
				>
					Reset
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="absolute px-2 border rounded-lg cursor-pointer right-1 bottom-1 bg-on-surface-secondary border-on-invert-secondary text-on-invert-primary"
					on:click={onEdit}
				>
					Edit
				</div>
			{/if}
		{:else}
			<div
				class="flex items-center justify-center w-40 h-40 border rounded-full bg-surface-surface-3 border-on-surface-placeholder"
			>
				<img class="w-12 h-12 rounded-full" src={SvgUserAvatarOutline} alt="" />
			</div>
		{/if}
		{#if enableEdit}
			<input
				class="absolute top-0 left-0 w-full h-full rounded-full opacity-0 cursor-pointer"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onFileSelected(e)}
				bind:this={inputFile}
			/>
		{/if}
	{/if}
	{#if error?.length}
		<div class="absolute top-0 text-xs text-red-500 whitespace-nowrap">{error[0]}</div>
	{/if}
</div>
