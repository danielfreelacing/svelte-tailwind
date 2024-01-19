<script lang="ts">
	import {
		selStaffIndex,
		showStaffModal,
		showStaffRightBar,
		staffArr
	} from '$lib/stores/staffStore';
	import SvgUploadImage from '$lib/icons/upload-image.svg';
	import SvgUserAvatarOutline from '$lib/icons/user_avatar_outline.svg';
	import CustomInput from '../common/input/custom-input.svelte';
	import CustomSwitcher from '../common/input/custom-switcher.svelte';
	import Icon from '@iconify/svelte';
	import { hideStr } from '$lib/utilities/common';
	import { isMobile } from '$lib/stores/windowSizeStore';

	$: selStaff = $staffArr[$selStaffIndex];

	const onClose = () => {
		showStaffRightBar.set(false);
	};

	const onEdit = () => {
		showStaffModal.set(true);
	};
</script>

{#if $showStaffRightBar}
	<div
		class="fixed top-0 right-0 flex flex-col h-screen gap-12 p-8 pb-12 overflow-x-hidden overflow-y-auto bg-white StaffRightBar
			{$isMobile ? 'w-full' : 'w-1/3'}"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="absolute cursor-pointer right-4 top-4" on:click={onClose}>
			<Icon icon="mdi:close" />
		</div>
		<div class="flex items-center gap-4 text-xl font-semibold">
			{#if selStaff?.firstName || selStaff?.lastName}
				<div>{`${selStaff.firstName || ''} ${selStaff.lastName || ''}`}</div>
			{:else}
				<div>Anonymous</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="cursor-pointer" on:click={onEdit}>
				<Icon icon="ri:edit-line" />
			</div>
		</div>
		<div class="flex items-center justify-center gap-4">
			<div class="flex items-center justify-center w-32 h-32 rounded-full bg-surface-surface-3">
				{#if selStaff?.photo}
					<img class="w-full h-full rounded-full" src={selStaff.photo} alt="" />
				{:else}
					<img class="w-12 h-12 rounded-full" src={SvgUserAvatarOutline} alt="" />
				{/if}
			</div>
			<!-- <div class="p-2 border cursor-pointer rounded-xl">
				<img class="w-4 h-4" src={SvgUploadImage} alt="" />
			</div> -->
		</div>
		<div class="flex flex-col gap-4">
			<div class="text-xl font-semibold">Personal info</div>
			<div class="flex gap-4">
				<CustomInput className="w-full" label="First name" value={selStaff?.firstName} disabled />
				<CustomInput className="w-full" label="Last name" value={selStaff?.lastName} disabled />
			</div>
			<div class="flex gap-4">
				<CustomInput className="w-full" label="Email" value={selStaff?.email} disabled />
				<CustomInput className="w-full" label="Number" value={selStaff?.number} disabled />
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<div class="text-xl font-semibold">Job</div>
			<div class="flex gap-4">
				<CustomInput
					className="w-full"
					label="Wages & Tips"
					value={`$${selStaff?.hourlyRate}/hr, Tip ${selStaff?.tips ? 'eligible' : 'ineligible'}`}
					disabled
				/>
				<CustomInput className="w-full" label="Role" value={selStaff?.role} disabled />
			</div>
			<CustomSwitcher label="Overtime exempt" checked={selStaff?.overtimeExempt} disabled />
		</div>
		<div class="flex flex-col gap-4">
			<div class="text-xl font-semibold">Permissions</div>
			<div class="flex items-center gap-2">
				{#if selStaff?.showPassCode}
					<Icon icon="mdi:eye-outline" />
					<div>{selStaff.passCode}</div>
				{:else}
					<Icon icon="mdi:eye-off-outline" />
					<div>{selStaff?.passCode && hideStr(selStaff.passCode)}</div>
				{/if}
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<div class="text-xl font-semibold">Tables</div>
			<CustomInput
				className="w-full"
				label="Tables assigned"
				value={selStaff?.tablesAssigned || 'No tables'}
				disabled
			/>
		</div>
	</div>
{/if}
