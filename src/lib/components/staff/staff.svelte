<script lang="ts">
	import RedButton from '../common/button/red-button.svelte';
	import {
		establishmentArr,
		selStaffIndex,
		showStaffModal,
		staffArr
	} from '$lib/stores/staffStore';
	import TableRow from './table-row.svelte';
	import StaffModal from './staff-modal.svelte';
	import StaffRightBar from './staff-right-bar.svelte';
	import StaffRow from './staff-row.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getContextClient } from '@urql/svelte';
	import { queryPlaceList } from '$lib/schemas/settings/queries';
	import { queryStaffs } from '$lib/schemas/staff/queries';
	import type { StaffType } from '$lib/types/staff';
	import {isMobile} from '$lib/stores/windowSizeStore';

	const urqlClient = getContextClient();
	const merchantId = $page.data?.merchant?.id;

	onMount(async () => {
		if (merchantId) {
			const placeListRes = await urqlClient.query(queryPlaceList, { req: { merchantId } });
			console.log('staff#onMount: placeListRes: ', placeListRes);
			const placeArr = placeListRes?.data?.placeList?.places;

			if (placeArr?.length) {
				establishmentArr.set(
					placeArr.map((value: any) => ({
						label: value.name,
						value: value.id
					}))
				);
			}

			const newStaffArr: StaffType[] = [];

			for (let i = 0; i < $establishmentArr.length; i++) {
				const establishment = $establishmentArr[i];
				// console.log('staff#onMount: establishment: ', establishment);
				const staffsRes = await urqlClient.query(queryStaffs, {
					req: { placeId: establishment.value }
				});
				console.log('staff#onMount: staffsRes: ', staffsRes);
				const staffs = staffsRes?.data?.staffs?.staffs;
				console.log('staff#onMount: staffs: ', staffs);

				if (staffs?.length) {
					newStaffArr.push(
						...staffs.map((staff: any) => ({
							id: staff.id,
							photo: staff.profilePicturePath,
							firstName: staff.firstName,
							lastName: staff.lastName,
							establishment: establishment.value,
							role: staff.role,
							tips: staff.isTipsEligible,
							payType: staff.wageType,
							hourlyRate: staff.wageRate,
							tablesAssigned: '',
							passCode: staff.passcode,
							showPassCode: false,
							number: staff.phoneNumber,
							email: staff.email,
							overtimeExempt: staff.isOvertimeExempt
						}))
					);
				}
			}

			console.log('staff#onMount: newStaffArr: ', newStaffArr);
			staffArr.set(newStaffArr);
		}
	});

	const onAddStaff = () => {
		selStaffIndex.set(-1);
		showStaffModal.set(true);
	};
</script>

<div
	class="flex flex-col w-full gap-4 px-4 py-8 leading-6 tracking-tight Staff font-poppins whitespace-nowrap"
>
	{#if $isMobile}
		<div class="flex items-center justify-between">
			<div class="text-2xl font-semibold text-on-surface-primary">Staff</div>
			<RedButton name="Add staff" onClick={onAddStaff} />
		</div>
		{#if $staffArr.length}
			<div class="flex flex-col w-full gap-2">
				{#each $staffArr as staff, staffIndex}
					<StaffRow {staff} {staffIndex} />
				{/each}
			</div>
		{/if}
	{:else}
		<div class="flex items-center justify-between">
			<div class="text-2xl font-semibold text-on-surface-primary">Staff</div>
			<RedButton name="Add staff" onClick={onAddStaff} />
		</div>
		{#if $staffArr.length}
			<div class="border rounded-lg border-on-surface-placeholder w-fit">
				<table>
					<tr class="font-semibold text-on-surface-placeholder">
						<td class="px-4 py-2">Name</td>
						<td class="px-4 py-2">Role</td>
						<td class="px-4 py-2">Table</td>
						<td class="px-4 py-2">POS PassCode</td>
						<td class="px-4 py-2">Number</td>
						<td class="px-4 py-2">Email</td>
						<td class="px-4 py-2">Tips</td>
						<td class="px-4 py-2" />
					</tr>
					{#each $staffArr as staff, staffIndex}
						<TableRow {staff} {staffIndex} />
					{/each}
				</table>
			</div>
		{/if}
	{/if}
</div>

<StaffRightBar />
<StaffModal
	selStaff={$staffArr[$selStaffIndex] || {
		id: '',
		photo: '',
		firstName: '',
		lastName: '',
		establishment: '',
		role: '',
		tips: false,
		payType: '',
		hourlyRate: 0,
		tablesAssigned: '',
		passCode: '',
		showPassCode: false,
		number: '',
		email: '',
		overtimeExempt: false,
		status: 'Active'
	}}
/>
