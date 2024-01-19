<script lang="ts">
export let formEntry : string
export let errorEntry: string
export let constraintsEntry: object
export let filledName: string
export let placeholder: string
export let inputName: string

</script>

<div
class=" w-[343px] sm:w-full self-stretch  flex-col justify-start items-start gap-1 flex"
>
<div
    class="self-stretch  bg-white h-14 border rounded-xl {errorEntry ? 'border-text-text-on-surface-accent' : null}  border-gray-200 focus-within:border-blue-800 justify-start items-center gap-3 inline-flex"
>
    <div
        class="relative grow shrink p-4 basis-0 flex-col justify-start items-start gap-px inline-flex"
    >
        {#if formEntry !== '' && formEntry !== undefined}
            <div class="flex flex-row justify-between w-full">
                <div
                    class="self-stretch text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight"
                >
                    {filledName}
                </div>
                {#if errorEntry}<div class="invalid text-xs">{errorEntry}</div>{/if}
            </div>
        {/if}
        <input
            class="w-full !bg-white {errorEntry
                ? 'text-text-text-on-surface-accent'
                : 'text-zinc-900'}  text-base rounded-xl font-normal font-['Poppins'] leading-normal "
            type="text"
            name={inputName}
            placeholder={placeholder}
            aria-invalid={errorEntry ? 'true' : undefined}
            bind:value={formEntry}
            
            {...constraintsEntry}
        />
    </div>
</div>
</div>