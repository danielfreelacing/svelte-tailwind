<script lang="ts">
	import menuStore from '$lib/stores/menustore';
	import ExitBlack from '$lib/icons/exit_black.svg';

	export let closeModalFunction: () => void;
	export let extraId: number;
	export let categoryIdSelected: string;
	export let extraName: string;

	const handleExtraDelete = () => {
		console.log('was in delete extra from category', categoryIdSelected, extraId);
		menuStore.deleteExtraFromCategory(categoryIdSelected, extraId);
		closeModalFunction()
	};
</script>

<div class="flex flex-row justify-center">
	<div
		class="absolute w-[518px] p-6 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start gap-8 inline-flex z-20"
	>
		<div class="w-[423px] h-14 flex-col justify-start items-start gap-2 inline-flex">
			<div class="self-stretch h-6 justify-between items-center inline-flex">
				<div class="text-zinc-900 text-2xl font-semibold font-['Poppins'] leading-normal">
					Delete extra from category
				</div>
				<button class="w-6 h-6 justify-center items-center flex" on:click={closeModalFunction}>
					<div class="w-6 h-6 relative">
						<img src={ExitBlack} alt="exit icon" />
					</div>
				</button>
			</div>

			<div class="text-zinc-900 mt-2 text-base font-normal font-['Poppins'] leading-normal">
				Are you sure you want to delete extra '{extraName.charAt(0).toUpperCase() + extraName.slice(1)}'?
			</div>
		</div>
		<div class="self-stretch justify-end items-start gap-4 inline-flex">
			<button
				on:click={closeModalFunction}
				class="px-10 py-3 bg-white rounded-xl border border-gray-200 justify-center items-center gap-2 flex"
			>
				<div
					class="text-center text-zinc-900 text-base font-semibold font-['Poppins'] leading-normal"
				>
					Cancel
				</div>
			</button>
			<button
				on:click={handleExtraDelete}
				class="px-10 py-3 bg-button-primary-default rounded-xl justify-center items-center gap-2 flex"
			>
				<div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal">
					Delete
				</div>
			</button>
		</div>
	</div>
</div>
