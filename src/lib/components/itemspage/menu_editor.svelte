<script lang="ts">
  import Cathegories from "./categories.svelte";
  import ItemsAndExtras from "./items_and_extras.svelte";
  import menuStore from '$lib/stores/menustore';
</script>
<div class="w-full flex justify-center ">
  <div class="w-full p-4 py-8 justify-start items-start gap-4 flex-col sm:flex-row inline-flex" style={'margin: 0 auto;'}> 
    {#if $menuStore && $menuStore.length > 0}
      <Cathegories/>
      <ItemsAndExtras/>
    {/if}
  </div>
</div>