import { Event } from "./event";
export interface Ticket {
    id: string;
    userId: string;
    event: Event;
}