import { EventsService } from "@/services/events.service";
import { Event } from "@/interfaces/event";
import Cookies from 'js-cookie';

export const useCreateEvent = () => {
    const createEvent = async (name: string, description: string, services: number[]) => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const eventService = new EventsService("https://invitailor.onrender.com");
        try {
            console.log(services);
            const event = await eventService.createEvent(name, description, services, token);
            return event as Event;
        } catch (error) {
            console.error("Failed to create event:", error);
            return null;
        }
    };

    return { createEvent };
};