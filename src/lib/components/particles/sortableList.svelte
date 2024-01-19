<script lang="ts">
	import { flip } from 'svelte/animate';
	import { createEventDispatcher } from 'svelte';

	export let list: any[];
    export let directionRow: boolean
    export let listClasses: string = ''
	export let itemNamePlural:string = 'items'
	let isOver: string | boolean = false;

    // let mouseXCoordinate = null; // pointer y coordinate within client
    // let distanceTopGrabbedVsPointer = null;

	const dispatch = createEventDispatcher();

	let draggingItem = null;
	let draggingItemId = null;
		let hoveredItemIndex = null;

	// $: {
	//     // prevents the ghost flickering at the top
	//     if (mouseYCoordinate == null || mouseYCoordinate == 0) {
	//         // showGhost = false;
	//     }
	// }

	// $: {
	// 	if (
	// 		draggingItemIndex != null &&
	// 		isOverIndex != null &&
	// 		draggingItemIndex != isOverIndex
	// 	) {
	// 		// swap items
	// 		[list[draggingItemIndex], list[isOverIndex]] = [
	// 			list[isOverIndex],
	// 			list[draggingItemIndex]
	// 		];

	// 		// balance
	// 		draggingItemIndex = isOverIndex;
	// 	}
	// }

	function getDraggedParent(node: any) {
		if (!node.dataset.index) {
			return getDraggedParent(node.parentNode);
		} else {
			return { ...node.dataset };
		}
	}

	function onDragStart(e: DragEvent, index: number) {
		// @ts-ignore
		const dragged = getDraggedParent(e.target);

		draggingItemIndex = index;

		e.dataTransfer?.setData('source', dragged?.index.toString());
	}

	function onDragOver(e: DragEvent) {
		// @ts-ignore
		const id = e.target.dataset?.id;
		const dragged = getDraggedParent(e.target);
		isOver = dragged?.id ?? false;
		isOverIndex = dragged?.index.toString();
		console.log('isOver', isOver, dragged);
	}

	function onDragLeave(e: DragEvent) {
		const dragged = getDraggedParent(e.target);
		isOver === dragged.id && (isOver = false);
	}

	function onDrop(e: DragEvent) {
		isOver = false;
		const dragged = getDraggedParent(e.target);
		reorder({
			from: e.dataTransfer?.getData('source'),
			to: dragged.index
		});
	}

	const reorder = ({ from, to }: any) => {
		const newList = [...list];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];

		dispatch('sort', newList);
	};
</script>

{#if list?.length}
	<ul class=" p-0 flex {directionRow ? 'flex-row ' : 'flex-col w-full gap-0 '} ">
        <!-- {#if mouseXCoordinate}
        <div
            class="item ghost"
            style="top: {mouseXCoordinate + distanceTopGrabbedVsPointer}px; background: {draggingItem.value};">
            {draggingItem.value}
        </div>
    {/if} -->
		{#each list as item, index (item.id)}
			<li
				class=" {listClasses} last:mb-[2px] "
				class:over={item.id === isOver}
				data-index={index}
				data-id={item.id}
				draggable="true"
				on:dragstart={(e) => onDragStart(e, index)}
				on:dragover|preventDefault={(e) => onDragOver(e)}
				on:dragleave={onDragLeave}
				on:drop|preventDefault={onDrop}
				animate:flip={{ duration: 300 }}
			>
				<slot {item} {index} />
			</li>
		{/each}
	</ul>
{:else}<div class="container">
	<p class="text-center my-12 text-lg font-bold">No {itemNamePlural}</p>
</div>
{/if}
