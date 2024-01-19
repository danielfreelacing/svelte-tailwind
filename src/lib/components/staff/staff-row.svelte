<script lang="ts">
	import {
		selStaffIndex,
		showStaffModal,
		staffArr,
		showStaffRightBar
	} from '$lib/stores/staffStore';
	import { createPopper } from '@popperjs/core';
	import ConfirmModal from '../common/modal/confirm-modal.svelte';
	import { hideStr } from '$lib/utilities/common';
	import SvgUserAvatarOutline from '$lib/icons/user_avatar_outline.svg';
	import CustomInput from '../common/input/custom-input.svelte';
	import type { StaffType } from '$lib/types/staff';
	import Icon from '@iconify/svelte';
	import { clickOutsideAction } from '../common/actions/clickOutsideAction';
	import { getContextClient } from '@urql/svelte';
	import { mutationStaffDelete } from '$lib/schemas/staff/mutations';
	import AlertModal from '$lib/components/common/modal/alert-modal.svelte';

	export let staff: StaffType = {};
	export let staffIndex: number = -1;

	$: showDeleteConfirmModal = false;
	$: isExpanded = false;
	$: alertMessage = '';

	const urqlClient = getContextClient();

	// Dropdown
	let dropdownPopoverShow = false;
	let btnDropdownRef: any;
	let popoverDropdownRef: any;

	const toggleDropdown = () => {
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};

	// Events
	const onEdit = () => {
		selStaffIndex.set(staffIndex);
		showStaffModal.set(true);
	};

	const onDelete = () => {
		selStaffIndex.set(staffIndex);
		showDeleteConfirmModal = true;
	};

	const onCancelDelete = () => {
		showDeleteConfirmModal = false;
	};

	const onDeleteDelete = async () => {
		const cond = {
			req: {
				placeId: staff.establishment,
				staffId: staff.id
			}
		};
		console.log('staff-row#onDeleteDelete: cond: ', cond);
		const staffDeleteRes = await urqlClient.mutation(mutationStaffDelete, cond);
		console.log('staff-row#onDeleteDelete: staffDeleteRes: ', staffDeleteRes);

		if (staffDeleteRes?.data?.staffDelete?.isSuccess) {
			alertMessage = 'Deleted successfully.';
			staffArr.removeValue(staffIndex);
			selStaffIndex.set(-1);
		} else {
			alertMessage = 'Failed.';
		}

		showDeleteConfirmModal = false;
	};

	const onSee = () => {
		selStaffIndex.set(staffIndex);
		showStaffRightBar.set(true);
	};
</script>

<div class="flex flex-col w-full gap-2">
	<div class="flex flex-col w-full gap-2 p-4 border rounded-lg border-on-surface-placeholder">
		<div class="flex items-center justify-between w-full">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex items-center gap-2 font-semibold cursor-pointer" on:click={onSee}>
				<img class="w-8 h-8 rounded-full" src={staff.photo || SvgUserAvatarOutline} alt="" />
				{#if staff.firstName || staff.lastName}
					<div>{`${staff.firstName || ''} ${staff.lastName || ''}`}</div>
				{:else}
					<div>Anonymous</div>
				{/if}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="relative"
				use:clickOutsideAction
				on:click={toggleDropdown}
				on:click_outside={() => {
					dropdownPopoverShow = false;
				}}
			>
				<Icon class="cursor-pointer" icon="ri:more-2-fill" bind:this={btnDropdownRef} />
				<div
					bind:this={popoverDropdownRef}
					class="bg-white absolute border-on-surface-placeholder border rounded flex flex-col p-4 gap-4 right-2
						{dropdownPopoverShow ? 'block' : 'hidden'}"
				>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="flex items-center gap-4 cursor-pointer" on:click={onEdit}>
						<Icon icon="ri:edit-line" />
						<div>Edit</div>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="flex items-center gap-4 cursor-pointer" on:click={onDelete}>
						<Icon icon="fluent:delete-32-regular" />
						<div>Delete</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center w-full gap-2">
			<CustomInput className="w-full" label="Role" value={staff.role} disabled />
			<CustomInput className="w-1/3" label="Tips" value={staff.tips ? 'Yes' : 'No'} disabled />
		</div>
		{#if isExpanded}
			<CustomInput label="Table" value={staff.tablesAssigned} disabled />
			<div class="flex items-center gap-2">
				<CustomInput className="w-full" label="Phone number" value={staff.number} disabled />
				<div class="flex flex-col w-1/3 text-on-surface-placeholder">
					<div class="text-xs">PassCode</div>
					<div class="flex items-center gap-1">
						{#if staff.showPassCode}
							<Icon class="cursor-pointer" icon="mdi:eye-outline" />
							<div>{staff.passCode}</div>
						{:else}
							<Icon class="cursor-pointer" icon="mdi:eye-off-outline" />
							<div>{staff.passCode && hideStr(staff.passCode)}</div>
						{/if}
					</div>
				</div>
			</div>
			<CustomInput label="Email" value={staff.email} disabled />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="flex items-center w-full gap-2 text-blue-500 cursor-pointer"
				on:click={() => (isExpanded = false)}
			>
				<Icon class="text-blue-50" icon="formkit:arrowup" bind:this={btnDropdownRef} />
				<div>Collapse</div>
			</div>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="flex items-center w-full gap-2 text-blue-500 cursor-pointer"
				on:click={() => (isExpanded = true)}
			>
				<Icon class="text-blue-500" icon="formkit:arrowdown" bind:this={btnDropdownRef} />
				<div>Expand</div>
			</div>
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
	<div class="text-xl font-semibold">Delete stuff?</div>
	<div>Are you sure you want to delete {staff.firstName} {staff.lastName}?</div>
</ConfirmModal>

<AlertModal
	show={!!alertMessage}
	onClose={() => {
		alertMessage = '';
	}}
>
	<div class="p-8 text-2xl font-semibold">{alertMessage}</div>
</AlertModal>
