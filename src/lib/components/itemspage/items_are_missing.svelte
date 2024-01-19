<script lang="ts">
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
        <div class="self-stretch text-center text-zinc-900 text-lg font-semibold font-['Poppins'] leading-normal">Items are missing</div>
        <div class="self-stretch text-center text-zinc-500 text-base font-normal font-['Poppins'] leading-normal">Add items from the menu to see them here</div>
      </div>
      <button class="self-stretch justify-center items-center gap-4 inline-flex" on:click>
        <div class="px-10 py-3 bg-red-600 rounded-xl justify-center items-center gap-2 flex">
          <div class="text-center text-white text-base font-semibold font-['Poppins'] leading-normal" >Add item</div>
        </div>
      </button>
    </div>
  </div>
</div>