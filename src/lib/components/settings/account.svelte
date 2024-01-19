<script lang="ts">
	import CustomInput from '../common/input/custom-input.svelte';
	import RedButton from '../common/button/red-button.svelte';
	import GrayButton from '../common/button/gray-button.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import AlertModal from '../common/modal/alert-modal.svelte';

	export let superFormData: any;
	$: edit = false;
	$: saving = false;

	const { form, errors, constraints, enhance, message } = superForm(superFormData, {
		dataType: 'json'
	});
</script>

<div class="flex flex-col">
	<form
		method="POST"
		use:enhance
		class="flex flex-col gap-8 p-4 bg-white border rounded-lg font-poppins border-on-surface-placeholder"
	>
		<div class="flex flex-col gap-3">
			<div class="text-lg font-semibold">Account details</div>
			<div class="flex flex-wrap gap-4 flex-s">
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="First name"
					disabled={!edit}
					bind:value={$form.firstName}
					error={$errors.firstName}
					constraints={$constraints.firstName}
				/>
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="Last name"
					disabled={!edit}
					bind:value={$form.lastName}
					error={$errors.lastName}
					constraints={$constraints.lastName}
				/>
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="Phone number"
					disabled={!edit}
					bind:value={$form.phoneNumber}
					error={$errors.phoneNumber}
					constraints={$constraints.phoneNumber}
				/>
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="ID number"
					disabled={!edit}
					bind:value={$form.identificationNumber}
					error={$errors.identificationNumber}
					constraints={$constraints.identificationNumber}
				/>
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Home address Line 1"
				disabled={!edit}
				bind:value={$form.address.addressLine1}
				error={$errors.address?.addressLine1}
				constraints={$constraints.address?.addressLine1}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Home address Line 2 (Optional)"
				disabled={!edit}
				bind:value={$form.address.addressLine2}
				error={$errors.address?.addressLine2}
				constraints={$constraints.address?.addressLine2}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Town/City"
				disabled={!edit}
				bind:value={$form.address.city}
				error={$errors.address?.city}
				constraints={$constraints.address?.city}
			/>
			<CustomInput
				className="w-full sm:w-max"
				label="Country"
				disabled={!edit}
				bind:value={$form.address.country}
				error={$errors.address?.country}
				constraints={$constraints.address?.country}
			/>
			<CustomInput
				className="w-full sm:w-max flex-grow"
				label="Postcode"
				disabled={!edit}
				bind:value={$form.address.postcode}
				error={$errors.address?.postcode}
				constraints={$constraints.address?.postcode}
			/>
		</div>
		<div class="flex flex-col gap-3">
			<div class="text-lg font-semibold">Change password</div>
			<div class="flex flex-wrap gap-4">
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="Current password"
					type="password"
					disabled={!edit}
					bind:value={$form.currentPassword}
				/>
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="New password"
					type="password"
					disabled={!edit}
					bind:value={$form.newPassword}
				/>
				<CustomInput
					className="w-full sm:w-max flex-grow"
					label="Repeat new password"
					type="password"
					disabled={!edit}
					bind:value={$form.confirmNewPassword}
				/>
			</div>
		</div>
		<div class="flex items-start justify-end gap-4">
			{#if edit}
				<GrayButton name="Cancel" onClick={() => (edit = false)} />
				<RedButton
					className={saving ? 'animate-pulse' : ''}
					name="Save"
					formaction="?/user"
					onClick={() => (saving = true)}
				/>
			{:else}
				<RedButton name="Edit" onClick={() => (edit = true)} />
			{/if}
		</div>
	</form>
	<!-- <SuperDebug data={superFormData} /> -->
</div>

<AlertModal
	show={!!$message}
	onClose={() => {
		message.set('');
		saving = false;
	}}
>
	<div class="p-8 text-2xl font-semibold">{$message}</div>
</AlertModal>
