
import { writable } from 'svelte/store';


export type UserType = {
    id: string | undefined
    name: string

}

const userInit = {
    id: undefined,
    name: ''
}


const userStore = writable<UserType>(userInit);

export default userStore;