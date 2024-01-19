import {writable} from 'svelte/store'
export const isMobile = writable(false)

const onResize = () => {
  isMobile.set(window.innerWidth < 768)
}

window.addEventListener('resize', onResize)
onResize()