export interface Zones {
    id: string;
    name: string;
    areas: Areas[];
}
export interface Areas {
    id: string;
    name: string;
    tablesAmount: number;
    tables: string;
    seats: number;
    subareas: Subareas[];
}
export interface Subareas {
    id: string;
    name: string;
    user_name: string;
    seats: number;
    url: string;
    avatar: string;
}