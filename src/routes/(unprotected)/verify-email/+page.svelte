<script lang="ts">
	import { enhance as svelteEnhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import LogoText from '$lib/icons/logo_text_red.svg';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validationMethod: 'oninput',
		defaultValidator: 'clear'
	});

	// 	onMount( ()=> {
	// form.update(
	// 	(form) => {
	// 		form.email = ""
	// 		form.password = ""
	// 	}, {taint: false}
	// )
	// 	})
</script>

<!-- <SuperDebug data={$form} /> -->

<div class=" pt-[80px] container mx-auto">
	<div class="w-[343px] mx-auto">
		<div class=" flex-col justify-start items-start gap-8 inline-flex">
			<div class="w-[92px] h-8 relative">
				<img src={LogoText} alt="logo icon" />
			</div>
			<form method="POST" use:enhance>
				<div class="self-stretch flex-col justify-start items-start gap-6 sm:gap-10 flex">
					<div class="self-stretch flex-col justify-start items-start gap-4 flex">
						<div
							class="self-stretch text-zinc-900 text-2xl sm:text-[24px] font-semibold font-['Poppins'] leading-normal sm:leading-10"
						>
							Your email is verified
							<br/>
							<span class="sm:text-lg">Please sign in</span>
						</div>
					</div>

					<div class="self-stretch flex-col justify-start items-start gap-4 flex">
						<div
							class=" w-[343px] sm:w-full self-stretch  flex-col justify-start items-start gap-1 flex"
						>
							<div
								class="self-stretch  bg-white h-14 border rounded-xl {$errors.email ? 'border-text-text-on-surface-accent' : null}  border-gray-200 justify-start items-center gap-3 inline-flex"
							>
								<div
									class="relative grow shrink p-4 basis-0 flex-col justify-start items-start gap-px inline-flex"
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
											: 'text-zinc-900'}  text-base rounded-xl font-normal font-['Poppins'] leading-normal "
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
							class="w-[343px] sm:w-full self-stretch h-14 px-4 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 flex flex-row"
						>
							<div class="grow shrink basis-0 flex-col justify-start items-start gap-px flex">
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
									class="w-full {$errors.password
										? 'text-text-text-on-surface-accent'
										: 'text-zinc-900'} !bg-white text-base font-normal font-['Poppins'] leading-normal"
									type="password"
									name="password"
									placeholder="Password"
									aria-invalid={$errors.password ? 'true' : undefined}
									bind:value={$form.password}
									{...$constraints.password}
								/>
							</div>
						</div>
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
