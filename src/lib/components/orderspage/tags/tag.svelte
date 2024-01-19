<script lang="ts">

export let type: string

type Status = {
    id: string
    name: string, 
    bgColor: string,
    textColor: string
}
const statuses: Status[] = 
[{
    id: 'open',
    name: 'Open',
    bgColor: 'bg-color-secondary-secondary-tr-10',
    textColor: 'text-button-link-disabled'
},
{
    id: 'preparing',
    name: 'Preparing',
    bgColor: 'bg-color-system-system-warning-subtle',
    textColor: 'text-text-text-on-surface-text-warning'
},
{
    id: 'served',
    name: 'Served',
    bgColor: 'bg-surface-surface-highlighted',
    textColor: 'text-text-text-on-surface-link'
},
{
    id: 'completed',
    name: 'Completed',
    bgColor: 'bg-color-system-success-subtle',
    textColor: 'text-text-text-on-surface-text-success'
},
{
    id: 'cancelled',
    name: 'Cancelled',
    bgColor: 'bg-surface-surface-accent-subtle',
    textColor: 'text-surface-surface-accent'
}
] 

const { name, bgColor, textColor} = {...statuses.find(status => status.id === type)}


</script>

<div class={`w-[57px] h-7 px-3 py-1 ${bgColor} bg-opacity-10 rounded-[34px] justify-start items-center gap-3 inline-flex`}>
    <div class={`${textColor} text-xs font-semibold font-['Poppins'] leading-tight`}>{name}</div>
</div>
