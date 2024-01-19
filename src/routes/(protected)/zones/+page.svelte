<script lang="ts">
	import * as Table from '$lib/components/shadcn/ui/table';
	import Button from '$lib/components/shadcn/ui/button/button.svelte';
	import Typography from '$lib/components/typography/Typography.svelte';
	import {
		Check,
		ChevronRight,
		CopyIcon,
		Eye,
		GripVertical,
		MoreVertical,
		Pencil,
		Plus,
		Trash
	} from 'lucide-svelte';
	import Switch from '$lib/components/shadcn/ui/switch/switch.svelte';
	import Label from '$lib/components/shadcn/ui/label/label.svelte';
	import * as Select from '$lib/components/shadcn/ui/select';
	import ZoneHeader from '$lib/components/zone/ZoneHeader.svelte';
	import * as Tabs from '$lib/components/shadcn/ui/tabs/index';
	import * as Dialog from '$lib/components/shadcn/ui/dialog/index';
	import Input from '$lib/components/shadcn/ui/input/input.svelte';
	import { onMount } from 'svelte';
	import type { Zones } from '$lib/types/zones';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	let openAddZoneDialog = false;
	let openAddAreaDialog = false;
	let newZoneName = '';
	let newAreaName = '';
	$: console.log(openAddZoneDialog);
	let zones: Zones[] = [
		{
			id: '1',
			name: 'Zone 1',
			areas: [
				{
					id: '1',
					name: 'Area 1',
					tablesAmount: 10,
					tables: '1,2,3,4',
					seats: 24,
					subareas: [
						{
							id: '1',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						},
						{
							id: '2',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						},
						{
							id: '3',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						}
					]
				},
				{
					id: '2',
					name: 'Area 2',
					tablesAmount: 10,
					tables: '1,2,3,4',
					seats: 24,
					subareas: [
						{
							id: '1',
							name: 'Area 2 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						}
					]
				},
				{
					id: '3',
					name: 'Area 3',
					tablesAmount: 10,
					tables: '1,2,3,4',
					seats: 24,
					subareas: [
						{
							id: '1',
							name: 'Area 3 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						}
					]
				}
			]
		},
		{
			id: '2',
			name: 'Zone 2',
			areas: [
				{
					id: '1',
					name: 'Zone 2 - Area 1',
					tablesAmount: 10,
					tables: '1,2,3,4',
					seats: 24,
					subareas: [
						{
							id: '1',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						},
						{
							id: '2',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						},
						{
							id: '3',
							name: 'Area 1 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						}
					]
				},
				{
					id: '2',
					name: 'Area 2',
					tablesAmount: 10,
					tables: '1,2,3,4',
					seats: 24,
					subareas: [
						{
							id: '1',
							name: 'Area 2 - Subarea 1',
							user_name: 'Daniel Rodriguez',
							seats: 10,
							url: 'https://google.com',
							avatar: 'https://picsum.photos/200/300'
						}
					]
				}
			]
		}
	];
	$: selectedZone = zones.find((z) => z.id === $page.url.searchParams.get('zoneid'));
	$: selectedArea = selectedZone?.areas || [];
	const addZone = () => {
		if (!newZoneName) return;
		zones = [...zones, { id: zones.length + 1 + '', name: newZoneName, areas: [] }];
		newZoneName = '';
		openAddZoneDialog = false;
	};
	const addArea = () => {
		if (!newAreaName) return;
		const zoneId = selectedZone?.id;
		const index = zones.findIndex((z) => z.id === zoneId);
		zones[index].areas = [
			...zones[index].areas,
			{
				id: zones[index].areas.length + 1 + '',
				name: newAreaName,
				tablesAmount: 0,
				tables: '',
				seats: 0,
				subareas: []
			}
		];
		newAreaName = '';
		openAddAreaDialog = false;
	};
	const deleteArea = (areaId: string) => {
		const zoneId = selectedZone?.id;
		const index = zones.findIndex((z) => z.id === zoneId);
		zones[index].areas = zones[index].areas.filter((a) => a.id !== areaId);
	};
	$: checked = Array.from({ length: selectedZone?.areas.length || 0 }, () => false);
	$: console.log(
		(zones || []).find((z) => z.id === $page.url.searchParams.get('zoneid'))?.areas || []
	);
	let selected = false
</script>

<section class="bg-surface-surface-3 w-full h-full px-5">
	<div class="w-full overflow-x-auto flex border-b-2 no-scrollbar">
		<Tabs.Root value={`${selectedZone?.id}`}>
			<Tabs.List>
				{#each zones as zone}
					<Tabs.Trigger
						class="py-[10px] gap-2 pl-0"
						on:click={() => ((selectedZone = zone), goto(`/zones?zoneid=${zone.id}`))}
						value={`${zone.id}`}
					>
						<GripVertical size="16px" class="ml-2 text-text-text-on-surface-secondary" />
						{zone.name}
						<MoreVertical size="16px" class="ml-2 text-text-text-on-surface-secondary" />
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</Tabs.Root>
		<Dialog.Root open={openAddZoneDialog} onOpenChange={(e) => (openAddZoneDialog = e)}>
			<Dialog.Trigger class="ml-auto text-button-link-default">
				<Button class="gap-3" variant="ghost">
					<Plus size="16px" />
					Add Zone
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header class="flex flex-col gap-4">
					<Dialog.Title>Add Zone</Dialog.Title>
					<Input bind:value={newZoneName} class="w-full" placeholder="Name of zone" />
					<div class="ml-auto">
						<Button variant="secondary">Cancel</Button>
						<Button on:click={addZone}>Add</Button>
					</div>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="max-sm:hidden flex justify-between align-center py-5 z-20">
		<Typography variant="h2">Areas</Typography>
		<Dialog.Root open={openAddAreaDialog} onOpenChange={(e) => (openAddAreaDialog = e)}>
			<Dialog.Trigger class="ml-auto">
				<Button class="gap-3">
					<Plus size="16px" />
					Add Area
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header class="flex flex-col gap-4">
					<Dialog.Title>Add Area</Dialog.Title>
					<Input bind:value={newAreaName} class="w-full" placeholder="Name of area" />
					<div class="ml-auto">
						<Button variant="secondary">Cancel</Button>
						<Button on:click={addArea}>Add</Button>
					</div>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="sm:hidden z-40 my-5 w-full space-y-2">
		<div class="flex gap-4">
			<div class="flex gap-2 items-center">
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.666504 1.66667H15.3332V3.00001H14.3332V14.3333H12.9998V6.91088C12.9505 6.88235 12.904 6.84697 12.8618 6.80474L9.05703 3.00001H6.94265L3.13791 6.80474C3.09568 6.84697 3.0492 6.88235 2.99984 6.91088V14.3333H1.6665V3.00001H0.666504V1.66667ZM10.9426 3.00001L12.9998 5.0572V3.00001H10.9426ZM2.99984 3.00001H5.05703L2.99984 5.0572V3.00001Z"
						fill="#84868E"
					/>
				</svg>
				<Typography variant="p">Total tables: 24</Typography>
			</div>
			<div class="flex gap-2 items-center">
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M4.02278 0L6.05254 7.55194L12.3419 7.55194V9.02785H11.6482L12.6665 15.077L11.2789 15.3333L10.8386 12.7176H5.24991L4.81149 15.3221L3.42389 15.0658L4.44029 9.02785H3.53556L3.53557 7.55194H4.58876L2.6665 0.399974L4.02278 0ZM5.49836 11.2417H10.5901L10.2175 9.02785L5.87103 9.02785L5.49836 11.2417Z"
						fill="#84868E"
					/>
				</svg>

				<Typography variant="p">Total seats: 24</Typography>
			</div>
		</div>
		<Select.Root>
			<Select.Trigger aria-selected={checked.find((c)=>c)}  class="bg-white mb-2">
				<Select.Value />
				<Select.Label aria-selected={checked.find((c)=>c)}>Select Area</Select.Label>
			</Select.Trigger>
			<Select.Content class="bg-white">
				{#each selectedArea as area}
					<Select.Item
						on:click={() => {
							checked.fill(false);
							const index = selectedZone?.areas.findIndex((a) => a.name === area.name);
							if (index !== undefined && index !== null) checked[index] = true;
						}}
						value={area.name}>{area.name}</Select.Item
					>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div>
		<Table.Root class="rounded-sm border-spacing-y-4">
			<Table.Header class="max-sm:hidden">
				<Table.Row>
					<Table.Head class="w-[50%]">Names</Table.Head>
					<Table.Head class="w-[10%]">Tables Amount</Table.Head>
					<Table.Head class="w-[10%]">Tables</Table.Head>
					<Table.Head class="w-[10%]">Number of seats</Table.Head>
					<Table.Head class="w-[20%]">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body class="max-sm:flex max-sm:flex-col max-sm:gap-4">
				{#each selectedArea as area, index (area.id)}
					<Table.Row class={`max-sm:mt-4 ${checked[index] ? '' : 'selectivemobilehide'}`}>
						<Table.Cell class="font-medium flex items-center max-sm:p-0">
							<Button
								class="max-sm:hidden"
								variant="ghost"
								size={'icon'}
								on:click={() => (checked[index] = !checked[index])}
							>
								<ChevronRight
									size="18px"
									class={`${checked[index] ? 'rotate-90' : 'rotate-0'} transition-all`}
								/>
							</Button>
							<div class="flex gap-4 items-center">
								<Switch />
								<Typography variant="p_bold">{area.name}</Typography>
							</div>
						</Table.Cell>
						<Table.Cell class="max-sm:hidden">{area.tablesAmount}</Table.Cell>
						<Table.Cell class="max-sm:hidden">{area.tables}</Table.Cell>
						<Table.Cell class="max-sm:hidden">
							{area.seats}
						</Table.Cell>
						<Table.Cell class="flex gap-2 items-center max-sm:px-0">
							<Button class="flex gap-2">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.6667 11.3333V10.6667H8.66667V8.66667H10.6667V10H12V11.3333H11.3333V12.6667H10V14H8.66667V12H10V11.3333H10.6667ZM14 14H11.3333V12.6667H12.6667V11.3333H14V14ZM2 2H7.33333V7.33333H2V2ZM3.33333 3.33333V6H6V3.33333H3.33333ZM8.66667 2H14V7.33333H8.66667V2ZM10 3.33333V6H12.6667V3.33333H10ZM2 8.66667H7.33333V14H2V8.66667ZM3.33333 10V12.6667H6V10H3.33333ZM12 8.66667H14V10H12V8.66667ZM4 4H5.33333V5.33333H4V4ZM4 10.6667H5.33333V12H4V10.6667ZM10.6667 4H12V5.33333H10.6667V4Z"
										fill="white"
									/>
								</svg>
								Generate QR Codes
							</Button>
							<Button class="max-sm:w-full gap-2" variant="secondary" size="icon">
								<Eye size="16px" />
								<span class="sm:hidden">View</span>
							</Button>
							<Button class="max-sm:hidden" variant="outline" size="icon">
								<Pencil size="16px" />
							</Button>
							<Button on:click={()=>deleteArea(area.id)} class="max-sm:hidden" variant="outline" size="icon">
								<Trash size="16px" />
							</Button>
						</Table.Cell>
					</Table.Row>
					{#if checked[index]}
						{#each area.subareas as subarea}
							<Table.Row
								class="bg-surface-surface-2 transition-all max-sm:grid grid-cols-1 max-sm:grid-rows-[1fr, 1fr, 1fr] max-sm:grid-cols-[1fr, 1fr] h-fit max-sm:border max-sm:border-t-0 max-sm:rounded-sm"
							>
								<Table.Cell
									class="font-medium flex items-center gap-2 max-sm:row-start-1 w-full max-sm:col-end-3 max-sm:col-start-1"
								>
									<div class="flex gap-4 items-center pl-10 max-sm:pl-0">
										<Switch />
										<Typography variant="p_bold">{subarea.name}</Typography>
									</div>
								</Table.Cell>
								<Table.Cell
									colspan={2}
									class="max-sm:row-start-2 max-sm:flex max-sm:flex-col gap-2"
								>
									<Label class="sm:hidden">Serving Staff</Label>
									<div class="flex gap-4 items-center">
										<div class="w-8 h-8 rounded-full object-cover overflow-hidden">
											<img src={subarea.avatar} alt="" class="w-full h-full object-cover" />
										</div>
										<Typography class="w-full" variant="p">{subarea.user_name}</Typography>
									</div>
								</Table.Cell>
								<Table.Cell class="max-sm:row-start-2  max-sm:flex max-sm:flex-col gap-2">
									<Label class="sm:hidden">Amount of seats</Label>
									<Typography variant="p">
										{subarea.seats}
										{subarea.seats > 1 ? 'seats' : 'seat'}
									</Typography>
								</Table.Cell>
								<Table.Cell
									class="flex max-sm:col-start-1 max-sm:col-end-3 max-sm:flex max-sm:flex-col gap-2"
								>
									<Label class="sm:hidden">Link</Label>
									<div class="flex gap-2 items-center">
										<CopyIcon size="16px" class="text-blue-900" />
										<Typography variant="p">
											<a href={subarea.url} class="text-blue-900">
												{subarea.url}
											</a>
										</Typography>
									</div>
									<div class="ml-auto max-sm:ml-0 max-sm:mt-2 max-sm:col-end-3 max-sm:col-start-1">
										<Button
											class="max-sm:w-full gap-2"
											variant="default"
											size={'icon'}
											on:click={() => (checked[index] = !checked[index])}
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M10.6667 11.3333V10.6667H8.66667V8.66667H10.6667V10H12V11.3333H11.3333V12.6667H10V14H8.66667V12H10V11.3333H10.6667ZM14 14H11.3333V12.6667H12.6667V11.3333H14V14ZM2 2H7.33333V7.33333H2V2ZM3.33333 3.33333V6H6V3.33333H3.33333ZM8.66667 2H14V7.33333H8.66667V2ZM10 3.33333V6H12.6667V3.33333H10ZM2 8.66667H7.33333V14H2V8.66667ZM3.33333 10V12.6667H6V10H3.33333ZM12 8.66667H14V10H12V8.66667ZM4 4H5.33333V5.33333H4V4ZM4 10.6667H5.33333V12H4V10.6667ZM10.6667 4H12V5.33333H10.6667V4Z"
													fill="white"
												/>
											</svg>
											<span class="sm:hidden">Generate QR Code</span>
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						{/each}
					{/if}
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
