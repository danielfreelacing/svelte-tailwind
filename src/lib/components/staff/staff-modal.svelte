<script lang="ts">
	import CustomInput from '$lib/components/common/input/custom-input.svelte';
	import RedButton from '$lib/components/common/button/red-button.svelte';
	import GrayButton from '$lib/components/common/button/gray-button.svelte';
	import CustomCropper from '$lib/components/common/input/custom-cropper.svelte';
	import ConfirmModal from '$lib/components/common/modal/confirm-modal.svelte';
	import { getContextClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import AlertModal from '$lib/components/common/modal/alert-modal.svelte';
	import CustomSelect from '$lib/components/common/input/custom-select.svelte';
	import { canBeCropped, convertBlobUrlToFile } from '$lib/utilities/common';
	import CustomModal from '$lib/components/common/modal/custom-modal.svelte';
	import CustomSwitcher from '$lib/components/common/input/custom-switcher.svelte';
	import {
		establishmentArr,
		selStaffIndex,
		showStaffModal,
		staffArr,
		staffPayTypeArr,
		staffRoleArr,
		staffTableArr
	} from '$lib/stores/staffStore';
	import { staffSchema } from '$lib/schemas/staff/zods';
	import { mutationUploadContent } from '$lib/schemas/settings/mutations';
	import { mutationStaffCreate, mutationStaffUpdate } from '$lib/schemas/staff/mutations';
	import type { StaffType } from '$lib/types/staff';

	export let selStaff: StaffType;

	$: showDeleteConfirmModal = false;
	$: showSaveConfirmModal = false;
	$: errors = <any>{};
	$: alertMessage = '';
	$: saving = false;

	console.log('staff-modal: $page.data: ', $page.data);

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
		// TODO (Gui): No need for now
		saving = false;
	};

	const onCancel = () => {
		showStaffModal.set(false);
	};

	const onSave = () => {
		const parseRes = staffSchema.safeParse(selStaff);
		console.log('staff-modal#onSaveSave: parseRes: ', parseRes, selStaff);
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

		if (selStaff.photo && canBeCropped(selStaff.photo)) {
			const logoFile = await convertBlobUrlToFile(
				selStaff.photo,
				(Math.random() * 1000).toString()
			);
			const uploadContentRes = await urqlClient.mutation(mutationUploadContent, {
				req: { file: logoFile }
			});
			const uploadedPath = uploadContentRes?.data?.contentUpload?.url;

			if (uploadedPath) {
				console.log('staff-modal#onSaveSave: uploadedPath: ', uploadedPath);
				selStaff.photo = `${contentHostUrl}/${uploadedPath}`;
			}
		}

		if ($selStaffIndex >= 0 && selStaff.id) {
			const staffData = {
				req: {
					id: selStaff.id,
					placeId: selStaff.establishment,
					firstName: selStaff.firstName,
					lastName: selStaff.lastName,
					profilePicturePath: selStaff.photo,
					role: selStaff.role,
					status: selStaff.status,
					email: selStaff.email,
					phoneNumber: selStaff.number,
					isTipsEligible: selStaff.tips,
					isOvertimeExempt: selStaff.overtimeExempt,
					passcode: selStaff.passCode,
					wageType: selStaff.payType,
					wageRate: selStaff.hourlyRate,
					assignedTableIds: []
				}
			};
			console.log('staff-modal#onSaveSave: staffData: ', staffData);
			const staffUpdateRes = await urqlClient.mutation(mutationStaffUpdate, staffData);
			console.log('staff-modal#onSaveSave: staffUpdateRes: ', staffUpdateRes);

			if (staffUpdateRes?.error) {
				alertMessage = 'Failed.';
			} else {
				alertMessage = 'Updated successfully.';
				staffArr.setValue($selStaffIndex, selStaff);
			}
		} else {
			const staffData = {
				req: {
					placeId: selStaff.establishment,
					firstName: selStaff.firstName,
					lastName: selStaff.lastName,
					profilePicturePath: selStaff.photo,
					role: selStaff.role,
					status: selStaff.status,
					email: selStaff.email,
					phoneNumber: selStaff.number,
					isTipsEligible: selStaff.tips,
					isOvertimeExempt: selStaff.overtimeExempt,
					passcode: selStaff.passCode,
					wageType: selStaff.payType,
					wageRate: selStaff.hourlyRate,
					assignedTableIds: []
				}
			};
			console.log('staff-modal#onSaveSave: staffData: ', staffData);
			const staffCreateRes = await urqlClient.mutation(mutationStaffCreate, staffData);
			console.log('staff-modal#onSaveSave: staffCreateRes: ', staffCreateRes);
			const id = staffCreateRes?.data?.staffCreate?.staff?.id;

			if (id) {
				alertMessage = 'Created successfully.';
				selStaff.id = id;
				staffArr.addValue(selStaff);
			} else {
				alertMessage = 'Failed.';
			}
		}

		showStaffModal.set(false);
		saving = false;
	};
</script>

<CustomModal show={$showStaffModal} onClose={onCancel}>
	<div class="flex flex-col gap-4 min-w-[20rem]">
		<div class="flex">
			<div class="text-2xl font-semibold text-on-surface-primary">
				{selStaff ? 'Edit staff' : 'Add staff'}
			</div>
		</div>
		<CustomCropper height="10rem" bind:image={selStaff.photo} error={errors.photo} />
		<CustomInput label="First name" bind:value={selStaff.firstName} error={errors.firstName} />
		<CustomInput label="Last name" bind:value={selStaff.lastName} error={errors.lastName} />
		<CustomSelect
			label="Establishment"
			itemArr={$establishmentArr}
			bind:value={selStaff.establishment}
			error={errors.establishment}
		/>
		<CustomSelect
			label="Role"
			itemArr={$staffRoleArr}
			bind:value={selStaff.role}
			error={errors.role}
		/>
		<CustomSwitcher label="Tips" bind:checked={selStaff.tips} error={errors.tips} />
		<CustomSelect
			label="Pay type"
			itemArr={$staffPayTypeArr}
			bind:value={selStaff.payType}
			error={errors.payType}
		/>
		<CustomInput
			label="Hourly rate"
			type="number"
			bind:value={selStaff.hourlyRate}
			error={errors.hourlyRate}
		/>
		<CustomSelect
			label="Tables assigned"
			itemArr={$staffTableArr}
			bind:value={selStaff.tablesAssigned}
			error={errors.tablesAssigned}
		/>
		<CustomInput label="PassCode" bind:value={selStaff.passCode} error={errors.passCode} />
		<CustomInput label="Number" bind:value={selStaff.number} error={errors.number} />
		<CustomInput label="Email" type="email" bind:value={selStaff.email} error={errors.email} />
		<CustomSwitcher
			label="Overtime exempt"
			bind:checked={selStaff.overtimeExempt}
			error={errors.overtimeExempt}
		/>
		<div class="flex items-center justify-end gap-4">
			<GrayButton name="Cancel" onClick={onCancel} />
			<RedButton className={saving ? 'animate-pulse' : ''} name="Save" onClick={onSave} />
		</div>
	</div>
</CustomModal>

<ConfirmModal
	className="w-80 whitespace-normal"
	show={showDeleteConfirmModal}
	onClose={onCancelDelete}
	yesLabel="Delete"
	onYes={onDeleteDelete}
	noLabel="Cancel"
	onNo={onCancelDelete}
>
	<div class="text-xl font-semibold">Delete staff?</div>
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
	<div class="text-xl font-semibold">Save staff?</div>
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
