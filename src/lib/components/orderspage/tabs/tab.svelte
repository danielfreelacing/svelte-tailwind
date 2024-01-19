<script lang="ts">
export let active: boolean 
export let text: string 
export let number: number 
export let indicatorcolor: string

enum IndicatorColor  {
    gray ='gray',
    blue = 'blue',
    yellow = 'yellow',
    darkblue = 'darkblue',
    green = 'green',
    red = 'red'
}


const colors = 
[{
    id: 'gray',
    bgColor: 'bg-text-text-on-surface-secondary',
},
{
    id: 'blue',
    bgColor: 'bg-button-link-disabled',
},
{
    id: 'yellow',
    bgColor: 'bg-text-text-on-surface-text-warning',
},
{
    id: 'darkblue',
    bgColor: 'bg-text-text-on-surface-link',
},
{
    id: 'green',
    bgColor: 'bg-text-text-on-surface-text-success',
},
{
    id: 'red',
    bgColor: 'bg-text-text-on-surface-text-error',
}
] 

const {bgColor} = {... colors.find(color => color.id === indicatorcolor)}
</script>

<div class=" h-8 px-3 py-1 bg-white rounded-3xl border {active ? 'border-red-500' : 'border-gray-200'} justify-center items-center gap-2 inline-flex">
    <div class="justify-center items-center gap-1 flex">
        <div class="w-2 h-2 justify-center items-center flex">
            <div class={`${bgColor} w-2 h-2  rounded-full`}></div>
        </div>
        <div class="text-zinc-900 text-base font-normal font-['Poppins'] leading-normal">{text.charAt(0).toUpperCase() + text.slice(1)}</div>
    </div>
    <div class="text-zinc-500 text-base font-normal font-['Poppins'] leading-normal">{number.toFixed().toString()}</div>
</div>