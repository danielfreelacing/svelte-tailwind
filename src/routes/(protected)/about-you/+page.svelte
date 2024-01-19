<script lang="ts">
	import { Switch } from '$lib/components/shadcn/ui/switch';
	import LogoText from '$lib/icons/logo_text_red.svg';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Tag from './tag.svelte';
	import type { TagType } from './types';
	import localAddressStore from '$lib/stores/addressStore';
	export let data: PageData;

	let addressSame: boolean = false;
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validationMethod: 'auto',
		defaultValidator: 'clear'
	});

	function handleClientSaveAddress() {
		$localAddressStore.copyAddresOver = addressSame;
		$localAddressStore.addressLine1 = $form.address1;
		$localAddressStore.addressLine2 = $form.address2;
		$localAddressStore.city = $form.city;
		$localAddressStore.country = $form.country;
		$localAddressStore.postcode = $form.postcode;
		console.log("localAddressStore", $localAddressStore)
	}
</script>

<!-- <SuperDebug data={$form} /> -->

<div class=" py-[80px] h-full sm:container mx-auto">
	<div class="w-[375px] h-full sm:w-[600px] mx-auto">
		<div class=" flex-col justify-start items-start gap-16 inline-flex ml-auto mr-auto">
			<div class="w-[92px] h-8 relative">
				<img src={LogoText} alt="logo icon" />
			</div>
			<form method="POST" use:enhance>
				<div class="self-stretch flex-col justify-start items-start gap-6 sm:gap-10 flex">
					<div class="self-stretch h-[120px] flex-col justify-start items-start gap-4 flex">
						<div
							class="self-stretch text-zinc-900 text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-normal sm:leading-10"
						>
							Verify your identity
						</div>
						<div
							class="self-stretch text-zinc-900 text-base sm:text-xl font-normal font-['Poppins'] leading-normal sm:leading-loose"
						>
							We only use personal information for identity verification and will never share it
							outside of Zulzi
						</div>
					</div>

					<div class="w-[600px] flex-col justify-start items-start gap-4 inline-flex">
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
									{#if $form.firstName !== '' && $form.firstName !== undefined}
										<div class="flex flex-row justify-between w-full">
											<div
												class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
											>
												First name
											</div>
										</div>
										{#if $errors.firstName}<div class="invalid text-xs">
												{$errors.firstName}
											</div>{/if}
									{/if}

									<input
										class="w-full {$errors.firstName
											? 'text-text-text-on-surface-accent'
											: 'text-zinc-900'}  text-base font-normal font-['Poppins'] leading-normal"
										placeholder="First name"
										type="text"
										name="firstName"
										aria-invalid={$errors.firstName ? 'true' : undefined}
										bind:value={$form.firstName}
										{...$constraints.firstName}
									/>
								</div>
							</div>
						</div>
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
									{#if $form.lastName !== '' && $form.lastName !== undefined}
										<div class="flex flex-row justify-between w-full">
											<div
												class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
											>
												Last name
											</div>
											{#if $errors.lastName}<span class="invalid">{$errors.lastName}</span>{/if}
										</div>
									{/if}
									
									<input
										class="w-full {$errors.lastName
											? 'text-text-text-on-surface-accent'
											: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
										placeholder="Last name"
										type="text"
										name="lastName"
										aria-invalid={$errors.lastName ? 'true' : undefined}
										bind:value={$form.lastName}
										{...$constraints.lastName}
									/>
								</div>
							</div>
						</div>
			
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
									<div class="flex flex-row justify-between w-full">
										<div
											class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
										>
											Phone number
										</div>

										{#if $errors.phone}<span class="invalid">{$errors.phone}</span>{/if}
									</div>
									<div class="flex flex-row">
										<div
											class="self-stretch h-4 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
										>
											+380 &nbsp
										</div>
										<input
											class="w-full {$errors.phone
												? 'text-text-text-on-surface-accent'
												: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
											type="text"
											name="phone"
											aria-invalid={$errors.phone ? 'true' : undefined}
											bind:value={$form.phone}
											{...$constraints.phone}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="w-[600px] h-14 flex-col justify-start items-start gap-1 inline-flex">
						<div
							class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								{#if $form.idNumber !== '' && $form.idNumber !== undefined}
									<div class="flex flex-row justify-between w-full">
										<div
											class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
										>
											ID number
										</div>
										{#if $errors.idNumber}<span class="invalid">{$errors.idNumber}</span>{/if}
									</div>
								{/if}
								<input
									class="w-full {$errors.idNumber
										? 'text-text-text-on-surface-accent'
										: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
									placeholder="ID number"
									type="text"
									name="idNumber"
									aria-invalid={$errors.idNumber ? 'true' : undefined}
									bind:value={$form.idNumber}
									{...$constraints.idNumber}
								/>
							</div>
						</div>
					</div>

					<div class="w-[600px] h-[272px] flex-col justify-start items-start gap-4 inline-flex">
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
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
								</div>
							</div>
						</div>
						<div class="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
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
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
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
								</div>
							</div>
						</div>
						<div class="self-stretch justify-start items-start gap-4 inline-flex">
							<div class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
								<div
									class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
								>
									<div
										class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
									>
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
									</div>
								</div>
							</div>
							<div class="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
								<div
									class="self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
								>
									<div
										class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
									>
										{#if $form.postcode !== '' && $form.postcode !== undefined}
											<div class="flex flex-row justify-between w-full">
												<div
													class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
												>
													Postcode
												</div>
												{#if $errors.postcode}<span class="invalid ml-4">{$errors.postcode}</span
													>{/if}
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
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="w-[600px] h-6 justify-start items-center gap-1 inline-flex">
						<div
							class="grow shrink basis-0 text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight"
						>
							My home address and business address are the same
						</div>
						<div class="w-9 h-6 relative">
							<Switch bind:checked={addressSame} />
						</div>
					</div>

					<div
						class="w-[600px] text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
					>
						By continuing, I agree that the information provided above is correct, and that I have
						the legal authority to create an account. I understand that Zulzi uses an electronic
						verification system to check my identity for money laundering and fraud prevention, for
						know your client processes, to effectively administer the on-boarding process, and to
						improve its products and services. This is not a credit check, however this will leave
						an identity check footprint on my credit file which I may see but will not show up in a
						credit search and will not affect my ability to get credit. The verification provider
						may also keep a record of the search conducted and share a record of past searches with
						other users of its service.
					</div>
					<button
						class="self-stretch px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 inline-flex"
						on:click={handleClientSaveAddress}
					>
						<div
							class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal"
						>
							Continue
						</div>
					</button>
				</div>
			</form>
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
