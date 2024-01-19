<script lang="ts">
	import Edit from '$lib/icons/edit.svg';
	import Can from '$lib/icons/can.svg';
	import { createEventDispatcher } from 'svelte';
	import DragnDrop from '$lib/icons/icon_drag_drop.svg';
	import type { ExtrasType } from '$lib/types/items';
	import { Switch } from '$lib/components/shadcn/ui/switch';
	import localItemStore from '$lib/stores/localItemStore';
	import Header from '$lib/components/header/header.svelte';
	import appStateStore from '$lib/stores/appStateStore';
	export let extraItem: ExtrasType;
	// export let isActive: boolean;


	const dispatch = createEventDispatcher();


	$: editmode = false;

	let localName = extraItem.name;
	let localPrice = extraItem.price;
	let localActive = extraItem.active
	$: extraEditName = localName;
	$: extraEditPrice = localPrice || null;

	$: isLocalActive = extraItem.active

	// if switch goes on and if the extra id is NOT present in the localItemStore.extraIds, then add the id to the array
	// $: isLocalActive === true
	// 	? !($localItemStore.extrasIds.find((id) => id === extraItem.id) === undefined)
	// 		? null
	// 		: $localItemStore.extrasIds.push(extraItem.id)
	// 	: null;

	// if switch goes on and if the extra id IS present in the localItemStore.extraIds, then remove the id from the array
	// $: isLocalActive === false
	// 	? !($localItemStore.extrasIds.find((id) => id === extraItem.id) === undefined)
	// 		? ($localItemStore.extrasIds = $localItemStore.extrasIds.filter((id) => id !== extraItem.id))
	// 		: null
	// 	: null;

	function editExtra() {
		extraItem = {
			id: extraItem.id,
			name: extraEditName,
			price: extraEditPrice ? extraEditPrice : 0,
			active: isLocalActive
		};
		editmode = false;
		extraEditName = '';
		extraEditPrice = 0;
	}


	function removeExtra() {
		dispatch('removeExtra', {
			id: extraItem.id, name: extraEditName, 
		});
	}


</script>

{#if !editmode}
	<div
		class="self-stretch px-4 py-5 border-t border-gray-200 justify-start items-center gap-6 inline-flex"
	>
		<div class="grow shrink basis-0 h-6 justify-start items-center gap-8 flex">
			<div class="justify-start items-center gap-2 flex">
				<div class="w-6 h-6 relative">
					<img src={DragnDrop} alt="" />
				</div>
				<div class="w-9 h-6 relative">
					<Switch bind:checked={isLocalActive} />
				</div>
			</div>
			<div
				class="grow shrink basis-0 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
			>
				{extraItem.name.charAt(0).toUpperCase() + extraItem.name.slice(1)}
			</div>
			<div class="w-44 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">
				$ {extraItem.price}
			</div>
		</div>
		<div class="h-5 justify-end items-center gap-4 flex">
			<button class="w-5 h-5 justify-center items-center flex" on:click={() => (editmode = true)}>
				<div class="w-5 h-5 relative">
					<img src={Edit} alt="" />
				</div>
			</button>
			<button
				class="w-5 h-5 justify-center items-center flex"
				on:click={() => removeExtra()}
			>
				<div class="w-5 h-5 relative">
					<img src={Can} alt="" />
				</div>
			</button>
		</div>
	</div>
{:else}
	<div
		class="self-stretch px-4 py-3 border-t border-gray-200 justify-start items-center gap-4 inline-flex"
	>
		<div class="grow shrink basis-0 h-10 justify-start items-center gap-4 flex">
			<div class="justify-start items-center gap-2 flex">
				<div class="w-6 h-6 relative">
					<img src={DragnDrop} alt="" />
				</div>
				<div class="w-9 h-6 relative">
					<Switch bind:checked={isLocalActive} />
				</div>
			</div>
			<div class="grow shrink basis-[448px] flex-col justify-start items-start gap-1 inline-flex">
				<div
					class="w-full p-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						<input
							type="text"
							bind:value={extraEditName}
							placeholder="Name"
							class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
						/>
					</div>
				</div>
			</div>
			<div class="w-[200px] flex-col justify-start items-start gap-1 inline-flex">
				<div
					class="self-stretch p-3 bg-white rounded-xl border border-gray-200 justify-start items-center gap-3 inline-flex"
				>
					<div class="grow shrink basis-0 flex-col justify-start items-start gap-px inline-flex">
						<div class="self-stretch flex flex-row">
							<span
								class="text-text-text-on-surface-secondary text-base font-normal font-['Poppins'] leading-normal"
								>$
							</span>
							<input
								type="number"
								bind:value={extraEditPrice}
								class=" w-full self-stretch text-text-text-on-surface-primary text-base font-normal font-['Poppins'] leading-normal"
								on:focus={() => (extraEditPrice = null)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-[248px] justify-center items-start gap-2 flex">
			<button
				class="w-[120px] h-8 px-3 py-2 bg-red-600 rounded-xl justify-center items-center gap-1 flex"
				on:click={editExtra}
			>
				<div class="text-center text-white text-sm font-semibold font-['Poppins'] leading-none">
					Save
				</div>
			</button>
			<button
				class="w-[120px] h-8 px-3 py-2 bg-white rounded-xl border border-gray-200 justify-center items-center gap-1 flex"
				on:click={() => (editmode = false)}
			>
				<div
					class="text-center text-text-text-on-surface-primary text-sm font-semibold font-['Poppins'] leading-none"
				>
					Cancel
				</div>
			</button>
		</div>
	</div>
{/if}
