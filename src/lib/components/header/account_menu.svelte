<script lang="ts">
	import ExitPopdown from '$lib/icons/exit_popdown.svg';
	import EstablishmentLogo from '$lib/icons/establishment_logo.svg';
	import SignOut from '$lib/icons/sign_out.svg';
	import AddPlus from '$lib/icons/add_plus.svg';
	import merchantStore from '$lib/stores/merchantStore';
	import appStateStore from '$lib/stores/appStateStore';

	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';

	export let accountMenuShows
	// console.log('merchantStore in account menu', $merchantStore);

	$: placeList = $page.data.placeList;
//   $: console.log("placeList in account menu", $page.data.placeList)
  let contentHostUrl = $page.data.contentHostUrl
//  console.log('contentHostUrl', contentHostUrl);

	// $: console.log("placeList in account menu", $page.data.placeList)

	// console.log("$appStateStore.activeEstablishmentIndex", $appStateStore.activeEstablishmentIndex)

	$: activeEstablishment = placeList && placeList[$appStateStore.activeEstablishmentIndex];
</script>

<div
	class="absolute z-10 right-4 w-[289px]  bg-white rounded-xl shadow border border-gray-200 flex-col justify-start items-start inline-flex"
>
	<div class="w-[289px] relative px-4 pt-6 pb-3 justify-start items-center gap-2 inline-flex">
		<div class="grow shrink basis-0 flex-col justify-center items-center gap-3 inline-flex">
			<div class="flex-col justify-center items-center flex">
				<div
					class="text-text-text-on-surface-primary text-sm font-semibold font-['Poppins'] leading-tight"
				>
					{activeEstablishment?.name}
				</div>
				<div
					class="text-text-text-on-surface-secondary text-xs font-normal font-['Poppins'] leading-tight"
				>
					{$merchantStore?.name}
				</div>
			</div>
			<img
				class="w-16 h-16 rounded-[999px] border border-gray-200"
				src={ contentHostUrl + '/' + activeEstablishment?.logoUrl}
				alt="establishment logo"
			/>
		</div>
	</div>

	<button
		class=" absolute right-3 top-3 w-6 h-6 justify-center items-center inline-flex"
		on:click={() => (accountMenuShows = false)}
	>
		<div class="w-6 h-6 relative">
			<img src={ExitPopdown} alt="exit icon" />
		</div>
	</button>

	<div
		class="self-stretch h-12 p-4 border-b border-gray-200 flex-col justify-center items-center gap-2 flex"
	>
		<button class="w-2/3 h-12 p-4 rounded-[999px] justify-center items-center gap-2 inline-flex"
		on:click={() =>  { accountMenuShows = false; goto('/settings')} }>
			<div class="text-center text-blue-800 text-sm font-semibold font-['Poppins'] leading-none">
				Account settings
			</div>
		</button>
	</div>
	<div class="self-stretch px-4 pt-4 justify-start items-start gap-2 inline-flex">
		<div
			class="text-text-text-on-surface-placeholder text-[11px] font-semibold font-['Poppins'] uppercase leading-none tracking-wide"
		>
			Other establishments
		</div>
	</div>
	
	{#each placeList && placeList as place, index}
		<button
			class="w-[289px] px-4 py-3 justify-start items-center gap-2 inline-flex"
			on:click={() => {
				appStateStore.setActiveEstablishmentIndex(index);
				accountMenuShows = false;
			}}
		>
			<div class="justify-end items-center gap-3 flex">
				
					<img class="w-16 h-16 rounded-[999px] border border-gray-200" src={ contentHostUrl + '/' +  place.logoUrl} alt="establishment logo" />
				
				<div class="flex-col justify-center items-start inline-flex">
					<div
						class="text-text-text-on-surface-primary text-sm font-semibold font-['Poppins'] leading-tight"
					>
						{place.name}
					</div>

					<!-- <div
					class="text-text-text-on-surface-secondary text-xs font-normal font-['Poppins'] leading-tight"
				>
					Merchant name 1
				</div> -->
				</div>
			</div>
		</button>
	{/each}

	<div class="self-stretch h-14 p-4 border-t border-gray-200  flex-col justify-start items-start gap-2 flex">
		<div class="rounded-[999px] justify-center items-center gap-2 inline-flex">
			<div class="w-6 h-6 justify-center items-center flex">
				<div class="w-6 h-6 relative">
					<img src={AddPlus} alt="add item" />
				</div>
			</div>
			<div class="text-center text-blue-800 text-sm font-semibold font-['Poppins'] leading-none">
				Add another establishment
			</div>
		</div>
	</div>
	<div
		class="self-stretch h-14 p-4 border-t border-gray-200 flex-col justify-start items-start gap-2 flex"
	>
		<button class=" justify-center items-center gap-2 inline-flex"
		on:click={() => {accountMenuShows = false;   goto('/signout')}}>
			<div class="w-6 h-6 justify-center items-center flex">
				<div class="w-6 h-6 relative">
					<img src={SignOut} alt="signout" />
				</div>
			</div>
			<div class="text-center text-blue-800 text-sm font-semibold font-['Poppins'] leading-none">
				Sign out
			</div>
		</button>
	</div>
</div>
