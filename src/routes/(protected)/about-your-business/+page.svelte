<script lang="ts">
	import MerchantForm from '$lib/components/signinflowpages/merchantForm.svelte';
	import LogoText from '$lib/icons/logo_text_red.svg';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import localAddressStore from '$lib/stores/addressStore';
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let avatarImageUrl: string

	$: console.log(" this is page data:", data)
	$: console.log(" this is page data in form:", form)
	$: console.log(" this is avatarImageUrl:", avatarImageUrl)

	let addressSame: boolean = false
	const merchantTypeList = data.merchantTypeList;
	let merchantTypeSelected: {id: string, name: string} = { id: '', name: ''}

	$: console.log("merchantTypeSelected is now", merchantTypeSelected)

	// console.log("data in page.svelte", data)

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.uploadMerchantDataForm, {
		validators: {
			merchantName: (name: string) =>
				name?.length < 3 ? 'Name must be at least 3 characters' : null
		},
		validationMethod: 'oninput',
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

<div class=" py-[80px] sm:container mx-auto ">
	<div class="w-[375px] sm:w-[600px] mx-auto">
		<div class="w-[600px] flex-col justify-start items-start gap-16 inline-flex">
			<div class="w-[92px] h-8 relative">
				<img src={LogoText} alt="logo icon" />
			</div>
			<form method="POST" use:enhance class="w-full" action="?/uploadMerchantData">
				<div class="self-stretch flex-col justify-start items-start gap-6 sm:gap-10 flex">
					<div class="self-stretch flex-col justify-start items-start gap-4 flex">
						<div
							class="self-stretch text-zinc-900 text-2xl sm:text-[40px] font-semibold font-['Poppins'] leading-normal sm:leading-10"
						>
							Tell us about your business
						</div>
						<div
							class="self-stretch text-zinc-900 text-base sm:text-base font-normal font-['Poppins'] leading-normal sm:leading-loose"
						>
							We want to make sure you know exactly how Zulzi can meet your business’s unique needs.
							Fill out the information below so we can provide specific information about how Zulzi
							can work for your business.
						</div>
					</div>

					<MerchantForm {form} {merchantTypeList} {errors} {constraints} bind:merchantTypeSelected={merchantTypeSelected} bind:avatarImageUrl={avatarImageUrl}/>
					<input type="hidden" id="customId" name="avatarImageUrl" value={avatarImageUrl}>
					<input type="hidden" id="customId2" name="merchantTypeId" value={merchantTypeSelected.id}>

					<div class="w-[600px] h-6 justify-start items-center gap-1 inline-flex">
						<div
							class="w-[520px] grow shrink basis-0 text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight"
						>
							I only have 1 store/restuarant/bar and information is the same as for merchant
						</div>
						<div class="w-9 h-6 relative">
							<Switch bind:checked={addressSame} />
						</div>
					</div>

					<div
						class="w-[600px] text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
					>
						By continuing, I agree this information is correct.
					</div>
					<button on:click={() => addressSame === true ? handleClientSaveAddress() : null}
						class="w-[600px] self-stretch px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 inline-flex"
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
