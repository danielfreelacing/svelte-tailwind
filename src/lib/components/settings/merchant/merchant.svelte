<script lang="ts">
	import Establishment from './establishment.svelte';
	import Plus from '$lib/icons/plus.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getContextClient } from '@urql/svelte';
	import { queryEstablishmentTypeList, queryPlaceList } from '$lib/schemas/settings/queries';
	import type { SelectItemType } from '$lib/types/common';
	import { mutationPlaceDelete } from '$lib/schemas/settings/mutations';
	import AlertModal from '$lib/components/common/modal/alert-modal.svelte';

	$: establishmentArr = <any>[];
	$: typeItemArr = <SelectItemType[]>[];
	$: alertMessage = '';

	const urqlClient = getContextClient();
	const merchantId = $page.data?.merchant?.id;
	console.log('merchant: merchantId: ', merchantId);

	onMount(async () => {
		if (merchantId) {
			const establishmentTypeListRes = await urqlClient.query(queryEstablishmentTypeList, {});
			console.log('merchant#onMount: establishmentTypeListRes: ', establishmentTypeListRes);
			const establishmentTypeArr = establishmentTypeListRes?.data?.establishmentTypeList?.types;

			if (establishmentTypeArr?.length) {
				typeItemArr = establishmentTypeArr.map((type: any) => ({
					label: type.name,
					value: type.id
				}));
			}

			const placeListRes = await urqlClient.query(queryPlaceList, { req: { merchantId } });
			console.log('merchant#onMount: placeListRes: ', placeListRes);
			const placeArr = placeListRes?.data?.placeList?.places;

			if (placeArr?.length) {
				establishmentArr = placeArr.map((place: any) => ({
					id: place?.id,
					logoUrl: place?.logoUrl,
					name: place?.name,
					description: place?.description,
					typeId: place?.establishmentType?.id,
					typeName: place?.establishmentType?.name,
					addressId: place?.address?.id,
					addressLine1: place?.address?.addressLine1,
					addressLine2: place?.address?.addressLine2,
					city: place?.address?.city,
					postcode: place?.address?.postcode,
					country: place?.address?.country
				}));
			}
		}
	});

	const onAdd = () => {
		establishmentArr = [
			...establishmentArr,
			{
				id: '',
				logoUrl: '',
				name: `Place ${establishmentArr.length + 1}`,
				description: '',
				typeId: '',
				typeName: '',
				addressId: '',
				addressLine1: '',
				addressLine2: '',
				city: '',
				postcode: '',
				country: ''
			}
		];
	};

	const onRemove = async (index: number) => {
		const id = establishmentArr[index]?.id;

		if (merchantId && id) {
			const cond = { req: { merchantId, id } };
			console.log('merchant#onRemove: cond: ', cond);
			const placeDeleteRes = await urqlClient.mutation(mutationPlaceDelete, cond);
			console.log('merchant#onRemove: placeDeleteRes: ', placeDeleteRes);
			const isSuccess = placeDeleteRes?.data?.placeDelete;

			if (isSuccess) {
				establishmentArr = establishmentArr.filter((val: any, i: number) => i !== index)
				alertMessage = 'Deleted successfully.';
			} else {
				alertMessage = 'Failed.';
			}
		}
	};
</script>

<div class="flex flex-col gap-4 font-poppins">
	{#each establishmentArr as establishment, index}
		<Establishment bind:establishment {index} {onRemove} {typeItemArr} />
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="flex items-center gap-2 p-4 bg-white border rounded-lg cursor-pointer border-on-surface-placeholder"
		on:click={onAdd}
	>
		<img class="w-6 h-6" src={Plus} alt="" />
		<div class="flex items-center text-lg font-semibold">Add another establishment</div>
	</div>
</div>

<AlertModal
	show={!!alertMessage}
	onClose={() => {
		alertMessage = '';
	}}
>
	<div class="p-8 text-2xl font-semibold">{alertMessage}</div>
</AlertModal>
