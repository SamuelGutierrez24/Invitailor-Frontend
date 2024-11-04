import { EventsService } from "@/services/events.service";
import { Event } from "@/interfaces/event";

export const useEventById = () => {
    const fetchEvent = async (eventId:string) => {
        const eventService = new EventsService("https://invitailor.onrender.com");
        const event = await eventService.getEventById(eventId);
        return event as Event;
    };

    return { fetchEvent };
};