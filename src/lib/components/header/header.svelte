<script lang="ts">
	import type { PlaceType } from './../../stores/types.ts';
	import H3 from '$lib/components/typography/h3.svelte';
	import EstablishmentLogo from '$lib/icons/establishment_logo.svg';
	import MobileLogo from '$lib/icons/mobile_logo.svg';
	import MenuLine from '$lib/icons/menu-line.svg';
	import Arrow_up from '$lib/icons/arrow_up.svg';
	import Arrow_down from '$lib/icons/arrow-down-s-line.svg';
	import Logo_text from '$lib/icons/logo_text.svg';
	import AccountMenu from './account_menu.svelte';
	import appStateStore from '$lib/stores/appStateStore';
	import merchantStore from '$lib/stores/merchantStore';
	import { page } from '$app/stores';
	import type { MerchantType } from '$lib/stores/merchantStore';
	import { onMount } from 'svelte';

	let accountMenuShows = false;
	$: pathName = $page.url.pathname;

	let placeList: PlaceType[] 
	let merchant: MerchantType 

	let contentHostUrl = $page.data.contentHostUrl
 console.log('contentHostUrl', contentHostUrl);

export let data: PageData;

console.log('data and pagedata in header', data, $page);
	// $: merchant = $merchantStore
	// $: placeList = $merchantStore.placeList = [{id: '', name: '', logoUrl: ''}]

	$: activeEstablishment = $page?.data?.placeList && $page?.data?.placeList[$appStateStore.activeEstablishmentIndex]

	$: console.log("activeEstablishment", activeEstablishment)
	$: merchant = $page?.data?.merchant
	
	function handleAccountMenuShows() {
		accountMenuShows === true ? (accountMenuShows = false) : (accountMenuShows = true);
	}

	// $: console.log("merchant in HEADER", merchant)
	// $: console.log('acc menu shows', accountMenuShows);
</script>

<div class="hidden sm:flex h-16 w-full bg-surface-surface-invert justify-between items-center">
	<div class="h-16 justify-start items-center gap-8 inline-flex">
		<div
			class="bg-theme-red text-on-invert-primary flex flex-row items-center \
            w-[140px] h-16 px-6 py-4 "
		>
			<div class="w-[92px] h-8 relative">
				<img src={Logo_text} alt="establishment logo" />
			</div>
		</div>

		<div class="h-[20px] flex flex-row gap-8">
			<a href="/items">
				<H3 classes="{pathName === '/items' ? 'text-white' : 'text-text-text-on-invert-secondary'} "
					>Items</H3
				></a
			>
			<a href="/orders">
				<H3
					classes="{pathName === '/orders' ? 'text-white' : 'text-text-text-on-invert-secondary'} "
					>Orders</H3
				></a
			>
			<a href="/zones">
				<H3 classes="{pathName === '/zones' ? 'text-white' : 'text-text-text-on-invert-secondary'} "
					>Zones</H3
				></a
			>
			<a href="/staff">
				<H3 classes="{pathName === '/staff' ? 'text-white' : 'text-text-text-on-invert-secondary'} "
					>Staff</H3
				></a
			>
			<a href="/stats">
				<H3 classes="{pathName === '/stats' ? 'text-white' : 'text-text-text-on-invert-secondary'} "
					>Stats</H3
				></a
			>
		</div>
	</div>

	{#if activeEstablishment?.name}
		<div class="w-[345px] h-10 px-4 justify-end items-center gap-2 inline-flex">
			<div class="w-[281px] h-10 justify-end items-center gap-3 inline-flex">
				<div class="w-[199px] h-10 flex-col justify-center items-end inline-flex">
					<div class="text-right text-white text-base font-semibold font-['Poppins'] leading-tight">
						{activeEstablishment?.name}
					</div>
					<div
						class="text-right text-white text-opacity-60 text-xs font-normal font-['Poppins'] leading-tight"
					>
						{merchant?.name}
					</div>
				</div>
				<div class="w-12 h-12 relative ">
				{#if activeEstablishment?.logoUrl !== undefined}
					<div class="w-12 h-12">
						<div
						class="w-12 h-12 left-[0px] top-[0px] rounded-full overlay absolute justify-center items-center inline-flex"
					>
							<img src={ contentHostUrl + '/' + activeEstablishment?.logoUrl} alt="merchant avatar" />
						</div>
					</div>
				{:else}
					<div class="w-12 h-12 relative">
						<div
							class="w-12 h-12 left-0 top-[-0px] rounded-full   overlay absolute justify-center items-center inline-flex"
						>
							<img src={EstablishmentLogo} alt="user avatar outline" />
						</div>
					</div>
				{/if}
				</div>
			</div>
			<div class="w-8 h-8 justify-center items-center inline-flex">
				{#if !accountMenuShows}
					<button class="w-8 h-8 relative" on:click={handleAccountMenuShows}>
						<img class="w-8 h-8 rotate-180" src={Arrow_up} alt="menu arrow" />
					</button>
				{:else}
					<button class="w-8 h-8 relative" on:click={handleAccountMenuShows}>
						<img class="w-8 h-8" src={Arrow_up} alt="menu arrow" />
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

{#if accountMenuShows}
	<AccountMenu bind:accountMenuShows  />
{/if}

<div class="flex sm:hidden h-16 px-4 py-3 bg-zinc-900 justify-between items-center">
	<div class="w-10 h-10 justify-center items-center flex">
		<div class="w-10 relative">
			<img src={MenuLine} alt="mobile zulzi logo" />
		</div>
	</div>
	<div class="w-10 h-10 relativerounded-lg">
		<img src={MobileLogo} alt="mobile zulzi logo" />
	</div>
	<div class="justify-end items-center gap-2 flex">
		<div class="justify-end items-center gap-3 flex">
			<img class="w-10 h-10 rounded-[999px]" src={EstablishmentLogo} alt="establishment logo" />
		</div>
	</div>
</div>



<style>

	::placeholder {
		color: #b3b5c0;
	}

	.overlay {
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50px;
		width: 100%;
		overflow: hidden;
	}
	.overlay:before {
		position: absolute;
		content: '';
		aspect-ratio: 1 / 1.42;
		height: 100%;
		top: 0;
		left: 50%;
		transform: translateX(-50%);

		/* box-shadow: 0px 0px 0px 145px rgba(0, 0, 0, 0.4); */
	}
</style>
