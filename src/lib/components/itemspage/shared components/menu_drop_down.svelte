<script lang="ts">
import * as DropdownMenu from '$lib/components/shadcn/ui/dropdown-menu';
import IconSmallMenu from '$lib/icons/icon_small_menu.svg';
import DeleteItemIcon from '$lib/icons/can.svg';
	import EditItemIcon from '$lib/icons/edit.svg';

	import { goto } from '$app/navigation';
</script>

<!-- <div class="w-52 h-36 bg-white rounded-lg shadow flex-col justify-start items-start inline-flex">
    <div class="self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex">
        <div class="w-6 h-6 justify-center items-center flex">
            <div class="w-6 h-6 relative">
            </div>
        </div>
        <div class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">Edit item</div>
    </div>
    <div class="self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex">
        <div class="w-6 h-6 justify-center items-center flex">
            <div class="w-6 h-6 relative">
            </div>
        </div>
        <div class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">Duplicate item</div>
    </div>
    <div class="self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex">
        <div class="w-6 h-6 justify-center items-center flex">
            <div class="w-6 h-6 relative">
            </div>
        </div>
        <div class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">Delete item</div>
    </div>
</div> -->
<!-- 

<div class="justify-start items-center gap-2 flex">
    <DropdownMenu.Root>
        <DropdownMenu.Trigger class="w-full">
            <div class="w-5 h-5 justify-center items-center flex">
                <div class="w-5 h-5 relative">
                    <img src={IconSmallMenu} alt="menu icon" />
                </div>
            </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="bg-white">
            <DropdownMenu.Group>
                <div
                    class="w-52 bg-white rounded-lg shadow flex-col justify-start items-start inline-flex"
                >
                    <DropdownMenu.Item>
                        <button
                            on:click={() => goto(`items/item/${item.id}`)}
                            class="self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                            <div class="w-6 h-6 justify-center items-center flex">
                                <div class="w-6 h-6 relative">
                                    <img src={EditItemIcon} height={24} width={24} alt="edit icon" />
                                </div>
                            </div>
                            <div
                                class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
                            >
                                Edit Item
                            </div>
                        </button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <button
                            on:click={() => (showDeleteItemModal = true)}
                            class="self-stretch p-3 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                            <div class="w-6 h-6 justify-center items-center flex">
                                <div class="w-6 h-6 relative">
                                    <img src={DeleteItemIcon} alt="delete icon" />
                                </div>
                            </div>
                            <div
                                class="grow shrink basis-0 h-6 text-zinc-900 text-base font-normal font-['Poppins'] leading-normal"
                            >
                                Delete item
                            </div>
                        </button>
                    </DropdownMenu.Item>
                </div>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div> -->