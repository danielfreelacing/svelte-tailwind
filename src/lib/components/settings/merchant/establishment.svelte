<script lang="ts">
	import CustomInput from '../../common/input/custom-input.svelte';
	import RedButton from '../../common/button/red-button.svelte';
	import GrayButton from '../../common/button/gray-button.svelte';
	import CustomTextarea from '../../common/textarea/custom-textarea.svelte';
	import CustomCropper from '$lib/components/common/input/custom-cropper.svelte';
	import ConfirmModal from '$lib/components/common/modal/confirm-modal.svelte';
	import { getContextClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import {
		mutationAddressCreate,
		mutationAddressUpdate,
		mutationPlaceCreate,
		mutationPlaceUpdate,
		mutationUploadContent
	} from '$lib/schemas/settings/mutations';
	import AlertModal from '$lib/components/common/modal/alert-modal.svelte';
	import type { SettingsEstablishmentType } from '$lib/types/settings/merchant';
	import { settingsEstablishmentSchema } from '$lib/schemas/settings/zods';
	import type { SelectItemType } from '$lib/types/common';
	import CustomSelect from '$lib/components/common/input/custom-select.svelte';
	import { canBeCropped, convertBlobUrlToFile } from '$lib/utilities/common';

	export let establishment: SettingsEstablishmentType;
	export let index: number;
	export let onRemove: Function;
	export let typeItemArr: SelectItemType[];

	$: inputFile = <any>undefined;
	$: showDeleteConfirmModal = false;
	$: showSaveConfirmModal = false;
	$: errors = <any>{};
	$: alertMessage = '';
	$: edit = false;
	$: saving = false;

	const urqlClient = getContextClient();
	const contentHostUrl = $page.data.contentHostUrl;

	const onDelete = () => {
		showDeleteConfirmModal = true;
	};

	const onCancelDelete = () => {
		showDeleteConfirmModal = false;
	};

	const onDeleteDelete = async () => {
		if (saving) {
			return;
		}

		saving = true;
		showDeleteConfirmModal = false;
		await onRemove(index);
		saving = false;
	};

	const onEdit = () => {
		edit = true;
	};

	const onUpload = () => {
		if (inputFile) {
			inputFile.click();
		}
	};

	const onCancel = () => {
		edit = false;
	};

	const onSave = () => {
		const parseRes = settingsEstablishmentSchema.safeParse(establishment);
		console.log('establishment#onSaveSave: parseRes: ', parseRes, establishment);
		errors = {};

		if (parseRes.success) {
			showSaveConfirmModal = true;
		} else {
			parseRes?.error?.issues?.forEach((issue: any) => {
				const errorKey = issue?.path[0];

				if (errorKey && issue?.message) {
					errors[errorKey] = [issue.message];
				}
			});
		}
	};

	const onCancelSave = () => {
		showSaveConfirmModal = false;
	};

	const onSaveSave = async () => {
		if (saving) {
			return;
		}

		showSaveConfirmModal = false;
		saving = true;
		const merchantId = $page.data?.merchant?.id;

		if (merchantId) {
			let placeCreateRes, placeUpdateRes, addressCreateRes, addressUpdateRes;

			if (establishment.addressId) {
				const addressData = {
					req: {
						id: establishment.addressId,
						addressLine1: establishment.addressLine1,
						addressLine2: establishment.addressLine2,
						city: establishment.city,
						country: establishment.country,
						postcode: establishment.postcode
					}
				};
				addressUpdateRes = await urqlClient.mutation(mutationAddressUpdate, addressData);
				console.log(
					'establishment#onSaveSave: addressUpdateRes?.error: ',
					addressUpdateRes?.error,
					addressData
				);
			} else {
				const addressData = {
					req: {
						addressLine1: establishment.addressLine1,
						addressLine2: establishment.addressLine2,
						city: establishment.city,
						country: establishment.country,
						postcode: establishment.postcode
					}
				};
				addressCreateRes = await urqlClient.mutation(mutationAddressCreate, addressData);
				const addressId = addressCreateRes?.data?.addressCreate?.address?.id;
				console.log(
					'establishment#onSaveSave: addressCreateRes?.error: ',
					addressCreateRes?.error,
					addressData
				);

				if (!addressCreateRes?.error && addressId) {
					establishment.addressId = addressId;
				}
			}

			if (establishment.addressId) {
				console.log('establishment#onSaveSave: establishment.logoUrl: ', establishment.logoUrl);

				if (establishment.logoUrl && canBeCropped(establishment.logoUrl)) {
					const logoFile = await convertBlobUrlToFile(
						establishment.logoUrl,
						establishment.addressId + Math.random()
					);
					const uploadContentRes = await urqlClient.mutation(mutationUploadContent, {
						req: { file: logoFile }
					});
					const uploadedPath = uploadContentRes?.data?.contentUpload?.url;

					if (uploadedPath) {
						console.log('establishment#onSaveSave: uploadedPath: ', uploadedPath);
						establishment.logoUrl = `${contentHostUrl}/${uploadedPath}`;
					}
				}

				if (establishment.id) {
					const placeData = {
						req: {
							id: establishment.id,
							merchantId,
							establishmentTypeId: establishment.typeId,
							name: establishment.name,
							description: establishment.description,
							addressId: establishment.addressId,
							logoUrl: establishment.logoUrl
						}
					};
					placeUpdateRes = await urqlClient.mutation(mutationPlaceUpdate, placeData);
					console.log(
						'establishment#onSaveSave: placeUpdateRes?.error: ',
						placeUpdateRes?.error,
						placeData
					);
				} else {
					const placeData = {
						req: {
							merchantId,
							establishmentTypeId: establishment.typeId,
							name: establishment.name,
							description: establishment.description,
							addressId: establishment.addressId,
							logoUrl: establishment.logoUrl
						}
					};
					placeCreateRes = await urqlClient.mutation(mutationPlaceCreate, placeData);
					console.log(
						'establishment#onSaveSave: placeCreateRes?.error: ',
						placeCreateRes?.error,
						placeData
					);
				}
			}

			if (
				placeCreateRes?.error ||
				placeUpdateRes?.error ||
				addressCreateRes?.error ||
				addressUpdateRes?.error
			) {
				alertMessage = 'Connection failed.';
			} else {
				alertMessage = 'Saved successfully.';
				edit = false;
			}
		}
		saving = false;
	};
</script>

<div
	class="flex flex-col gap-8 p-4 bg-white border rounded-lg font-poppins border-on-surface-placeholder"
>
	<div class="flex flex-col gap-3">
		<div class="text-lg font-semibold">{establishment.name}</div>
		<div class="flex items-center gap-4">
			<div class="w-40 h-40">
				<CustomCropper
					bind:image={establishment.logoUrl}
					enableEdit={edit}
					bind:inputFile
					error={errors.logoUrl}
				/>
			</div>
			{#if edit}
				<div class="flex flex-col gap-2">
					<div class="font-semibold text-text-text-on-surface-primary">Add your logo</div>
					<GrayButton name="Upload" onClick={onUpload} />
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap gap-4">
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Merchant name"
				bind:value={establishment.name}
				disabled={!edit}
				error={errors.name}
			/>
			<CustomSelect
				className="w-full sm:w-40 flex-grow"
				itemArr={typeItemArr}
				label="Merchant type"
				bind:value={establishment.typeId}
				disabled={!edit}
				error={errors.typeId}
			/>
		</div>
		<CustomTextarea
			className="w-full"
			label="Merchant description"
			bind:value={establishment.description}
			disabled={!edit}
			error={errors.description}
		/>
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap gap-4">
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Business address Line 1"
				bind:value={establishment.addressLine1}
				disabled={!edit}
				error={errors.addressLine1}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Business address Line 2 (Optional)"
				bind:value={establishment.addressLine2}
				disabled={!edit}
				error={errors.addressLine2}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Town/City"
				bind:value={establishment.city}
				disabled={!edit}
				error={errors.city}
			/>
		</div>
		<div class="flex flex-wrap gap-4">
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Country"
				bind:value={establishment.country}
				disabled={!edit}
				error={errors.country}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Postcode"
				bind:value={establishment.postcode}
				disabled={!edit}
				error={errors.postcode}
			/>
		</div>
	</div>
	<div class="flex items-start justify-end gap-4">
		{#if edit}
			<GrayButton name="Cancel" onClick={onCancel} />
			<RedButton className={saving ? 'animate-pulse' : ''} name="Save" onClick={onSave} />
		{:else}
			<GrayButton className={saving ? 'animate-pulse' : ''} name="Delete" onClick={onDelete} />
			<RedButton name="Edit" onClick={onEdit} />
		{/if}
	</div>
</div>

<ConfirmModal
	className="w-80 whitespace-normal"
	show={showDeleteConfirmModal}
	onClose={onCancelDelete}
	yesLabel="Delete"
	onYes={onDeleteDelete}
	noLabel="Cancel"
	onNo={onCancelDelete}
>
	<div class="text-xl font-semibold">Delete establishment?</div>
	<div>Are you sure you want to delete?</div>
</ConfirmModal>

<ConfirmModal
	className="w-80 whitespace-normal"
	show={showSaveConfirmModal}
	onClose={onCancelSave}
	yesLabel="Save"
	onYes={onSaveSave}
	noLabel="Cancel"
	onNo={onCancelSave}
>
	<div class="text-xl font-semibold">Save establishment?</div>
	<div>Are you sure you want to save?</div>
</ConfirmModal>

<AlertModal
	show={!!alertMessage}
	onClose={() => {
		alertMessage = '';
	}}
>
	<div class="p-8 text-2xl font-semibold">{alertMessage}</div>
</AlertModal>
