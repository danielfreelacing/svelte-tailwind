<script lang="ts">
	import { goto } from '$app/navigation';
import Salt from '$lib/icons/salt.svg'
</script>

<div class="w-full h-[500px] bg-white rounded-lg border border-gray-200 flex-col justify-center items-center inline-flex">
    <div class="py-[100px] flex-col justify-start items-center gap-10 flex">
        <div class="w-[120px] h-[120px] relative">
            <div class="w-[89.67px] h-[84.26px] left-[15.16px] top-[17.87px] absolute">
                <div class="w-[89.67px] h-[84.26px] left-0 top-0 absolute">
				<img src={Salt} alt="items are missing icon" />

                </div>
            </div>
        </div>
        <div class="h-[140px] flex-col justify-start items-start gap-4 flex">
            <div class="self-stretch h-[76px] flex-col justify-center items-center gap-1 flex">
                <div class="self-stretch text-center text-zinc-900 text-lg font-semibold font-['Poppins'] leading-normal">Extras are missing</div>
                <div class="self-stretch text-center text-zinc-500 text-base font-normal font-['Poppins'] leading-normal">Add category extras in any item to see them here</div>
            </div>
            <!-- <div class="self-stretch justify-center items-center gap-4 inline-flex">
                <div class="px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 flex">
                    <button class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal" on:click={() => goto('/items/item/add-item')}>Add item</button>
                </div>
            </div> -->
        </div>
    </div>
</div>