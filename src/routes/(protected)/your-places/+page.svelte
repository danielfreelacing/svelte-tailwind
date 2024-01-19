<script lang="ts">
	import AddPlusRed from '$lib/icons/add_plus_red.svg';
	import PlaceForm from '$lib/components/signinflowpages/establishmentForm.svelte';
	import LogoText from '$lib/icons/logo_text_red.svg';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	export let data: PageData;
	// console.log('data in page', data);

	const establishmentTypeList = data.establishmentTypeList;

	let avatarImageUrl: string ='';
	let addAnotherEstablishment = false;

	$: formHasErrors = !( Object.keys($errors).length === 0 || !Object.values($errors).some( value => value !== undefined) || !(avatarImageUrl?.length < 10))
	

	$: console.log(' formHasNoErrors', !formHasErrors);
	// $: console.log(' formHasNoErrors cond 1', Object.keys($errors).length === 0);
	// $: console.log(' formHasNoErrors cond 2', !Object.values($errors).some( value => value !== undefined));
 


	$: console.log(' this is page data:', data);
	$: console.log(' this is page data in form:', $form);
	$: console.log(' this is avatarImageUrl:', avatarImageUrl);

	let establishmentTypeSelected: { id: string; name: string } = { id: '', name: '' };

	// $: console.log('establishmentTypeSelected is now', establishmentTypeSelected);

	$: numberOfPlacesInMerchant = $page.data?.placeList?.length || 0; // data.placeList

	const { form, errors, constraints, enhance } = superForm(data.form, {
		// validators: {
		// 	postCode: (postCode: string) =>
		// 		postCode.match(/^\d+$/)  ? 'PostCode must be digits' : null
		// },
		validationMethod: 'oninput',
		defaultValidator: 'clear',
		onUpdated({ form }) {

			console.log("is in updated!", form)
			if (form.valid) {
				// Successful post! Do some more client-side stuff,
				// like showing a toast notification.
				invalidateAll()
				console.log('form is valid. reset data:  ', data.uploadEstablishmentDataForm);
				avatarImageUrl = ''
				$form = data.uploadEstablishmentDataForm.data
			} else {
				console.log('form is invalid', form);
				formHasErrors = !( Object.keys($errors).length === 0 || !Object.values($errors).some( value => value !== undefined) || !(avatarImageUrl?.length < 10))
			}
		},
		clearOnSubmit: 'errors-and-message'
	});

	// const establishmentTypeList = [
	// 	{
	// 		id: 123,
	// 		name: 'restaurant'
	// 	},
	// 	{
	// 		id: 123,
	// 		name: 'hotel'
	// 	},
	// 	{
	// 		id: 123,
	// 		name: 'store'
	// 	},
	// 	{
	// 		id: 123,
	// 		name: 'bar'
	// 	}
	// ];
</script>

<!-- <SuperDebug data={$form} /> -->

<div class=" py-[80px] sm:container mx-auto">
	<div class="w-[375px] sm:w-[600px] mx-auto">
		<div class="w-[600px] flex-col justify-start items-start gap-16 inline-flex">
			<div class="w-[92px] h-8 relative">
				<img src={LogoText} alt="logo icon" />
			</div>
			<form method="POST" use:enhance class="w-full" action="?/uploadEstablishmentData">
				<div class="self-stretch flex-col justify-start items-start gap-6 sm:gap-10 flex">
					<div class="self-stretch flex-col justify-start items-start gap-4 flex">
						<div
							class="self-stretch text-zinc-900 text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-normal sm:leading-10"
						>
							Add your places
						</div>
						<div
							class="self-stretch text-zinc-900 text-base sm:text-xl font-normal font-['Poppins'] leading-normal sm:leading-loose"
						>
							You can add several places as a merchant. It can be a restaurant, store, bar etc. You
							can add more later at your profile.
						</div>
					</div>

					<div
						class="w-[600px] h-[778px] p-6 rounded-xl border border-gray-200 flex-col justify-start items-start gap-10 inline-flex"
					>
						<div class="self-stretch justify-between items-center inline-flex">
							<div
								class="grow shrink basis-0 h-5 text-zinc-900 text-lg font-semibold font-['Poppins'] leading-normal"
							>
								Establishment {numberOfPlacesInMerchant + 1}
							</div>
							<div class="w-6 h-6 justify-center items-center flex">
								<div class="w-6 h-6 relative" />
							</div>
						</div>

						<PlaceForm
							{form}
							{establishmentTypeList}
							{errors}
							{constraints}
							bind:establishmentTypeSelected
							bind:avatarImageUrl
						/>
						<input type="hidden" id="customId" name="avatarImageUrl" value={avatarImageUrl} />
						<input
							type="hidden"
							id="customId2"
							name="establishmentTypeId"
							value={establishmentTypeSelected.id}
						/>
						<input
							type="hidden"
							id="customId2"
							name="addAnotherEstablishment"
							value={addAnotherEstablishment}
						/>
					</div>

					<div
						class="w-[600px] text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
					>
						By continuing, I agree this information is correct.
					</div>

					<div>
						<button
							class="w-[600px] p-4 rounded-xl border border-gray-200 {formHasErrors
								? 'opacity-60'
								: ''} justify-start items-center gap-2 inline-flex"
							on:mouseover={() => (addAnotherEstablishment = true)}
							on:focus
							disabled={formHasErrors}
						>
							<div class="w-6 justify-center items-center inline-flex">
								<div class="w-6 relative align-middle">
									<img src={AddPlusRed} alt="add plus icon" />
								</div>
							</div>
							<div class="  text-lg font-semibold font-['Poppins'] leading-normal">
								Add another establishment
							</div>
						</button>

						<div class="flex flex-row justify-center w-full my-4">
							<p class="text-zinc-900 text-md font-semibold font-['Poppins'] leading-normal">or</p>
						</div>

						<button
							class="w-[600px] self-stretch px-10 py-3 {formHasErrors
								? 'opacity-60'
								: ''} bg-red-600 rounded-xl justify-center items-center gap-2 inline-flex"
							on:mouseover={() => (addAnotherEstablishment = false)}
							on:focus
							disabled={formHasErrors}
						
						>
							<div
								class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal"
							>
								Continue
							</div>
						</button>
						
						<!-- {#if formHasErrors}<div class="invalid text-xs text-text-text-on-surface-accent">
								Correct form errors
							</div>{/if} -->
					</div>
				</div>
			</form>
		</div>
	</div>
</div>


	<!-- disabled={formHasCustomError} -->