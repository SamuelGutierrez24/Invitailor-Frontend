import { EventsService } from "@/services/events.service";
import { Event } from "@/interfaces/event";
import Cookies from 'js-cookie';

export const useEditEvent = () => {
    const editEvent = async (eventId: string, name: string, description: string, location: string, price: number, dateTime: string, services: number[], image: File) => {
        const token = Cookies.get("token");
        if (!token) {
            console.error("No authentication token found");
            return null;
        }

        const eventService = new EventsService("https://invitailor.onrender.com");
        try {
            console.log(services);
            const event = await eventService.editEvent(eventId, name, description, location, price, dateTime, services, token, image);
            return event as Event;
        } catch (error) {
            console.error("Failed to edit event:", error);
            return null;
        }
    };

    return { editEvent };
};
