<script lang="ts">
	import UserAvatarOutline from '$lib/icons/user_avatar_outline.svg';
	import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
	import ArrowDown from '$lib/icons/arrow-down-s-line.svg';
	import localAddressStore from '$lib/stores/addressStore';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	type EstablishmentType = {
		id: string;
		name: string;
	};

	export let establishmentTypeList: EstablishmentType[];
	export let form;

	export let errors;
	export let constraints;
	export let establishmentTypeSelected = establishmentTypeList[0];
	export let avatarImageUrl;

	let establishmentTypeIndex = 0;
	let typeComponentWidth = 0;

	$: establishmentTypeSelected = establishmentTypeList[establishmentTypeIndex];

	onMount(() => {
		if ($localAddressStore.copyAddresOver === true) {
			$form.address1 = $localAddressStore.addressLine1;
			$form.address2 = $localAddressStore.addressLine2;
			$form.city = $localAddressStore.city;
			$form.country = $localAddressStore.country;
			$form.postcode = $localAddressStore.postcode;

			console.log('localAddressStore in establishment form', $localAddressStore);
		}
	});

	let files: File;
	let myAvatar: string;

	function handleShowImage() {
		setTimeout(() => {
			const file = files[0];
			console.log('this is the file', file);
			console.log('this is the pbecjtUrl', URL.createObjectURL(file));

			if (files) {
				myAvatar = URL.createObjectURL(files[0]);
			}
		}, 1);
	}

	// $: console.log('errors in your-places', $errors);
</script>

<div class="self-stretch flex-col justify-start items-start gap-6 sm:gap-10 flex">
	<div class=" h-20 justify-start items-center gap-4 inline-flex">
		<div class="w-20 h-20 relative">
			<div
				class="w-20 h-20 left-0 top-[-0px] absolute rounded-full overflow-none border-2 border-white"
			>
				{#if myAvatar !== undefined}
					<div class="w-20 h-20 relative">
						<div
							class="w-20 h-20 left-0 top-[-0px] absolute rounded-full border-2 border-white overlay overflow-hidden"
						>
							<img src={myAvatar} alt="establishment avatar" />
						</div>
					</div>
				{:else}
					<div
						class="w-8 h-8 left-[22px] top-[23px] absolute justify-center items-center inline-flex"
					>
						<div class="w-8 h-8 relative">
							<img src={UserAvatarOutline} alt="user avatar outline" />
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="w-[552px] flex-col justify-start items-start gap-2 inline-flex">
			<div class="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
				Add your logo
			</div>
			<div>
				<form
					method="post"
					use:enhance={({ form, data, action, cancel }) => {
						// `form` is the `<form>` element
						// `data` is its `FormData` object
						// `action` is the URL to which the form is posted
						// `cancel()` will prevent the submission

						return async ({ result, update }) => {
							console.log(' result', result);

							avatarImageUrl = result?.data?.data?.avatarImageUrl;

							console.log('aiurl length', avatarImageUrl.length);
							if (avatarImageUrl.length > 10) {
								// console.log("NOT ACTIVE: resetting customError avatarImageUrl")
								delete $errors['avatarImageUrl'];
							}
							// `result` is an `ActionResult` object
							// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
						};
					}}
					action="your-places?/establishmentAvatarImageUrl"
					enctype="multipart/form-data"
				>
					<div class=" bg-white rounded-xl justify-center items-center gap-2 inline-flex">
						<label
							for="establishmentAvatar"
							class="text-center text-zinc-900 rounded-xl px-4 py-3 border border-gray-200 text-base {!files
								? 'font-semibold'
								: 'font-normal'} font-['Poppins'] leading-normal cursor-pointer"
						>
							Select File
						</label>
						<input
							type="file"
							class="hidden"
							id="establishmentAvatar"
							name="establishmentAvatar"
							on:change={() => handleShowImage()}
							bind:files
						/>
						<button
							type="submit"
							class=" border rounded-xl px-4 py-3 border-gray-200 {files
								? 'font-semibold'
								: 'text-button-primary-disabled'} ">Upload</button
						>
					</div>
				</form>
				<div class="relative w-[200px]">
					{#if $errors.avatarImageUrl}<div
							class="invalid absolute text-xs whitespace-nowrap w-[200px] mt-2"
						>
							{$errors.avatarImageUrl}
						</div>{/if}
				</div>
			</div>
			<!-- {#if formCustomErrors.avatarImageUrl }<div class="invalid text-xs">{formCustomErrors.avatarImageUrl[0]}</div>{/if} -->
		</div>
	</div>

	<div class="w-[552px] flex-col justify-start items-start gap-4 inline-flex">
		<div class="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 py-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				bind:clientWidth={typeComponentWidth}
			>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="w-full">
						<div class="w-full basis-0 flex-row justify-between items-center inline-flex">
							<div class="flex flex-col w-full justify-between">
								<div class="self-stretch justify-start items-start gap-1 inline-flex">
									<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
										Establishment type
									</div>
								</div>
								<div
									class="self-stretch text-left text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								>
									{establishmentTypeList[establishmentTypeIndex].name.charAt(0).toUpperCase() +
										establishmentTypeList[establishmentTypeIndex].name.slice(1)}
								</div>
							</div>

							<div class="w-6 h-6 justify-center items-center flex">
								<div class="w-6 h-6 relative">
									<img src={ArrowDown} alt="down arrow/ open dropdown" />
								</div>
							</div>
						</div></DropdownMenu.Trigger
					>
					<DropdownMenu.Content class="bg-white " style={`width: ${typeComponentWidth}px;`}>
						<DropdownMenu.Group>
							{#each establishmentTypeList as establishmentType, index}
								<DropdownMenu.Item>
									<button
										on:click={() => (establishmentTypeIndex = index)}
										class="w-full h-8 hover:bg-surface-border rounded-xsm text-left px-2 text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
										>{establishmentType.name.charAt(0).toUpperCase() +
											establishmentType.name.slice(1)}</button
									></DropdownMenu.Item
								>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					{#if $form.establishmentName !== '' && $form.establishmentName !== undefined && !$errors.establishmentName}
						<div class="flex flex-row justify-between w-full">
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Establishment Name
							</div>
						</div>
					{/if}

					<input
						class="w-full {$errors.establishmentName
							? 'text-text-text-on-surface-accent'
							: 'text-zinc-900'}  text-base font-normal font-['Poppins'] leading-normal"
						placeholder="Establishment name"
						type="text"
						name="establishmentName"
						aria-invalid={$errors.establishmentName ? 'true' : undefined}
						bind:value={$form.establishmentName}
						{...$constraints.establishmentName}
					/>
					<div class="relative w-[200px]">
						{#if $errors.establishmentName}<div
								class="invalid absolute text-xs whitespace-nowrap w-[200px] -mt-[3px]"
							>
								{$errors.establishmentName}
							</div>{/if}
					</div>
				</div>
			</div>
		</div>
		<div
			class="w-full self-stretch h-[90px] px-4 py-2 bg-white rounded-xl border border-gray-200 justify-start items-start gap-5 inline-flex"
		>
			<div class="w-full grow shrink basis-0 flex-row justify-start items-start  inline-flex">
				<div
					class="grow basis-0 pt-2 flex-col w-full justify-start items-start gap-px inline-flex"
				>
					{#if $form.description !== undefined && $form.description.length > 0}
						<div class="flex flex-row justify-between w-full">
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Establishment description
							</div>
							{#if $errors.email}<div class="invalid text-xs">{$errors.email}</div>{/if}
						</div>
					{/if}

					<textarea
						bind:value={$form.description}
						placeholder="establishment description"
						class="w-full text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-tight"
						name="description"
						maxlength="100"
						style="overflow: hidden; resize: none;"
					/>
					<div class="relative w-[200px]">
						{#if $errors.description}<div
								class="invalid absolute text-xs whitespace-nowrap w-[200px] mt-2"
							>
								{$errors.description}
							</div>{/if}
					</div>
				</div>
				{#if $form.description !== undefined && $form.description.length > 0}
					<div class="basis-[60px] self-stretch justify-end items-start flex">
						<div class="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">
							{$form.description?.length || 0}/100
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="w-[552px] h-[272px] flex-col justify-start items-start gap-4 inline-flex">
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					{#if $form.address1 !== '' && $form.address1 !== undefined}
						<div class="flex flex-row justify-between w-full">
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Address
							</div>
							{#if $errors.address1}<span class="invalid">{$errors.address1}</span>{/if}
						</div>
					{/if}

					<input
						class="w-full {$errors.address1
							? 'text-text-text-on-surface-accent'
							: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
						placeholder="Home address Line 1"
						type="text"
						name="address1"
						aria-invalid={$errors.address1 ? 'true' : undefined}
						bind:value={$form.address1}
						{...$constraints.address1}
					/>
					<div class="relative w-[200px]">
						{#if $errors.address1}<div
								class="invalid absolute text-xs whitespace-nowrap w-[200px] -mt-[3px]"
							>
								{$errors.address1}
							</div>{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					{#if $form.address2 !== '' && $form.address2 !== undefined}
						<div class="flex flex-row justify-between w-full">
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Address
							</div>
							{#if $errors.address2}<span class="invalid">{$errors.address2}</span>{/if}
						</div>
					{/if}

					<input
						class="w-full {$errors.address2
							? 'text-text-text-on-surface-accent'
							: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
						placeholder="Home address Line 2 (Optional)"
						type="text"
						name="address2"
						aria-invalid={$errors.address2 ? 'true' : undefined}
						bind:value={$form.address2}
						{...$constraints.address2}
					/>
				</div>
			</div>
		</div>
		<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
			<div
				class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
			>
				<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
					{#if $form.city !== '' && $form.city !== undefined}
						<div class="flex flex-row justify-between w-full">
							<div
								class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
							>
								Town/City
							</div>
							{#if $errors.city}<span class="invalid">{$errors.city}</span>{/if}
						</div>
					{/if}

					<input
						class="w-full {$errors.city
							? 'text-text-text-on-surface-accent'
							: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
						placeholder="Town/City"
						type="text"
						name="city"
						aria-invalid={$errors.city ? 'true' : undefined}
						bind:value={$form.city}
						{...$constraints.city}
					/>
					<div class="relative w-[200px]">
						{#if $errors.city}<div
								class="invalid absolute text-xs whitespace-nowrap w-[200px] -mt-[3px]"
							>
								{$errors.city}
							</div>{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="self-stretch justify-start items-start gap-4 inline-flex">
			<div class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
				<div
					class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						{#if $form.country !== '' && $form.country !== undefined}
							<div class="flex flex-row justify-between w-full">
								<div
									class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
								>
									Country
								</div>
								{#if $errors.country}<span class="invalid">{$errors.country}</span>{/if}
							</div>
						{/if}

						<input
							class="w-full {$errors.country
								? 'text-text-text-on-surface-accent'
								: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
							placeholder="Country"
							type="text"
							name="country"
							aria-invalid={$errors.country ? 'true' : undefined}
							bind:value={$form.country}
							{...$constraints.country}
						/>
						<div class="relative w-[200px]">
							{#if $errors.country}<div
									class="invalid absolute text-xs whitespace-nowrap w-[200px] -mt-[3px]"
								>
									{$errors.country}
								</div>{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
				<div
					class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						{#if $form.postcode !== '' && $form.postcode !== undefined}
							<div class="flex flex-row justify-between w-full">
								<div
									class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
								>
									Postcode
								</div>
								{#if $errors.postcode}<span class="invalid ml-4">{$errors.postcode}</span>{/if}
							</div>
						{/if}

						<input
							class="w-full {$errors.postcode
								? 'text-text-text-on-surface-accent'
								: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
							placeholder="Postcode"
							type="text"
							name="postcode"
							aria-invalid={$errors.postcode ? 'true' : undefined}
							bind:value={$form.postcode}
							{...$constraints.postcode}
						/>
						<div class="relative w-[200px]">
							{#if $errors.postcode}<div
									class="invalid absolute text-xs whitespace-nowrap w-[200px] -mt-[3px]"
								>
									{$errors.postcode}
								</div>{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.invalid {
		color: #ee543e;
	}

	::placeholder {
		color: #b3b5c0;
	}
</style>
