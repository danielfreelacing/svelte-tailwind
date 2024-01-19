<script lang="ts">
	import Account from '$lib/components/settings/account.svelte';
	import Merchant from '$lib/components/settings/merchant/merchant.svelte';
	import SvgEmptyAvatar from '$lib/components/common/image/svg-empty-avatar.svelte';
	import SvgMerchant from '$lib/components/common/image/svg-merchant.svelte';

	export let data: any;

	$: selMenuKey = 'account';

	const MENUS: {
		[key: string]: {
			image: any;
			name: string;
		};
	} = {
		account: {
			image: SvgEmptyAvatar,
			name: 'Account'
		},
		merchant: {
			image: SvgMerchant,
			name: 'Merchant'
		}
	};

	const MENU_KEY_ARR = Object.keys(MENUS);
</script>

<div class="flex flex-col gap-8 px-4 py-8 leading-6 tracking-tight">
	<div class="text-2xl font-semibold text-on-surface-primary">Settings</div>
	<div class="flex flex-col w-full gap-4 sm:flex-row">
		<div class="flex flex-row items-start gap-4 sm:flex-col sm:gap-0 sm:items-stretch">
			{#each MENU_KEY_ARR as menuKey, index}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="px-0 sm:px-4 pb-4 sm:pt-4 sm:border-l sm:border-r border-on-surface-placeholder flex items-center gap-2 cursor-pointer min-w-max
						{selMenuKey === menuKey
						? 'sm:bg-button-secondary-pressed text-on-surface-primary border-b-4 border-b-surface-surface-accent sm:border-b-0'
						: 'bg-white text-on-surface-secondary'}
						{index === 0 && 'sm:border-t sm:rounded-tl-lg sm:rounded-tr-lg'}
						{index === MENU_KEY_ARR.length - 1 && 'sm:border-b sm:rounded-bl-lg sm:rounded-br-lg'}"
					on:click={() => (selMenuKey = menuKey)}
				>
					<!-- <img class="w-6" src={MENUS[menuKey]?.image} alt="" /> -->
					<svelte:component
						this={MENUS[menuKey]?.image}
						fill={selMenuKey === menuKey ? '0xe8e8e8' : 'rgb(132 134 142)'}
					/>
					<div class="font-semibold">
						{MENUS[menuKey]?.name}
					</div>
				</div>
			{/each}
		</div>
		{#if selMenuKey === 'account'}
			<Account superFormData={data.settingsAccountForm} />
		{/if}
		{#if selMenuKey === 'merchant'}
			<Merchant />
		{/if}
	</div>
</div>
