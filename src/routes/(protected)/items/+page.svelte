<script lang="ts">
	import SubHeader from '$lib/components/itemspage/sub_header.svelte';
	import MenuEditor from '$lib/components/itemspage/menu_editor.svelte';
	import merchantStore from '$lib/stores/merchantStore';
	import menuStore from '$lib/stores/menustore';
	import appStateStore from '$lib/stores/appStateStore';
	import type { PageData } from './$types';
	import type { CategoryType } from '$lib/components/itemspage/types';
	import { page } from '$app/stores';

	export let data: PageData;

	console.log('data and pagedata in /items', data, $page);
	const { merchant, menus, placeList } = data;

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	$merchantStore = { ...merchant };
	$menuStore = menus
		? menus.map((fetchedMenu: any) => {
				return {
					id: fetchedMenu.id,
					name: fetchedMenu.name,
					position: fetchedMenu.position,
					active: fetchedMenu.isAvailable,
					seasonalFrom: fetchedMenu.availableFromDate,
					seasonalTo: fetchedMenu.availableTillDate,
					timeFrom: fetchedMenu.availableFromTime,
					timeTo: fetchedMenu.availableTillTime,
					daysFilter: fetchedMenu.availableOnWeekdays
						? fetchedMenu.availableOnWeekdays.map(
								(item: string, index: number) => daysOfWeek[index] === item
						  )
						: [false, false, false, false, false, false, false],
					categories: fetchedMenu.categories
						? fetchedMenu.categories.map((category: CategoryType) => {
								return {
									id: category.id,
									name: category.name,
									position: category.position,
									isAvailable: category.isAvailable,
									menuId: fetchedMenu.id,
									active: category.isAvailable
								};
						  })
						: [],
					menuItems: fetchedMenu.menuItems
				};
		  })
		: [];

	if (placeList.length > 0) {
		appStateStore.setPlaceIdSelected(placeList[0].id);
	}
</script>

<SubHeader />
<MenuEditor />
