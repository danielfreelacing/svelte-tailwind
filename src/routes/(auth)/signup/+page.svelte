<script lang="ts">
	import LogoText from '$lib/icons/logo_text_red.svg';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Tag from './tag.svelte';
	import type { TagType } from './types';
	import CheckBox from '$lib/icons/Checkbox.svg';
	export let data: PageData;

	let localEmail = '';
	let localPassword = '';
	let localConfirmPassword = '';
	let tag: TagType = { name: 'terms', active: false };

	let toggleUnset = false;

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		// 		validators: {
		//     email: (email) =>
		//       email.length < 7 ? 'Email must be at least 4 characters' : null,
		//     tag: (tag) => (tag === false ? 'Please confirm the conditions' : null)
		//   },
		validationMethod: 'auto',
		defaultValidator: 'clear'
	});

	function handleToggle() {
		tag.active = !tag.active;
		if (tag.active === false) {
			toggleUnset = true;
		} else {
			toggleUnset = false;
		}
	}

	$: tagConstraint = toggleUnset === true ? { ...$constraints.tag } : {};
</script>

<!-- <SuperDebug data={$form} /> -->

<div class=" pt-[80px] sm:container mx-auto">
	<div class="w-[375px] sm:w-[600px] mx-auto">
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
							Let’s create your account
						</div>
						<div
							class="self-stretch text-zinc-900 text-base sm:text-xl font-normal font-['Poppins'] leading-normal sm:leading-loose"
						>
							Signing up for Zulzi is fast and free. No commitments or long-term contracts.
						</div>
					</div>

					<div class="self-stretch flex-col justify-start items-start gap-4 flex">
						<div
							class="w-[343px] sm:w-full self-stretch h-14 flex-col justify-start items-start gap-1 flex"
						>
							<div
								class="self-stretch h-14 px-4 bg-white rounded-xl border {$errors.email ? 'border-text-text-on-surface-accent' : 'border-gray-200'}   justify-start items-center gap-3 inline-flex"
							>
								<div
									class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
								>
									{#if $form.email !== '' && $form.email !== undefined}
										<div class="flex flex-row justify-between w-full">
											<div
												class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
											>
												Email
											</div>
											{#if $errors.email}<div class="invalid text-xs">{$errors.email}</div>{/if}
										</div>
									{/if}

									<input
										class="w-full !bg-white {$errors.email
											? 'text-text-text-on-surface-accent'
											: 'text-zinc-900'} text-base font-normal font-['Poppins'] leading-normal"
										type="email"
										name="email"
										placeholder="Enter your email"
										aria-invalid={$errors.email ? 'true' : undefined}
										bind:value={$form.email}
										{...$constraints.email}
									/>
								</div>
							</div>
						</div>

						<div
							class="w-[343px] sm:w-full self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								{#if $form.password !== '' && $form.password !== undefined}
									<div class="flex flex-row justify-between w-full">
										<div
											class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
										>
											Password
										</div>
										{#if $errors.password}<div class="invalid text-xs">{$errors.password}</div>{/if}
									</div>
								{/if}

								
								<input
									class="w-full text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									type="password"
									name="password"
									placeholder="Create password"
									aria-invalid={$errors.password ? 'true' : undefined}
									bind:value={$form.password}
									{...$constraints.password}
								/>
							</div>
						</div>

						<div
							class="w-[343px] sm:w-full self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
						>
							<div
								class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex"
							>
								<!-- <label
									for="confirmPassword"
									class="self-stretch h-4 text-zinc-500 text-base font-normal font-['Poppins'] leading-normal"
									>Confirm password</label
								> -->
								{#if $form.confirmPassword !== '' && $form.confirmPassword !== undefined}
									<div
										class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
									>
										Confirm password
									</div>
								{/if}
								<input
									class="w-full text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									placeholder="Confirm password"
									type="password"
									name="confirmPassword"
									aria-invalid={$errors.confirmPassword ? 'true' : undefined}
									bind:value={$form.confirmPassword}
									{...$constraints.confirmPassword}
								/>
								{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span
									>{/if}
							</div>
						</div>
					</div>
					<div class="flex flex-col">
						<div
							class="w-[343px] sm:w-full self-stretch justify-start items-start gap-1 inline-flex"
						>
							<!-- <Tag /> -->
							<label class="switch justify-start items-start gap-1 inline-flex">
								<input type="checkbox" name="tag" bind:checked={$form.tag} {...$constraints.tag} />
								{#if $form.tag}
									<div class="w-6 h-6 relative">
										<img src={CheckBox} alt="check mark" />
									</div>
								{:else}
									<div class="w-6 h-6 relative">
										<div
											class="w-[18px] h-[18px] left-[3px] top-[3px] absolute rounded-xsm border-[2px] border-text-text-on-surface-secondary"
										/>
									</div>
								{/if}
							</label>

							<div class="grow shrink basis-0">
								<span class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									>I have read and agree to Square’s
								</span><span
									class="text-button-primary-default text-base font-semibold font-['Poppins'] leading-tight"
									>General Terms
								</span><span
									class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
								>
									and the applicable
								</span><span
									class="text-button-primary-default text-base font-semibold font-['Poppins'] leading-tight"
									>Additional Terms</span
								><span class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									>, including the
								</span><span
									class="text-button-primary-default text-base font-semibold font-['Poppins'] leading-tight"
									>Privacy Policy</span
								><span class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
									>.</span
								>
							</div>
						</div>
						{#if $errors.tag}<div class="invalid">{$errors.tag}</div>{/if}
					</div>
					<button
						class="self-stretch px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 inline-flex"
					>
						<div
							class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal"
						>
							Continue
						</div>
					</button>
					<div class="self-stretch h-12">
						<span class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
							>Already have a Zulzi account?
						</span>
						<a
							class="text-button-primary-default text-base font-semibold font-['Poppins'] leading-tight"
							href="/signin"
						>
							Sign in
						</a>
					</div>
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

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>
