import type {ActionReturn} from "svelte/action";

interface Attributes {
    "on:click_outside"?: (e: CustomEvent<void>) => void;
}

type Callback = () => unknown

export const clickOutsideAction = (node: HTMLElement, callback?: Callback): ActionReturn<object, Attributes> => {
    const handleClick = (event: Event) => {
        if (event.target !== null && !node.contains(event.target as Node)) {
            node.dispatchEvent(new CustomEvent("click_outside"));
            callback?.();
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}